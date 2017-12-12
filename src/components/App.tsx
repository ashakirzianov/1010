import * as React from "react";
import { Cell, Grid } from "./Render";

function range(start: number, end: number) {
    const result = new Array<number>();
    for (let i = start; i < end; i++) {
        result[i - start] = i;
    }

    return result;
}

function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function pickRandom<T>(arr: T[]) {
    return arr[randomInt(arr.length)];
}

function makeRows(n: number, m: number) {
    const colors = ["red", "yellow", "green", "blue"];
    return range(0, n).map(
        i => range(0, m).map(
            j => ({ color: pickRandom(colors)})));
}

export const App: React.SFC<{}> = props =>
    <Grid
        rows={ makeRows(3, 5) }
        cellSize={50}
    />;
