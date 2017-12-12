import * as React from "react";
import { Shape, ColorCode, Figure, Board, Game, PlayArea } from "../Game";
import { GameGrid } from "./GameGrid";
import { mapMatrix } from "../utils";
import { Stack, Line } from "./RenderComps";

type SFC<T> = React.SFC<T>;

export const FigureComp: SFC<Figure> = props =>
    <GameGrid
        cells={mapMatrix(props.shape, sc => sc === 1 ? props.color : "none")}
    />;

export const BoardComp: SFC<Board> = props =>
    <GameGrid
        cells={mapMatrix(props.cells, cell =>
            cell.cell === "empty" ? "empty" : cell.color)}
    />;

export const PlayAreaComp: SFC<PlayArea> = props =>
    <Stack>
        <Line><BoardComp {...props.board}/></Line>
        <Line>{props.availableFigures.map(f => <FigureComp {...f}/>)}</Line>
    </Stack>;
