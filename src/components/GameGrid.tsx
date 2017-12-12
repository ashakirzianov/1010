import * as React from "react";
import { ColorCode } from "../Game";
import { Palette, VisualSettings, visualSettings } from "../visuals";
import { mapMatrix } from "../utils";
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
    const TheGameGridComp: React.SFC<GameGridProps> = props =>
        <Grid
            rows={mapMatrix(props.cells, c => ({ color: cellColor(c, vs.palette)}))}
            cellSize={vs.cellSize}
            margin={vs.cellMargin}
            borderRadius={vs.cornerRadius}
        />;

    return TheGameGridComp;
}

export const GameGrid = makeGameGridComp(visualSettings);
