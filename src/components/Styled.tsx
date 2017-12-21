import * as React from "react";
import { Palette, VisualSettings, visualSettings, ColorCode, cellColor } from "../visuals";
import { mapMtx } from "../utils";
import {
    Comp,
    Grid, GridCell,
    TextButton, Text,
    Line, Stack, Screen, MessageBox,
} from "./Library";
import { CallbacksOpt, apply } from "./comp-utils";
import { Cell } from "../model/game";

export type GameGridCell = {
    color: ColorCode,
    borderColor?: ColorCode,
};

const GameGrid: Comp<{
    cells: GameGridCell[][],
    vs: VisualSettings,
}, {
    onClick: [number, number],
    mouseOverCell: [number, number] | undefined,
}> = props =>
        <Grid
            mouseOverCell={props.mouseOverCell}
            onClick={props.onClick}
            rows={mapMtx(props.cells, c => makeGridCell(c, props.vs.palette))}
            cellSize={props.vs.cellSize}
            margin={props.vs.cellMargin}
            borderRadius={props.vs.cornerRadius}
            borderWidth={props.vs.selectedWidth}
        />;

const StyledGameGrid = apply(GameGrid)({
    vs: visualSettings,
    onClick: undefined,
    mouseOverCell: undefined,
});

const BigText = apply(Text)({size: "2em", weight: 400, color: "#4286f4" });
const BigTextButton = apply(TextButton)({size: "3em", weight: 400, color: "#4286f4", onClick: undefined });

export {
    StyledGameGrid,
    BigText,
    BigTextButton,
};

// Re-exports from Library:

export {
    Comp,
    Stack, Line,
    Screen, MessageBox,
};

// Local utils -------

function makeGridCell(cell: GameGridCell, palette: Palette): GridCell {
    return {
        color: cellColor(cell.color, palette),
        borderColor: cell.borderColor !== undefined
            ? cellColor(cell.borderColor, palette)
            : undefined,
    };
}
