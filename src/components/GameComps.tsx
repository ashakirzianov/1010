import * as React from "react";
import { Shape, Figure, Board, Game, PlayArea } from "../model/game";
import { GameGridComp } from "./GameGrid";
import { mapMtx } from "../utils";
import { Stack, Line } from "./RenderComps";
import { Actions } from "./comp-utils";

type Comp<P, A = {}> = React.SFC<P & Actions<A>>;

const FigureComp: Comp<Figure & { selected: boolean }, { onClick: null }> = props =>
    <GameGridComp
        cellBorderColor={ props.selected ? "selected" : undefined }
        onClick={props.onClick}
        cells={mapMtx(props.shape, sc => sc === 1 ? props.color : "none")}
    />;

const BoardComp: Comp<Board> = props =>
    <GameGridComp
        cells={mapMtx(props.cells, cell =>
            cell.cell === "empty" ? "empty" : cell.color)}
    />;

const PlayAreaComp: Comp<PlayArea, { takeFigure: number }> = props =>
    <Stack align="center" margin={10}>
        <Line><BoardComp {...props.board}/></Line>
        <Line align="center" margin={5}>
            {
                props.availableFigures.map((f, i) =>
                    <FigureComp
                        selected={ i === props.figureInHand }
                        key={i}
                        onClick={() => props.takeFigure && props.takeFigure(i)}
                        {...f}
                    />)
            }
        </Line>
    </Stack>;

const GameComp: Comp<Game, { takeFigure: number }> = props =>
    <PlayAreaComp {...props.playArea} takeFigure={props.takeFigure} />;

export { GameComp };
