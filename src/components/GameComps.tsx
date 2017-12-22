import * as React from "react";
import {
    StyledGameGrid, GameGridCell, Big,
    TextButton, Comp, Line,
    Screen, MessageBox, Stack, Medium, LightGrey, Orange, Bold,
} from "./Styled";
import { mapMtx, MtxIdx } from "../utils";
import { Callbacks } from "./comp-utils";
import { Shape, Figure, Game, Board, Cell } from "../model/game";
import { ActionsTemplate } from "../model/actions";
import { placeFigureOn, figureInHand } from "../model/logic";

const FigureComp: Comp<Figure & { selected: boolean }, { onClick: MtxIdx }> = props =>
    <StyledGameGrid
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
        <Big>
            <LightGrey>Score: </LightGrey><Orange><Bold>{props.score.toString()}</Bold></Orange>
        </Big>
    </Line>;

const CellsComp: typeof BoardComp = props =>
    <Line>
        <StyledGameGrid
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
    newGame: {},
}> = props =>
        <TextButton onClick={props.newGame}><Big>New game</Big></TextButton>;

const GameOverComp: Comp<{
    over: boolean,
    score: number,
}, {
        newGame: {},
    }> = props =>
        <Screen background="rgba(51,51,51,0.7)" visible={props.over}>
            <MessageBox>
                <Stack>
                    <Big>"Game over!"</Big>
                    <Big>{`Your score: ${props.score}`}</Big>
                    <NewGameComp newGame={props.newGame} />
                </Stack>
            </MessageBox>
        </Screen>;

type BoardActions = ActionsTemplate;
const BoardComp: Comp<Board, BoardActions> = props =>
    <Stack align="center" margin={10}>
        <GameOverComp
            over={props.isGameOver}
            newGame={props.newGame}
            score={props.score}
        />
        <ScoreComp score={props.score} />
        <CellsComp { ...props } />
        <HandComp { ...props } />
        <NewGameComp newGame={props.newGame} />
    </Stack>;

const GameComp: React.SFC<{
    store: Game,
    callbacks: Callbacks<BoardActions>,
}> = props =>
        <BoardComp
            { ...props.callbacks }
            {...props.store.board }
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
