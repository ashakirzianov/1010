import { Game, GameSettings, Board, Cell, Figure } from "./game";
import { allFigures } from "./figures";
import {
    pickRandom, range, mapMtx, sizeMtx, MtxIdx, MtxSize,
    everyMtx, Mtx, removeAtIndex, letExp, columnsMtx, contains,
    reduceMtx, combineF, combineFs, someMtx, diffIdx,
} from "../utils";
import { ColorCode } from "../visuals";

export const defaultSettings: GameSettings = {
    figureBank: allFigures,
    boardSize: {
        rows: 10,
        cols: 10,
    },
    handSize: 3,
};

export function isGame(obj: object | undefined): obj is Game {
    const game = obj as Partial<Game> | undefined;
    return game !== undefined && game.board !== undefined && isBoard(game.board);
}

function isBoard(obj: object): obj is Board {
    const board = obj as Partial<Board>;
    return board.score !== undefined
        && board.cells !== undefined
        && board.availableFigures !== undefined
        && board.isGameOver !== undefined
        && board.settings !== undefined
        ;
}

export function createGame(settings: GameSettings = defaultSettings): Game {
    return {
        board: buildBoard(settings),
    };
}

export function buildBoard(settings: GameSettings): Board {
    return {
        score: 0,
        bestScore: 0,
        cells: range(settings.boardSize.rows).map(i =>
            range(settings.boardSize.cols).map<Cell>(j =>
                ({ cell: "empty" }))),
        availableFigures: nextHand(settings),
        inHand: undefined,
        placePosition: undefined,
        isGameOver: false,
        settings: settings,
    };
}

export function nextHand(settings: GameSettings): Figure[] {
    return range(settings.handSize)
        .map(i => pickRandom(settings.figureBank));
}

export function figureInHand(board: Board) {
    return board.inHand === undefined ? undefined
        : board.availableFigures[board.inHand.figure];
}

export function makeFigureLayer(
    figure: Figure | undefined,
    size: MtxSize,
    position?: MtxIdx,
): Cell[][] {
    return range(size.rows).map(i =>
        range(size.cols).map<Cell>(j =>
            !position || !figure // If there is no position or figure, whole layer is empty
                || i < position[0] || j < position[1] // Cell is empty if it's "before" the figure position
                || figure.shape.length <= i - position[0]
                || figure.shape[0].length <= j - position[1]
                || figure.shape[i - position[0]][j - position[1]] === 0 // Cell is empty if figure shape is empty
                ? { cell: "empty" }
                : { cell: "full", color: figure.color }));
}

export function combineLayers(bottom: Cell[][], top: Cell[][]): Cell[][] {
    return mapMtx<Cell, Cell>(top, (tc, [i, j]) => {
        const bc = bottom[i][j];
        return tc.cell === "empty" ? bc
            : bc.cell === "empty" ? tc
                : {
                    cell: "conflict",
                    top: tc,
                    bottom: bc,
                };
    });
}

export function placeFigureOn(layer: Cell[][], figure?: Figure, position?: MtxIdx) {
    return combineLayers(layer, makeFigureLayer(
        figure,
        sizeMtx(layer),
        position,
    ));
}

export function isFigureOnBoard(figure: Figure, position: MtxIdx, boardSize: MtxSize) {
    return figure.shape.every((row, i) =>
        row.every((cell, j) =>
            cell === 0 || (i + position[0] < boardSize.rows && j + position[1] < boardSize.cols)));
}

export function canPlaceFigure(layer: Cell[][], figure?: Figure, position?: MtxIdx) {
    return figure !== undefined && position !== undefined
        && isFigureOnBoard(figure, position, sizeMtx(layer))
        && everyMtx(placeFigureOn(layer, figure, position), cell =>
            cell.cell !== "conflict");
}

export function placeCurrentFigure(board: Board): Board {
    return board.placePosition && board.inHand
        && canPlaceFigure(board.cells, figureInHand(board), diffIdx(board.placePosition, board.inHand.dragIdx))
        ? {
            ...board,
            cells: placeFigureOn(board.cells, figureInHand(board), diffIdx(board.placePosition, board.inHand.dragIdx)),
            score: board.score + scoreFigure(figureInHand(board)),
            availableFigures: letExp(removeAtIndex(board.availableFigures, board.inHand.figure), af =>
                af.length === 0 ? nextHand(board.settings) : af),
            inHand: undefined,
        } : { ...board };
}

export function removeFilled(board: Board): Board {
    const rows = indexesToRemove(board.cells);
    const cols = indexesToRemove(columnsMtx(board.cells));

    return {
        ...board,
        cells: mapMtx(board.cells, (cell, idx) =>
            contains(rows, idx[0]) || contains(cols, idx[1])
                ? { cell: "empty" as "empty" }
                : cell
        ),
        score: board.score
            + (rows.length + cols.length + Math.min(rows.length, cols.length)) * 10,
    };
}

export function isGameOver(layer: Cell[][], hand: Figure[]) {
    return !hand.some(figure =>
            someMtx(layer, (cell, idx) =>
                canPlaceFigure(layer, figure, idx)));
}

export function updateGameOver(board: Board): Board {
    return isGameOver(board.cells, board.availableFigures)
        ? {
            ...board,
            bestScore: Math.max(board.bestScore, board.score),
            isGameOver: true,
        }
        : { ...board };
}

export function needToRemove(line: Cell[]) {
    return line.every(cell => cell.cell === "full");
}

export function indexesToRemove(lines: Cell[][]) {
    return lines.reduce((acc, line, i) =>
        needToRemove(line) ? acc.concat(i) : acc, new Array<number>());
}

export function scoreFigure(figure?: Figure) {
    return figure ? reduceMtx(figure.shape, (acc, c) => acc + c, 0) : 0;
}

export const tryPlaceCurrentFigure = combineFs(
    updateGameOver,
    removeFilled,
    placeCurrentFigure,
);
