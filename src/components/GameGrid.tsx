import * as React from "react";
import { Palette, VisualSettings, visualSettings, ColorCode, cellColor } from "../visuals";
import { mapMtx } from "../utils";
import { Grid } from "./RenderComps";
import { Actions } from "./comp-utils";

type GameGridProps = {
    cells: ColorCode[][],
    cellBorderColor?: ColorCode,
} & Actions<{
    onClick: null,
    mouseOverCell: [number, number] | undefined,
}>;
function makeGameGridComp(vs: VisualSettings): React.SFC<GameGridProps> {
    const GameGrid: React.SFC<GameGridProps> = props =>
        <Grid
            mouseOverCell={props.mouseOverCell}
            cellBorderColor={ props.cellBorderColor === undefined ? undefined : cellColor(props.cellBorderColor, vs.palette)}
            onClick={props.onClick}
            rows={mapMtx(props.cells, c => ({ color: cellColor(c, vs.palette)}))}
            cellSize={vs.cellSize}
            margin={vs.cellMargin}
            borderRadius={vs.cornerRadius}
        />;

    return GameGrid;
}

export const GameGridComp = makeGameGridComp(visualSettings);
