import * as React from "react";
import { Shape, ColorCode, Figure, Board, Game, PlayArea, GameActions, PlayAreaActions } from "../model/game";
import { GameGrid } from "./GameGrid";
import { mapMtx } from "../utils";
import { Stack, Line } from "./RenderComps";

type Comp<Props, Actions = {}> = React.SFC<Props & {
    [name in keyof Actions]: (arg: Actions[name]) => void;
}>;

export const FigureComp: Comp<Figure> = props =>
    <GameGrid
        cells={mapMtx(props.shape, sc => sc === 1 ? props.color : "none")}
    />;

export const BoardComp: Comp<Board> = props =>
    <GameGrid
        cells={mapMtx(props.cells, cell =>
            cell.cell === "empty" ? "empty" : cell.color)}
    />;

export const PlayAreaComp: Comp<PlayArea, PlayAreaActions> = props =>
    <Stack align="center" margin={10}>
        <Line><BoardComp {...props.board}/></Line>
        <Line align="center" margin={5}>
            {props.availableFigures.map(f => <FigureComp {...f}/>)}
        </Line>
    </Stack>;

export const GameComp: Comp<Game, GameActions> = props =>
    <PlayAreaComp {...props.playArea} takeFigure={props.takeFigure} />;
