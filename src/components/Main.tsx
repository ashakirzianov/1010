import * as React from "react";
import { Grid } from "./RenderComps";
import { PlayArea, Board, Cell } from "../game";
import { PlayAreaComp } from "./GameComps";
import { range } from "../utils";

function makeBoard(): Board {
    return {
        cells: range(0, 9).map(i => range(0, 9).map<Cell>(j => ({ cell: "empty" }))),
    };
}

const testPlayArea: PlayArea = {
    board: makeBoard(),
    availableFigures: [
        {
            color: 0,
            shape: [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ],
        },
        {
            color: 2,
            shape: [
                [1, 1, 1],
                [1, 0, 0],
                [1, 0, 0],
            ],
        },
        {
            color: 4,
            shape: [
                [1, 1],
                [1, 0],
            ],
        },
    ],
};

export const App: React.SFC<{}> = props =>
    <PlayAreaComp { ...testPlayArea } />;
