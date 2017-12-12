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
            j => ({ color: pickRandom(colors)})));
}

export function mapMatrix<T, U>(mtx: T[][], f: (x: T) => U): U[][] {
    return mtx.map(row => row.map(f));
}
