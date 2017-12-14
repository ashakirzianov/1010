import { Game, GameSettings, PlayArea, Cell } from "./game";
import { allFigures } from "./figures";
import { pickRandom, range } from "../utils";

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
        board: {
            cells: range(settings.boardSize.rows).map(i =>
                range(settings.boardSize.cols).map<Cell>(j =>
                    ({ cell: "empty" }))),
        },
        availableFigures: range(settings.handSize)
            .map(i => pickRandom(settings.figureBank)),
        figureInHand: undefined,
    };
}
