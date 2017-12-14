import { arch } from "os";

export function range(start: number, end: number) {
    const result = new Array<number>();
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

export function makeRows(n: number, m: number) {
    const colors = ["red", "yellow", "green", "blue"];
    return range(0, n).map(
        i => range(0, m).map(
            j => ({ color: pickRandom(colors) })));
}

export function mapMtx<T, U>(mtx: T[][], f: (x: T) => U): U[][] {
    return mtx.map(row => row.map(f));
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

export type MatrixBorders = {
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
};
export function subMtx(borders: MatrixBorders) {
    return function f<T>(mtx: T[][]) {
        return range(borders.startRow, borders.endRow).map(i =>
            range(borders.startCol, borders.endCol).map(j =>
                mtx[i][j]));
    };
}

export function sameArrays<T>(a1: T[], a2: T[]): boolean {
    return a1.length === a2.length
        && a1.every((x, i) => x === a2[i]);
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
