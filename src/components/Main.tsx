import * as React from "react";
import { Grid } from "./RenderComps";
import { PlayArea, Board, Cell } from "../game";
import { PlayAreaComp } from "./GameComps";
import { range, pickRandom } from "../utils";
import { allFigures } from "../figures";

function makeBoard(): Board {
    return {
        cells: range(0, 9).map(i => range(0, 9).map<Cell>(j => ({ cell: "empty" }))),
    };
}

const testPlayArea: PlayArea = {
    board: makeBoard(),
    availableFigures: range(0, 3).map(i => pickRandom(allFigures)),
};

export const App: React.SFC<{}> = props =>
    <PlayAreaComp { ...testPlayArea } />;
