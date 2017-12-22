import * as React from "react";
import {
    StyledGameGrid, GameGridCell, Big,
    TextButton, Comp, Line,
    Screen, MessageBox, Stack, Medium, LightGrey, Orange, Bold, Red, StyledText, Black, Padded, Green,
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
        <TextButton onClick={props.newGame}>New game</TextButton>;

const GameOverComp: Comp<{
    over: boolean,
    score: number,
}, {
        newGame: {},
    }> = props =>
        <Screen visible={props.over}>
            <MessageBox>
                <Stack>
                    <StyledText styles={["big", "red"]}>Game over!</StyledText>
                    <Padded padding="5em">
                        <Line>
                            <Medium>
                                <Black>Score: </Black><Orange><Bold>{props.score.toString()}</Bold></Orange>
                            </Medium>
                        </Line>
                        <Line>
                            <Medium>
                                <Black>Best score: </Black><Green><Bold>0</Bold></Green>
                            </Medium>
                        </Line>
                    </Padded>
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
