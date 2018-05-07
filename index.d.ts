export declare type Migration = PromiseLike<any> | (() => PromiseLike<any>);
export interface Migrations {
    [n: number]: Migration;
}
export declare function connect(db: string, host?: string): R;
export declare function migrate(migrations: Migrations, doFirst?: number[]): Promise<void>;
export interface ConfigureOptions {
    tables: {
        [name: string]: {
            indices?: any[];
        };
    };
}
export declare function configure(options: ConfigureOptions): Promise<void>;
