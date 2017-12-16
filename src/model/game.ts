import { ColorCode } from "../visuals";

export type ShapeCell = 0 | 1;
export type Shape = ShapeCell[][];

export type Figure = {
    color: ColorCode,
    shape: Shape,
};

export type EmptyCell = { cell: "empty" };
export type FullCell = { cell: "full", color: ColorCode };
export type Cell = EmptyCell | FullCell;

export type Board = {
    cells: Cell[][],
};

export type PlayArea = {
    board: Board,
    availableFigures: Figure[],
    figureInHand: number | undefined,
};

export type GameSettings = {
    figureBank: Figure[],
    boardSize: { rows: number, cols: number },
    handSize: number,
};

export type Game = {
    playArea: PlayArea,
    settings: GameSettings,
};
