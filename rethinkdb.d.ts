// From https://github.com/gcanti/typelevel-ts/blob/master/src/index.ts
type StringOmit<L1 extends string | number | symbol, L2 extends string | number | symbol> = ({ [P in L1]: P } &
    { [P in L2]: never } & { [key: string]: never })[L1]

type ObjectOmit<O, K extends string | number | symbol> = Pick<O, StringOmit<keyof O, K>>

type ObjectOptional<O, K extends keyof O> = ObjectOmit<O, K> & Partial<Pick<O, K>>


interface DBDevice {
    id: string
    date: Date
    ip: string
    type: "android" | "ios" | "web"
    platform: any
    fingerprint: string
    screen: {width: number, height: number}
    version: string
    language: string
    push?: string
}

interface DBApiCall {
    id: string
    name: string
    args: any
    executionId: string
    running: boolean
    device: DBDevice
    date: Date
    duration: number
    host: string
    ok: boolean
    result: any
    error: {type: string, message: string} | null
}

interface R_Sorting<T> { __dummy: string }

interface RPoint {
    __dummy: string
}

interface RGeometry {
    __dummy: string
}

interface R extends RDB {
    db(name: string): RDB
    dbList(): RArray<string>
    dbCreate(name: string): RDatum<{}>
    expr(obj: any): RDatum<any>
    point(longitude: number | RDatum<number>, latitude: number | RDatum<number>): RPoint;
    circle(point: number[] | RArray<number> | RPoint, radius: number | RDatum<number>): RGeometry
    distance(point1: RPoint, point2: RPoint, opts?: { unit?: "m" | "km" | "mi" | "nm" | "ft", geoSystem?: "WGS84" | "unit_sphere" }): RDatum<number>
    uuid(): RDatum<string>
    range(): RStream<number>
    range(count: number | RDatum<number>): RStream<number>
    range(initial: number | RDatum<number>, count: number | RDatum<number>): RStream<number>
    epochTime(epoch: number | RDatum<number>): RDatum<Date>
    time(year: number | RDatum<number>, month: number | RDatum<number>, day: number | RDatum<number>, tz: string | RDatum<string>): RDatum<Date>
    time(year: number | RDatum<number>, month: number | RDatum<number>, day: number | RDatum<number>, hour: number | RDatum<number>, minute: number | RDatum<number>, second: number | RDatum<number>, tz: string | RDatum<string>): RDatum<Date>
    add(...objs: any[]): RDatum<any>
    branch(c1: any, v1: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, k5: any, v5: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, c24: any, v24: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, c24: any, v24: any, c25: any, v25: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, c24: any, v24: any, c25: any, v25: any, c26: any, v26: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, c24: any, v24: any, c25: any, v25: any, c26: any, v26: any, c27: any, v27: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, c24: any, v24: any, c25: any, v25: any, c26: any, v26: any, c27: any, v27: any, c28: any, v28: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, c24: any, v24: any, c25: any, v25: any, c26: any, v26: any, c27: any, v27: any, c28: any, v28: any, c29: any, v29: any, otherwise: any): RDatum<any>
    branch(c1: any, v1: any, c2: any, v2: any, c3: any, v3: any, c4: any, v4: any, c5: any, v5: any, c6: any, v6: any, c7: any, v7: any, c8: any, v8: any, c9: any, v9: any, c10: any, v10: any, c11: any, v11: any, c12: any, v12: any, c13: any, v13: any, c14: any, v14: any, c15: any, v15: any, c16: any, v16: any, c17: any, v17: any, c18: any, v18: any, c19: any, v19: any, c20: any, v20: any, c21: any, v21: any, c22: any, v22: any, c23: any, v23: any, c24: any, v24: any, c25: any, v25: any, c26: any, v26: any, c27: any, v27: any, c28: any, v28: any, c29: any, v29: any, c30: any, v30: any, otherwise: any): RDatum<any>
    not(obj: any): RDatum<boolean>
    object(k1: any, v1: any): RDatum<any>
    object(k1: any, v1: any, k2: any, v2: any): RDatum<any>
    object(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any): RDatum<any>
    object(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any): RDatum<any>
    object(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any): RDatum<any>
    object(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any, k6: any, v6: any): RDatum<any>
    object(k1: any, v1: any, k2: any, v2: any, k3: any, v3: any, k4: any, v4: any, k5: any, v5: any, k6: any, v6: any, k7: any, v7: any): RDatum<any>
    and(...objs: any[]): RDatum<boolean>
    or(...objs: any[]): RDatum<boolean>
    eq(...objs: any[]): RDatum<boolean>
    ne(...objs: any[]): RDatum<boolean>
    gt(...objs: any[]): RDatum<boolean>
    lt(...objs: any[]): RDatum<boolean>
    ge(...objs: any[]): RDatum<boolean>
    le(...objs: any[]): RDatum<boolean>
    now(): RDatum<Date>
    asc<T>(name: T): R_Sorting<T>
    desc<T>(name: T): R_Sorting<T>
    asc(func: (obj: RDatum<any>) => any): R_Sorting<any>
    desc(func: (obj: RDatum<any>) => any): R_Sorting<any>
    args(array: any): any
    row: RTableRow<any>
    minval: RDatum<never>
    maxval: RDatum<never>
    error(message: string): RDatum<never>
    union<T1, T2>(stream1: RStream<T1>, stream2: RStream<T2>): RStream<T1 | T2>
    union<T1, T2, T3>(stream1: RStream<T1>, stream2: RStream<T2>, stream3: RStream<T3>): RStream<T1 | T2 | T3>
    union(...streams: any[]): RArray<any>
    js(code: string): RDatum<any>
    sum(arg: any): RDatum<any>
    avg(arg: any): RDatum<any>
    min(arg: any): RDatum<any>
    max(arg: any): RDatum<any>
    literal(arg: any): RDatum<any>
    "do": (...args: any[]) => RDatum<any>
}

interface RDB {
    table(name: string | RDatum<string>): RTable<any, any>;
    table(name: "devices"): RTable<DBDevice, any>;
    table(name: "api_calls"): RTable<DBApiCall, any>;
    tableList(): RArray<string>
    tableDrop(name: string): RDatum<{tables_dropped: 1, config_changes: {old_val: R_TableConfig, new_val: null}}>
    tableCreate(name: string, opts?: R_TableCreateOptions): RDatum<{tables_created: 1, config_changes: {old_val: null, new_val: R_TableConfig}}>
}

type RPrimitive = null | string | number | Date | boolean | Buffer

type RDatumfy<T> = {
    [P in keyof T]: T[P] | RDatum<T[P]> | RDatumfy<T[P]>;
};

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]> | T[P];
};

interface R_TableConfig {

}

interface R_TableCreateOptions {
    primaryKey?: string
    durability?: "soft" | "hard"
    shards?: number
    replicas?: number | {[server: string]: number}
    primaryReplicaTag?: string
}

interface RStreamOrDatum<T> {
    count(): RDatum<number>
}

interface RDatum<T> extends RStreamOrDatum<T>, PromiseLike<T> {
    reduce(func: (a: RDatum<any>, b: RDatum<any>) => any): RDatum<any>
    run(): PromiseLike<T>
    // do<X extends RPrimitive>(func: (obj: this) => X): RDatum<X>
    do(func: (obj: this) => any): RDatum<any>
    // default<X extends RPrimitive>(val: X): RDatum<T|X>
    default(val: any): RDatum<any>
    <K extends keyof T>(idx: K): RDatum<T[K]>
    (idx: number | RDatum<any>): RDatum<any>
    // orderBy(field: string | R_Sorting<string> | ((e: RDatum<any>) => any)): RArray<any>
    orderBy(field: any): RArray<any>
    merge(op: (e: RDatum<any>) => any): RDatum<any>
    merge(op: any): RDatum<any>
    map(func: (e: RDatum<any>) => any): RArray<any>
    map<U>(other: RArray<U> | RStream<U>, func: (e: RDatum<any>, x: RDatum<U>) => any): RArray<any>
    map(other: any, func: (e: RDatum<any>, x: RDatum<any>) => any): RArray<any>
    concatMap(func: (e: RDatum<any>) => any): RArray<any>
    sub(other: any): RDatum<any>
    div(other: any): RDatum<number>
    mod(other: any): RDatum<number>
    add(...others: any[]): RDatum<any>
    mul(...others: any[]): RDatum<number>
    append(other: any): RDatum<T>
    skip(other: any): RDatum<any>
    limit(other: any): RDatum<any>
    round(): RDatum<number>
    floor(): RDatum<number>
    ceil(): RDatum<number>
    without(field: any): RDatum<any>
    pluck(...field: any[]): RDatum<any>
    match(regex: string | RDatum<string>): RDatum<any>
    distinct(): RDatum<T>

    filter(criteria: (obj: any) => any): RDatum<T>
    filter(obj: any): RDatum<T>
    contains(obj: T extends Array<infer El> ? RDatum<El> | El : never): RDatum<boolean>
    contains(func: T extends Array<infer El> ? (e: RDatum<El>) => any : never): RDatum<boolean>
    isEmpty(): RDatum<boolean>
    upcase(): RDatum<string>
    downcase(): RDatum<string>

    eq(other: T | RDatum<T>): RDatum<boolean>
    ne(other: T | RDatum<T>): RDatum<boolean>
    gt(other: T | RDatum<T>): RDatum<boolean>
    lt(other: T | RDatum<T>): RDatum<boolean>
    ge(other: T | RDatum<T>): RDatum<boolean>
    le(other: T | RDatum<T>): RDatum<boolean>

    not(): RDatum<boolean>
    and(...objs: any[]): RDatum<boolean>
    or(...objs: any[]): RDatum<boolean>

    year(): RDatum<number>
    month(): RDatum<number>
    day(): RDatum<number>
    hours(): RDatum<number>
    minutes(): RDatum<number>
    seconds(): RDatum<number>

    split(by: string): RArray<any>
    coerceTo(type: "array"): RArray<any>
    coerceTo(type: "object"): RDatum<any>
    coerceTo(type: "string"): RDatum<string>
    coerceTo(type: "number"): RDatum<number>

    setInsert(other: any): RArray<any>
    setUnion(other: any): RArray<any>
    setIntersection(other: any): RArray<any>
    setDifference(other: any): RArray<any>
    append(value: any): RArray<any>
    prepend(value: any): RArray<any>
    difference(other: any): RArray<any>

    sum(): RDatum<any>
    sum(idx: string): RDatum<any>
    sum(func: (obj: RDatum<any>) => any): RDatum<any>
    avg(): RDatum<any>
    avg(idx: string): RDatum<any>
    avg(func: (obj: RDatum<any>) => any): RDatum<any>
    min(): RDatum<any>
    min(idx: string): RDatum<any>
    min(func: (obj: RDatum<any>) => any): RDatum<any>
    max(): RDatum<any>
    max(idx: string): RDatum<any>
    max(func: (obj: RDatum<any>) => any): RDatum<any>

    group(idx: string): RGroupedStream<any, any>
    group(func: (obj: RDatum<any>) => any): RGroupedStream<any, any>
    ungroup(): RArray<{group: any, reduction: any}>
    groupBy(func: string | ((obj: RDatum<any>) => any), transform: (obj: RArray<any>) => any): RArray<{group: any, reduction: any}>
    forEach(func: (e: RDatum<any>) => any): RDatum<{}>

    fold(base: any, func: (acc: RDatum<any>, row: RDatum<any>) => any, options?: {emit: (state: RDatum<any>, row: RDatum<any>, newState: RDatum<any>) => any}): RDatum<any>

    hasFields(fields: Array<keyof T>): RDatum<T>
    hasFields(field: keyof T): RDatum<T>

    date(): RDatum<Date>
    inTimezone(timezone: any): RDatum<Date>
    dayOfWeek(): RDatum<number>
    timeOfDay(): RDatum<number>

    deleteAt(offset: number | RDatum<number>, endOffset?: number | RDatum<number>): RDatum<any>
    insertAt(offset: number | RDatum<number>, value: RDatum<any> | any): RArray<any>

    toEpochTime(): RDatum<number>;

    nth(index: number | RDatum<number>): RDatum<any>

    typeOf(): RDatum<"ARRAY" | "BOOL" | "DB" |"FUNCTION" | "GROUPED_DATA" | "GROUPED_STREAM" |
        "MAXVAL" | "MINVAL" | "NULL" | "NUMBER" | "OBJECT" | "PTYPE<BINARY>" |
        "PTYPE<GEOMETRY>" | "PTYPE<TIME>" | "SELECTION<ARRAY>" | "SELECTION<OBJECT>" | "SELECTION<STREAM>" | "STREAM" |
        "STRING" | "TABLE_SLICE" | "TABLE">
}

interface RArray<T> extends RDatum<T[]> {
    (idx: number | RDatum<any>): RDatum<T>
    <K extends keyof T>(idx: K): RArray<T[K]>
    map(func: (e: RDatum<T>) => any): RArray<any>
    map<U>(other: RArray<U> | RStream<U>, func: (e: RDatum<T>, x: RDatum<U>) => any): RArray<any>
    map(other: any, func: (e: RDatum<T>, x: RDatum<any>) => any): RArray<any>
    merge(func: (e: RDatum<T>) => any): RArray<any>
    concatMap(func: (e: RDatum<T>) => any): RArray<any>
    orderBy(field: keyof T | R_Sorting<keyof T> | ((e: RDatum<T>) => any)): RArray<T>
    append(other: T): RArray<T>
    filter(criteria: (obj: RDatum<T>) => any): RArray<T>
    filter(obj: DeepPartial<RDatumfy<T>>): RArray<T>
    skip(other: any): RArray<T>
    limit(other: any): RArray<T>
    contains(obj: RDatum<T> | T): RDatum<boolean>
    contains(func: (e: RDatum<T>) => any): RDatum<boolean>
    reduce(func: (a: RDatum<T>, b: RDatum<T>) => any): RDatum<any>
    distinct(): RArray<T>
    sample(count: number | RDatum<number>): RArray<T>
    isEmpty(): RDatum<boolean>;

    setInsert(other: any): RArray<T>
    setUnion(other: any): RArray<T>
    setIntersection(other: any): RArray<T>
    setDifference(other: any): RArray<T>
    append(value: any): RArray<T>
    prepend(value: any): RArray<T>
    difference(other: any): RArray<T>

    sum(): RDatum<T>
    sum<K extends keyof T>(idx: K): RDatum<T[K]>
    sum(func: (obj: RDatum<T>) => any): RDatum<any>
    avg(): RDatum<T>
    avg<K extends keyof T>(idx: K): RDatum<T[K]>
    avg(func: (obj: RDatum<T>) => any): RDatum<any>
    min(): RDatum<T>
    min<K extends keyof T>(idx: K): RDatum<T>
    min(func: (obj: RDatum<T>) => any): RDatum<T>
    max(): RDatum<T>
    max<K extends keyof T>(idx: K): RDatum<T>
    max(func: (obj: RDatum<T>) => any): RDatum<T>

    group<K extends keyof T>(idx: K): RGroupedStream<T[K], T>
    group(func: (obj: RDatum<T>) => any): RGroupedStream<any, T>
    groupBy(func: string | ((obj: RDatum<T>) => any), transform: (obj: RArray<T>) => any): RArray<{group: any, reduction: any}>
    forEach(func: (e: RDatum<T>) => any): RDatum<{}>

    slice(startOffset: number | RDatum<number>, endOffset: number | RDatum<number>): RArray<T>
    deleteAt(offset: number | RDatum<number>, endOffset?: number | RDatum<number>): RArray<T>
    insertAt(offset: number | RDatum<number>, value: RDatum<any> | any): RArray<any>

    typeOf(): RDatum<"ARRAY" | "GROUPED_STREAM" | "GROUPED_DATA" | "SELECTION<ARRAY>">
}

interface RStream<T, IndexNames extends string = never> extends PromiseLike<T[]>, RStreamOrDatum<T[]> {
    run(): PromiseLike<T[]>
    (idx: number): RDatum<T>
    (field: string): RArray<any>
    map(func: (arg: RDatum<T>) => any): RStream<any>
    map<U>(other: RArray<U> | RStream<U>, func: (e: RDatum<T>, x: RDatum<U>) => any): RArray<any>
    map(other: any, func: (e: RDatum<T>, x: RDatum<any>) => any): RArray<any>
    merge(func: (arg: RDatum<T>) => any): RStream<any>
    concatMap(func: (arg: RDatum<T>) => any): RStream<any>
    orderBy(field: keyof T | R_Sorting<keyof T> | ((e: RDatum<T>) => any)): RArray<T>
    orderBy(options: {index: IndexNames | R_Sorting<IndexNames>}): RStream<T>
    coerceTo(type: "array"): RArray<T>
    filter(criteria: (obj: RDatum<T>) => any): RStream<T>
    filter(obj: DeepPartial<RDatumfy<T>>): RStream<T>
    skip(other: any): RStream<T>
    limit(other: any): RStream<T>
    reduce(func: (a: RDatum<T>, b: RDatum<T>) => any): RDatum<any>
    distinct(): RArray<T>
    sample(count: number | RDatum<number>): RStream<T>
    isEmpty(): RDatum<boolean>
    pluck(...field: (keyof T)[]): RStream<any>

    sum(): RDatum<T>
    sum<K extends keyof T>(idx: K): RDatum<T[K]>
    sum(func: (obj: RDatum<T>) => any): RDatum<any>
    avg(): RDatum<T>
    avg<K extends keyof T>(idx: K): RDatum<T[K]>
    avg(func: (obj: RDatum<T>) => any): RDatum<any>
    min(): RDatum<T>
    min<K extends keyof T>(idx: K): RDatum<T>
    min(func: (obj: RDatum<T>) => any): RDatum<T>
    max(): RDatum<T>
    max<K extends keyof T>(idx: K): RDatum<T>
    max(func: (obj: RDatum<T>) => any): RDatum<T>

    group<K extends keyof T>(idx: K): RGroupedStream<T[K], T>
    group(func: (obj: RDatum<T>) => any): RGroupedStream<any, T>
    groupBy(func: string | ((obj: RDatum<T>) => any), transform: (obj: RArray<T>) => any): RArray<{group: any, reduction: any}>
    forEach(func: (e: RDatum<T>) => any): RDatum<{}>
    fold(base: any, func: (acc: RDatum<any>, row: RDatum<any>) => any, options?: {emit: (state: RDatum<any>, row: RDatum<any>, newState: RDatum<any>) => any}): RDatum<any>

    typeOf(): RDatum<"STREAM" | "TABLE_SLICE" | "SELECTION<STREAM>" | "TABLE">
}

interface RGroupedStream<G, T> extends RArray<T> {
    ungroup(): RArray<{group: G, reduction: T[]}>

    typeOf(): RDatum<"GROUPED_STREAM" | "GROUPED_DATA">
}

interface R_UpdateOptions {
    durability?: "hard" | "soft"
    returnChanges?: true | false | "always"
    nonAtomic?: boolean
}

interface R_UpdateResult {
    replaced: number
    unchanged: number
    skipped: number
    errors: number
    first_error?: string
    deleted: 0
    inserted: 0
}

type RUpdateObj<T> = RDatum<T> | DeepPartial<RDatumfy<T>>

interface RTableSlice<T extends BaseDocument, IndexNames extends string> extends RStream<T, IndexNames> {
    update<Opts extends R_UpdateOptions & {returnChanges: true | "always"}>(obj: (obj: RDatum<T>) => any, options: Opts): RDatum<R_UpdateResult & {changes: {new_val: T, old_val: T}[]}>
    update(obj: (obj: RDatum<T>) => any, options?: R_UpdateOptions): RDatum<R_UpdateResult>
    update<Opts extends R_UpdateOptions & {returnChanges: true | "always"}>(obj: RUpdateObj<T>, options: Opts): RDatum<R_UpdateResult & {changes: {new_val: T, old_val: T}[]}>
    update(obj: RUpdateObj<T>, options?: R_UpdateOptions): RDatum<R_UpdateResult>
    replace(obj: (obj: RDatum<T>) => any, options?: R_UpdateOptions): RDatum<R_InsertResult>
    replace(obj: RInsertObj<T>, options?: R_UpdateOptions): RDatum<R_InsertResult>
    delete(): RDatum<{}>
    filter(criteria: (obj: RDatum<T>) => any): RTableSlice<T, IndexNames>
    filter(obj: DeepPartial<RDatumfy<T>>): RTableSlice<T, IndexNames>
    hasFields(fields: Array<keyof T>): RTableSlice<T, IndexNames>
    hasFields(field: keyof T): RTableSlice<T, IndexNames>
    (idx: number): RTableRow<T>
    distinct(): RArray<T>
    distinct(opts: {index: IndexNames}): RArray<any>

    typeOf(): RDatum<"TABLE_SLICE" | "SELECTION<STREAM>" | "TABLE">
}

interface RTableRow<T extends BaseDocument> extends RDatum<T> {
    update<Opts extends R_UpdateOptions & {returnChanges: true | "always"}>(obj: (obj: RDatum<T>) => any, options: Opts): RDatum<R_UpdateResult & {changes: {new_val: T, old_val: T}[]}>
    update(obj: (obj: RDatum<T>) => any, options?: R_UpdateOptions): RDatum<R_UpdateResult>
    update<Opts extends R_UpdateOptions & {returnChanges: true | "always"}>(obj: RUpdateObj<T>, options: Opts): RDatum<R_UpdateResult & {changes: {new_val: T, old_val: T}[]}>
    update(obj: RUpdateObj<T>, options?: R_UpdateOptions): RDatum<R_UpdateResult>
    replace(obj: (obj: RDatum<T>) => any, options?: R_UpdateOptions): RDatum<R_InsertResult>
    replace(obj: RInsertObj<T>, options?: R_UpdateOptions): RDatum<R_InsertResult>
    delete(): RDatum<{}>
    eq(other: T | RDatum<T> | null): RDatum<boolean>
    ne(other: T | RDatum<T> | null): RDatum<boolean>

    typeOf(): RDatum<"SELECTION<OBJECT>">
}

interface R_InsertOptions<T extends BaseDocument> {
    durability?: "hard" | "soft"
    returnChanges?: true | false | "always"
    conflict?: "error" | "replace" | "update" | ((id: string, oldDoc: RDatum<T>, newDoc: RDatum<T>) => any)
}

interface R_InsertResult {
    inserted: number
    replaced: number
    unchanged: number
    errors: number
    first_error?: string
    deleted: 0
    skipped: 0
    generated_keys: string[]
    warnings?: string[]
}

interface R_IndexStatus {
    index: string
    ready: boolean
    progress?: number
    function: Buffer
    multi: boolean
    geo: boolean
    outdated: boolean
    query: string
}

type BaseDocument = {id: any}

type RInsertObjInternal<T> = RDatum<T> | RStream<T> | RDatum<T[]> | RDatumfy<T>[] | (() => RInsertObjInternal<T>) | RDatumfy<T>
type RInsertObj<T extends BaseDocument> = RInsertObjInternal<ObjectOptional<T, "id">>

interface RTable<T extends BaseDocument, IndexNames extends string = string> extends RTableSlice<T, IndexNames> {
    get(id: any): RTableRow<T>
    insert<Opts extends R_InsertOptions<T> & {returnChanges: true | "always"}>(obj: RInsertObj<T>, options: Opts): RDatum<R_InsertResult & {changes: {new_val: T, old_val: T}[]}>
    insert(obj: RInsertObj<T>, options?: R_InsertOptions<T>): RDatum<R_InsertResult>

    indexList(): RArray<string>
    indexCreate(name: IndexNames, func: (obj: RDatum<T>) => any, opts?: {multi?: boolean, geo?: boolean}): RDatum<{created: 1}>
    indexCreate(name: (keyof T) & IndexNames, opts?: {multi?: boolean, geo?: boolean}): RDatum<{created: 1}>
    indexDrop(name: string): RDatum<{dropped: 1}>
    indexStatus(...names: string[]): RArray<R_IndexStatus>
    indexWait(...names: string[]): RArray<R_IndexStatus>

    getAll(id: any, opts?: {index: IndexNames}): RTableSlice<T, IndexNames>
    getAll(id1: any, id2: any, opts?: {index: IndexNames}): RTableSlice<T, IndexNames>
    getAll(id1: any, id2: any, id3: any, opts?: {index: IndexNames}): RTableSlice<T, IndexNames>
    getAll(id1: any, id2: any, id3: any, id4: any, opts?: {index: IndexNames}): RTableSlice<T, IndexNames>
    getAll(id1: any, id2: any, id3: any, id4: any, id5: any, opts?: {index: IndexNames}): RTableSlice<T, IndexNames>
    between(lower: any, upper: any, opts?: {index: IndexNames, leftBound?: "closed" | "open", rightBound?: "closed" | "open"}): RTableSlice<T, IndexNames>

    getNearest(id: RPoint, opts: { index: IndexNames, maxResults?: number, unit?: "m" | "km" | "mi" | "nm" | "ft", maxDist?: number, geoSystem?: "WGS84" | "unit_sphere" }): RArray<{doc: T, dist: number}>
    getIntersecting(id: RGeometry, opts: { index: IndexNames }): RTableSlice<T, IndexNames>

    slice(startOffset: number | RDatum<number>, endOffset: number | RDatum<number>): RTableSlice<T, IndexNames>

    withFields(fields: string[]): RTableSlice<T, IndexNames>

    typeOf(): RDatum<"TABLE">
}
