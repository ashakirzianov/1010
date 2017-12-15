import * as React from "react";
import { ColorCode } from "../model/game";
import { Palette, VisualSettings, visualSettings } from "../visuals";
import { mapMtx } from "../utils";
import { Grid } from "./RenderComps";

function cellColor(colorCode: ColorCode, palette: Palette) {
    return colorCode === "empty" ? palette.empty
        : colorCode === "none" ? palette.none
        : palette.blocks[colorCode];
}

type GameGridProps = {
    cells: ColorCode[][],
};
function makeGameGridComp(vs: VisualSettings): React.SFC<GameGridProps> {
    const GameGrid: React.SFC<GameGridProps> = props =>
        <Grid
            rows={mapMtx(props.cells, c => ({ color: cellColor(c, vs.palette)}))}
            cellSize={vs.cellSize}
            margin={vs.cellMargin}
            borderRadius={vs.cornerRadius}
        />;

    return GameGrid;
}

export const ActualGameGrid = makeGameGridComp(visualSettings);
