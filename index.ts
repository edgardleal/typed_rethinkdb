
let r: R;
let dbName: string;

export type Migration = PromiseLike<any> | (() => PromiseLike<any>);

function isQuery(v: Migration): v is PromiseLike<any> {
    return "_query" in v;
}

export interface Migrations {
    [n: number]: Migration;
}

export function connect(db: string, host: string = "rethinkdb") {
    dbName = db;
    r = require("rethinkdbdash")({
        db: db,
        pingInterval: 20,
        discovery: process.env.DISCOVERY && process.env.DISCOVERY === "true",
        servers: [{
            host: host,
            port: 28015
        }],
        silent: !!process.env.TEST
    });

    return r;
}

function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

const log = process.env.TEST ? (...x: any[]) => {} : console.log;

export async function migrate(migrations: Migrations, doFirst?: number[]): Promise<void> {
    if (await r.not(r.dbList().contains(dbName))) {
        await r.dbCreate(dbName);
    }

    if (await r.tableList().contains("config").not())
        await r.tableCreate("config");

    let migrationIds = Object.keys(migrations).map(n => parseInt(n)).sort((a, b) => a - b);
    {
        const current = await (r as any).table("config").get("migration_current")("value").default(0);
        if (migrationIds.find(x => x > current) === undefined) return;
    }

    log("OBTAINING MIGRATION LOCK");
    const result = await (r as any).table("config").get("migration_status").replace((x: any) =>
        r.branch(
            r.not(x), {value: "running"},
            x("value").eq("ok"), {value: "running"},
            x("value").eq("running"), r.error("already running migrations"),
            x("value").eq("fatal"), r.error("migrations failed!!!"),
            r.error("unknown migration status!!!")
        ).merge({id: "migration_status"})
    );

    if (result.first_error === "already running migrations") {
        log("MIGRATION LOCK HELD BY SOMEBODY ELSE... WAITING AND TRYING AGAIN");
        await sleep(3000);
        return await migrate(migrations, doFirst);
    } else if (result.first_error) {
        console.log("MIGRATION LOCK FATAL ERROR", result.first_error);
        process.exit(93);
    }

    log("GOT MIGRATION LOCK");

    try {
        let currentMigration = await (r as any).table("config").get("migration_current")("value").default(0);
        const lastMigrationId = migrationIds[migrationIds.length - 1];

        if (currentMigration === 0 && doFirst) {
            log("RUNNING FIRST MIGRATIONS  ", doFirst.join("-"));

            await Promise.all(doFirst.map(async id => {
                const migration = migrations[id];
                const migrationFn = isQuery(migration) ? migration : migration();
                const result = await migrationFn;

                if (result && result.first_error) throw result.first_error;
            }));

            log("DONE RUNNING FIRST MIGRATIONS  ", doFirst.join("-"));

            migrationIds = migrationIds.filter(id => doFirst.indexOf(id) < 0);
        }

        for (let migrationId of migrationIds) {
            if (migrationId <= currentMigration) continue;

            log("RUNNING MIGRATION  ", migrationId, "  ->  ", migrations[migrationId]);

            const migration = migrations[migrationId];
            const migrationFn = isQuery(migration) ? migration : migration();
            const result = await migrationFn;

            if (result && result.first_error) throw result.first_error;

            currentMigration = migrationId;
            await (r as any).table("config").get("migration_current").replace({id: "migration_current", value: currentMigration});

            log("DONE RUNNING MIGRATION  ", migrationId);
        }

        if (doFirst && currentMigration < lastMigrationId) {
            currentMigration = lastMigrationId;
            await (r as any).table("config").get("migration_current").replace({id: "migration_current", value: currentMigration});
        }

        log("RELEASING MIGRATION LOCK");
        await (r as any).table("config").get("migration_status").update({value: "ok"});
    } catch (err) {
        console.log("MIGRATION FATAL FAILURE ", err);
        await (r as any).table("config").get("migration_status").update({value: "fatal"});
        await (r as any).table("config").get("migration_last_error").replace({id: "migration_last_error", value: err instanceof Error ? err.message : JSON.stringify(err, null, 2)});
        process.exit(94);
    }
}

// Old:

export interface ConfigureOptions {
    tables: {
        [name: string]: {
            indices?: any[]
        }
    }
}

export async function configure(options: ConfigureOptions) {
    if (await r.not(r.dbList().contains(dbName))) {
        await r.dbCreate(dbName);
    }

    const tables = Object.keys(options.tables);
    const realTables = await r.tableList();

    for (let i = 0; i < realTables.length; ++i) {
        if (tables.indexOf(realTables[i]) >= 0) continue;
        log(`WARNING: Should dropping table ${realTables[i]}...`);
        // await r.tableDrop(realTables[i]);
    }

    for (let i = 0; i < tables.length; ++i) {
        const table = tables[i];
        if (realTables.indexOf(table) < 0) {
            log(`Creating table ${table}...`);
            await r.tableCreate(table);
        }

        const indicesCreationFunc = options.tables[table].indices || [];
        const indices = indicesCreationFunc.map((creationFunc: any) => {
            const match = /^r\.table\("([^"]+)"\)\.indexCreate\("([^"]+)"/.exec(creationFunc.toString());
            if (match === null)
                throw "Invalid index expression: creationFunc.toString()";
            if (match[1] !== table)
                throw `Invalid index expression: Should use table ${table}, but uses ${match[1]}: creationFunc.toString()`;

            return match[2];
        });

        const realIndices = await (r as any).table(table).indexList();

        for (let i = 0; i < realIndices.length; ++i) {
            if (indices.indexOf(realIndices[i]) >= 0) continue;
            log(`Dropping index ${table}.${realIndices[i]}...`);
            // await (r as any).table(table).indexDrop(realIndices[i]);
        }

        for (let i = 0; i < indices.length; ++i) {
            if (realIndices.indexOf(indices[i]) < 0) {
                log(`Creating index ${table}.${indices[i]}...`);
                await indicesCreationFunc[i];
            } else {
                const status = await (r as any).table(table).indexStatus(indices[i])(0);

                let realDescr = status.query;
                let descr = indicesCreationFunc[i].toString();

                {
                    const match = /(function[\s\S]*\})/.exec(realDescr);
                    if (!match) throw `Index function doesn't contain a function??? ${JSON.stringify(realDescr)}`;
                    realDescr = match[1];
                }

                {
                    const match = /(function[\s\S]*\})/.exec(descr);
                    if (!match) descr = `function (var_1) { return var_1("${indices[i]}") }`;
                    else descr = match[1];
                }

                realDescr = global["eval"](`(${realDescr})`).toString();
                descr = global["eval"](`(${descr})`).toString();

                descr = descr.replace(/\n\s*/g, " ");
                realDescr = realDescr.replace(/\.getField/g, "");
                realDescr = realDescr.replace(/;/g, "");
                const varMapping: {[orig: string]: string} = {};
                const varMatches = /(_?var\d+)/.exec(realDescr) || [];
                for (let i = 0; i < varMatches.length; ++i) {
                    if (varMapping[varMatches[i]] === undefined) {
                        varMapping[varMatches[i]] = "var_" + (Object.keys(varMapping).length + 1);
                    }
                    realDescr = realDescr.replace(varMatches[i], varMapping[varMatches[i]]);
                }

                if (realDescr !== descr) {
                    log(`Recreating index ${table}.${indices[i]}...`);
                    await (r as any).table(table).indexDrop(indices[i]);
                    await indicesCreationFunc[i];
                }
            }
        }
    }

    log("Database structure is ready");
}
