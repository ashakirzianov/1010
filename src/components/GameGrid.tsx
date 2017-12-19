import * as React from "react";
import { Palette, VisualSettings, visualSettings, ColorCode, cellColor } from "../visuals";
import { mapMtx } from "../utils";
import { Grid, GridCell } from "./RenderComps";
import { Actions } from "./comp-utils";
import { Cell } from "../model/game";

export type GameGridCell = {
    color: ColorCode,
    borderColor?: ColorCode,
};
type GameGridProps = {
    cells: GameGridCell[][],
} & Actions<{
    onClick: [number, number],
    mouseOverCell: [number, number] | undefined,
}>;
function makeGameGridComp(vs: VisualSettings): React.SFC<GameGridProps> {
    const GameGrid: React.SFC<GameGridProps> = props =>
        <Grid
            mouseOverCell={props.mouseOverCell}
            onClick={props.onClick}
            rows={mapMtx(props.cells, c => makeGridCell(c, vs.palette))}
            cellSize={vs.cellSize}
            margin={vs.cellMargin}
            borderRadius={vs.cornerRadius}
            borderWidth={vs.selectedWidth}
        />;

    return GameGrid;
}

function makeGridCell(cell: GameGridCell, palette: Palette): GridCell {
    return {
        color: cellColor(cell.color, palette),
        borderColor: cell.borderColor !== undefined
            ? cellColor(cell.borderColor, palette)
            : undefined,
    };
}

export const GameGridComp = makeGameGridComp(visualSettings);
