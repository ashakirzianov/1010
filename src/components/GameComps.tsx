import * as React from "react";
import { Shape, ColorCode, Figure, Board, Game, PlayArea } from "../game";
import { GameGrid } from "./GameGrid";
import { mapMatrix } from "../utils";
import { Stack, Line } from "./RenderComps";

type Comp<T> = React.SFC<T>;

export const FigureComp: Comp<Figure> = props =>
    <GameGrid
        cells={mapMatrix(props.shape, sc => sc === 1 ? props.color : "none")}
    />;

export const BoardComp: Comp<Board> = props =>
    <GameGrid
        cells={mapMatrix(props.cells, cell =>
            cell.cell === "empty" ? "empty" : cell.color)}
    />;

export const PlayAreaComp: Comp<PlayArea> = props =>
    <Stack align="center" margin={10}>
        <Line><BoardComp {...props.board}/></Line>
        <Line align="center" margin={5}>
            {props.availableFigures.map(f => <FigureComp {...f}/>)}
        </Line>
    </Stack>;
