import * as React from "react";
import { Shape, Figure, Game, Board } from "../model/game";
import { GameGridComp } from "./GameGrid";
import { mapMtx, letExp, itemAtIndex, sizeMtx, MtxIdx } from "../utils";
import { Stack, Line } from "./RenderComps";
import { Actions } from "./comp-utils";
import { makeFigureLayer, combineLayers, colorFromCell, placeFigureOn } from "../model/logic";

type Comp<P, A = {}> = React.SFC<P & Actions<A>>;

const FigureComp: Comp<Figure & { selected: boolean }, { onClick: MtxIdx }> = props =>
    <GameGridComp
        // cellBorderColor={props.selected ? "selected" : undefined}
        onClick={props.onClick}
        cells={mapMtx(props.shape, sc => sc === 1
            ? { cell: "full" as "full", color: props.color }
            : { cell: "empty" as "empty" }
        )}
    />;

const BoardComp: Comp<Board, {
    placeOn: MtxIdx,
    takeFigure: number,
    targetOver: MtxIdx | undefined,
}> = props =>
        <Stack align="center" margin={10}>
            <Line>
                <GameGridComp
                    mouseOverCell={props.targetOver}
                    onClick={props.placeOn}
                    cells=
                    {
                        placeFigureOn(
                            props.cells,
                            itemAtIndex(props.availableFigures, props.figureInHand),
                            props.placePosition,
                        )
                    }
                />
            </Line>
            <Line align="center" margin={5}>
                {
                    props.availableFigures.map((f, i) =>
                        <FigureComp
                            selected={i === props.figureInHand}
                            key={i}
                            onClick={() => props.takeFigure && props.takeFigure(i)}
                            {...f}
                        />)
                }
            </Line>
        </Stack>;

const GameComp: Comp<Game, {
    takeFigure: number,
    targetOver: MtxIdx | undefined,
    placeOn: MtxIdx,
}> = props =>
        <BoardComp
            targetOver={props.targetOver}
            takeFigure={props.takeFigure}
            placeOn={props.placeOn}
            {...props.board}
        />;

export { GameComp };
