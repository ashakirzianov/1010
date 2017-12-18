import { Game, GameSettings, PlayArea, Cell, Figure } from "./game";
import { allFigures } from "./figures";
import { pickRandom, range, mapMtx } from "../utils";
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
    size: { rows: number, cols: number },
    position?: { row: number, col: number },
): Cell[][] {
    return range(size.rows).map(i =>
        range(size.cols).map<Cell>(j =>
            !position || !figure // If there is no position or figure, whole layer is empty
            || i < position.row || j < position.col // Cell is empty if it's "before" the figure position
            || figure.shape.length <= i - position.row
            || figure.shape[0].length <= j - position.col
            || figure.shape[i - position.row][j - position.col] === 0 // Cell is empty if figure shape is empty
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

export function colorFromCell(cell: Cell): ColorCode {
    return cell.cell === "empty" ? "empty"
        : cell.cell === "full" ? cell.color
        : "selected" // TODO: fix
        ;
}
