export type StringDiff<T extends string, U extends string> =
    ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

export type StringIntersection<T extends string, U extends string> =
    StringDiff<T | U, StringDiff<T, U> | StringDiff<U, T>>;

export type TypeDiff<T, U> = {
    [k in StringDiff<keyof T, keyof U>]: T[k];
};

export type Partialize<T, U> = {
    [k in StringDiff<keyof T, keyof U>]: T[k];
} & Partial<T>;

export type Undefined<T> = { [t in keyof T]: undefined };

export type KeyRestriction<T, U extends string> = {
    [k in StringIntersection<keyof T, U>]?: never
} &  {
    [k in U]?: undefined
};

export type RestrictedComb<T extends KeyRestriction<T, keyof U>, U> = T & U;

export type Map<T> = { [k: string]: T };

export type ValueConstraint<T, ValueType> = {
    [k in keyof T]: ValueType;
};

export function range(end: number): number[];
// tslint:disable-next-line:unified-signatures
export function range(start: number, end: number): number[];
export function range(n1: number, n2?: number) {
    const result: number[] = [];
    const start = n2 === undefined ? 0 : n1;
    const end = n2 === undefined ? n1 : n2;
    for (let i = start; i < end; i++) {
        result[i - start] = i;
    }

    return result;
}

export function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function pickRandom<T>(arr: T[]) {
    return arr[randomInt(arr.length)];
}

export type Mtx<T> = T[][];
export type MtxIdx = [number, number];
export type MtxBorders = {
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
};

export type MtxSize = {
    rows: number,
    cols: number,
};

export function invIdx(idx: MtxIdx): MtxIdx {
    return [-idx[0], -idx[1]];
}

export function sumIdx(left: MtxIdx, right: MtxIdx): MtxIdx {
    return [left[0] + right[0], left[1] + right[1]];
}

export function diffIdx(left: MtxIdx, right: MtxIdx): MtxIdx {
    return sumIdx(left, invIdx(right));
}

export function makeMtx<T>(init: T, rows: number, cols: number): T[][] {
    return range(rows).map(i =>
        range(cols).map(j => init));
}

export function mapMtx<T, U>(mtx: T[][], f: (x: T, idx: MtxIdx) => U): U[][] {
    return mtx.map((row, i) => row.map((col, j) => f(col, [i, j])));
}

export function someMtx<T>(mtx: Mtx<T>, p: (x: T, idx: MtxIdx) => boolean) {
    return mtx.some((row, i) => row.some((cell, j) => p(cell, [i, j])));
}

export function everyMtx<T>(mtx: Mtx<T>, p: (x: T, idx: MtxIdx) => boolean) {
    return mtx.every((row, i) => row.every((cell, j) => p(cell, [i, j])));
}

function reduceMtxHelper<T, U>(mtx: T[][], f: (acc: U, curr: T, idx: [number, number]) => U, init: U): U {
    let acc = init;
    for (let i = 0; i < mtx.length; i++) {
        for (let j = 0; j < mtx[i].length; j++) {
            if (i !== 0 || j !== 0) {
                acc = f(acc, mtx[i][j], [i, j]);
            }
        }
    }

    return acc;
}

export function reduceMtx<T>(mtx: T[][], f: (acc: T, curr: T, idx: [number, number]) => T): T;
export function reduceMtx<T, U>(mtx: T[][], f: (acc: U, curr: T, idx: [number, number]) => U, init: U): U;
export function reduceMtx<T, U>(mtx: T[][], f: (acc: U, curr: T, idx: [number, number]) => U, init?: U): U {
    const acc = init === undefined ?
        mtx[0][0] as any
        : f(init, mtx[0][0], [0, 0]);
    return reduceMtxHelper(mtx, f, acc);
}

export function subMtx(borders: MtxBorders) {
    return function f<T>(mtx: T[][]) {
        return range(borders.startRow, borders.endRow).map(i =>
            range(borders.startCol, borders.endCol).map(j =>
                mtx[i][j]));
    };
}

export function sizeMtx<T>(mtx: T[][]): MtxSize {
    return {
        rows: mtx.length,
        cols: mtx[0].length,
    };
}

export function columnsMtx<T>(mtx: Mtx<T>): T[][] {
    return range(mtx[0].length).map(j =>
        range(mtx.length).map(i => mtx[i][j]));
}

export function rotateClockwiseMtx<T>(mtx: Mtx<T>): Mtx<T> {
    return columnsMtx(mtx.slice(0).reverse());
}

export function sameMtxs<T>(m1: Mtx<T>, m2: Mtx<T>): boolean {
    return m1.length === m2.length && m1.every((row, i) => sameArrays(row, m2[i]));
}

export function sameArrays<T>(a1: T[], a2: T[]): boolean {
    return a1.length === a2.length
        && a1.every((x, i) => x === a2[i]);
}

export function contains<T>(arr: T[], x: T) {
    return arr.some(e => e === x);
}

export function distinct<T>(comp: (x: T, y: T) => boolean) {
    return function f(arr: T[]) {
        return arr.reduce((acc, curr) =>
            // tslint:disable-next-line:ban-comma-operator
            acc.some(a => comp(a, curr)) ? acc : (acc.push(curr), acc), new Array<T>());
    };
}

export function flatten<T>(mtx: T[][]): T[] {
    return mtx.reduce((acc, arr) => acc.concat(arr));
}

export function matricify(cols: number) {
    return function f<T>(arr: T[]) {
        const mtx: T[][] = [];
        for (let i = 0; i < arr.length / cols; i++) {
            mtx[i] = [];
            for (let j = 0; j < cols; j++) {
                const index = j + i * cols;
                if (index >= arr.length) {
                    break;
                }
                mtx[i][j] = arr[j + i * cols];
            }
        }

        return mtx;
    };
}

export function letExp<T, U>(x: T, f: (x: T) => U) {
    return f(x);
}

export function exp<T>(f: () => T): T {
    return f();
}

export function itemAtIndex<T>(arr: T[], idx: number | undefined): T | undefined {
    return idx === undefined ? undefined : arr[idx];
}

export function removeAtIndex<T>(arr: T[], idx?: number): T[] {
    return idx === undefined ? arr : arr.slice(0, idx).concat(arr.slice(idx + 1));
}

export function combineF<S, T, U>(f: (x: T) => U, g: (x: S) => T) {
    return (x: S) => f(g(x));
}

export function combineFs<T>(...fs: Array<(x: T) => T>) {
    return fs.reduce((acc, f) => combineF(acc, f));
}

export function keys<T>(obj: T): Array<keyof T> {
    return Object.keys(obj) as any;
}

export function mapObject<T, U>(
    obj: T,
    f: <K extends keyof T, V extends T[K]>(k: K, v: V) => U,
): { [k in keyof T]: U } {
    return keys(obj).reduce((acc, key) =>
        ({ ...acc, [key]: f(key, obj[key]) }), {} as any);
}

export function def<T = {}>() {
    return null as any as T;
}

export function defOpt<T>() {
    return def<T | undefined>();
}

export function buildMap<T>() {
    return <M extends Map<T>>(obj: M) => obj;
}
