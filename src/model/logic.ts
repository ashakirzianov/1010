import { Game, GameSettings, PlayArea, Cell, Figure } from "./game";
import { allFigures } from "./figures";
import { pickRandom, range, mapMtx, sizeMtx, MtxIdx, itemAtIndex, MtxSize, everyMtx, Mtx, removeAtIndex } from "../utils";
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
        playArea: buildPlayArea(settings),
        settings: settings,
    };
}

function buildPlayArea(settings: GameSettings): PlayArea {
    return {
        cells: range(settings.boardSize.rows).map(i =>
            range(settings.boardSize.cols).map<Cell>(j =>
                ({ cell: "empty" }))),
        availableFigures: range(settings.handSize)
            .map(i => pickRandom(settings.figureBank)),
        figureInHand: undefined,
        placePosition: undefined,
    };
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

export function colorFromCell(cell: Cell): ColorCode {
    return cell.cell === "empty" ? "empty"
        : cell.cell === "full" ? cell.color
            : "selected" // TODO: fix
        ;
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

export function tryPlaceCurrentFigure(playArea: PlayArea): PlayArea { // TODO: consider refactoring
    if (playArea.figureInHand === undefined) {
        return { ...playArea };
    }
    const figure = playArea.availableFigures[playArea.figureInHand];
    const res = tryPlace(playArea.cells, figure, playArea.placePosition);

    return res.succ ? {
        ...playArea,
        cells: res.cells,
        availableFigures: removeAtIndex(playArea.availableFigures, playArea.figureInHand),
        figureInHand: undefined,
    }
    : {...playArea };
}
