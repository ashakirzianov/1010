import * as React from "react";
import { Shape, Figure, Game, PlayArea } from "../model/game";
import { GameGridComp } from "./GameGrid";
import { mapMtx, letExp, itemAtIndex, sizeMtx } from "../utils";
import { Stack, Line } from "./RenderComps";
import { Actions } from "./comp-utils";
import { makeFigureLayer, combineLayers, colorFromCell } from "../model/logic";

type Comp<P, A = {}> = React.SFC<P & Actions<A>>;

const FigureComp: Comp<Figure & { selected: boolean }, { onClick: null }> = props =>
    <GameGridComp
        cellBorderColor={props.selected ? "selected" : undefined}
        onClick={props.onClick}
        cells={mapMtx(props.shape, sc => sc === 1 ? props.color : "none")}
    />;

const PlayAreaComp: Comp<PlayArea, {
    takeFigure: number,
    targetOver: [number, number] | undefined,
}> = props =>
        <Stack align="center" margin={10}>
            <Line>
                <GameGridComp
                    mouseOverCell={props.targetOver}
                    cells={
                        mapMtx(combineLayers(props.cells, makeFigureLayer(
                            itemAtIndex(props.availableFigures, props.figureInHand),
                            sizeMtx(props.cells),
                            props.placePosition,
                        )), colorFromCell)
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
    targetOver: [number, number] | undefined,
}> = props =>
        <PlayAreaComp
            targetOver={props.targetOver}
            takeFigure={props.takeFigure}
            {...props.playArea}
        />;

export { GameComp };
