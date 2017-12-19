import { Game, GameSettings, Board, Cell, Figure } from "./game";
import { allFigures } from "./figures";
import { pickRandom, range, mapMtx, sizeMtx, MtxIdx, MtxSize, everyMtx, Mtx, removeAtIndex, letExp, columnsMtx, contains } from "../utils";
import { ColorCode } from "../visuals";

export const defaultSettings: GameSettings = {
    figureBank: allFigures,
    boardSize: {
        rows: 10,
        cols: 10,
    },
    handSize: 3,
};

export function createGame(settings: GameSettings = defaultSettings): Game {
    return {
        board: buildBoard(settings),
        settings: settings,
    };
}

function buildBoard(settings: GameSettings): Board {
    const nextHand = () => range(settings.handSize)
        .map(i => pickRandom(settings.figureBank));

    return {
        cells: range(settings.boardSize.rows).map(i =>
            range(settings.boardSize.cols).map<Cell>(j =>
                ({ cell: "empty" }))),
        availableFigures: nextHand(),
        figureInHand: undefined,
        placePosition: undefined,
        nextHand: nextHand,
    };
}

export function figureInHand(board: Board) {
    return board.figureInHand === undefined ? undefined
        : board.availableFigures[board.figureInHand];
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

export function tryPlace(layer: Cell[][], figure?: Figure, position?: MtxIdx) {
    if (position === undefined || figure === undefined) {
        return { succ: false as false };
    }

    const placed = placeFigureOn(layer, figure, position);
    return !isFigureOnBoard(figure, position, sizeMtx(layer))
        || !everyMtx(placed, cell => cell.cell !== "conflict")
        ? { succ: false as false }
        : {
            succ: true as true,
            cells: placed,
        };
}

export function tryPlaceCurrentFigure(board: Board): Board { // TODO: consider refactoring
    const figure = figureInHand(board);
    const res = tryPlace(board.cells, figure, board.placePosition);

    return res.succ ? {
        ...board,
        cells: removeFilled(res.cells),
        availableFigures: letExp(removeAtIndex(board.availableFigures, board.figureInHand), af =>
            af.length === 0 ? board.nextHand() : af),
        figureInHand: undefined,
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

export function removeFilled(layer: Cell[][]) {
    const rows = indexesToRemove(layer);
    const cols = indexesToRemove(columnsMtx(layer));

    return mapMtx(layer, (cell, idx) =>
        contains(rows, idx[0]) || contains(cols, idx[1])
            ? { cell: "empty" as "empty" }
            : cell
    );
}
