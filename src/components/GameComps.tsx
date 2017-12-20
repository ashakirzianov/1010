import * as React from "react";
import { Shape, Figure, Game, Board, Cell } from "../model/game";
import { GameGridComp, GameGridCell } from "./GameGrid";
import { mapMtx, letExp, itemAtIndex, sizeMtx, MtxIdx } from "../utils";
import { Stack, Line, Div, BigText, Screen, MessageBox, BigButton } from "./RenderComps";
import { Actions } from "./comp-utils";
import { makeFigureLayer, combineLayers, placeFigureOn, figureInHand } from "../model/logic";

type Comp<P, A = {}> = React.SFC<P & Actions<A>>;

const FigureComp: Comp<Figure & { selected: boolean }, { onClick: MtxIdx }> = props =>
    <GameGridComp
        onClick={props.onClick}
        cells={mapMtx(props.shape, sc => sc === 1
            ? {
                color: props.color, borderColor: props.selected
                    ? "selected" as "selected" : undefined,
            }
            : { color: "none" as "none" }
        )}
    />;

const ScoreComp: Comp<{ score: number }> = props =>
        <Line>
            <BigText>{ props.score.toString() }</BigText>
        </Line>;

const CellsComp: typeof BoardComp = props =>
    <Line>
        <GameGridComp
            mouseOverCell={props.targetOver}
            onClick={props.placeOn}
            cells={combinedCells(props)}
        />
    </Line>;

const HandComp: typeof BoardComp = props =>
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
    </Line>;

const NewGameComp: Comp<{}, {
    onClick: null,
}> = props =>
    <BigButton onClick={x =>{
        console.debug("hello");
        props.onClick && props.onClick(null);
    }}>
        New game
    </BigButton>;

const GameOverComp: Comp<{
    over: boolean,
}> = props =>
    <Screen background="rgba(51,51,51,0.7)" visible={props.over}>
        <MessageBox>
            <BigText>Game over!</BigText>
        </MessageBox>
    </Screen>;

type BoardActions = {
    placeOn: MtxIdx,
    takeFigure: number,
    targetOver: MtxIdx | undefined,
    newGame: any,
};
const BoardComp: Comp<Board, BoardActions> = props =>
        <Stack align="center" margin={10}>
            <GameOverComp over={props.isGameOver} />
            <ScoreComp score={props.score} />
            <CellsComp { ...props } />
            <HandComp { ...props } />
            <NewGameComp onClick={props.newGame} />
        </Stack>;

const GameComp: Comp<Game, BoardActions> = props =>
        <BoardComp
            targetOver={props.targetOver}
            takeFigure={props.takeFigure}
            placeOn={props.placeOn}
            newGame={props.newGame}
            {...props.board}
        />;

export { GameComp };

// ----- Local Utils

function transformToGameGrid(cell: Cell): GameGridCell {
    return cell.cell === "empty" ? { color: "empty" }
        : cell.cell === "full" ? { color: cell.color }
            : cell.top.cell === "full" && cell.bottom.cell === "full" ? {
                color: cell.bottom.color,
                borderColor: cell.top.color,
            } : transformToGameGrid(cell.top)
        ;
}

function combinedCells(board: Board) {
    return mapMtx(
        placeFigureOn(
            board.cells,
            figureInHand(board),
            board.placePosition,
        ),
        transformToGameGrid,
    );
}
