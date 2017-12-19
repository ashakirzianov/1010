import * as React from "react";
import { Palette, VisualSettings, visualSettings, ColorCode, cellColor } from "../visuals";
import { mapMtx } from "../utils";
import { Grid, GridCell } from "./RenderComps";
import { Actions } from "./comp-utils";
import { Cell } from "../model/game";

type GameGridProps = {
    cells: Cell[][],
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
        />;

    return GameGrid;
}

function makeGridCell(cell: Cell, palette: Palette): GridCell {
    return cell.cell === "empty" ? { color: palette.empty }
        : cell.cell === "full" ? { color: cellColor(cell.color, palette) }
        : { color: palette.none }
        ;
}

export const GameGridComp = makeGameGridComp(visualSettings);
