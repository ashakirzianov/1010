import { ColorCode } from "../visuals";
import { MtxIdx } from "../utils";

export type ShapeCell = 0 | 1;
export type Shape = ShapeCell[][];

export type Figure = {
    color: ColorCode,
    shape: Shape,
};

export type EmptyCell = { cell: "empty" };
export type FullCell = { cell: "full", color: ColorCode };
export type ConflictCell = { cell: "conflict", top: Cell, bottom: Cell };
export type Cell = EmptyCell | FullCell | ConflictCell;

export type Board = {
    cells: Cell[][],
    availableFigures: Figure[],
    figureInHand: number | undefined,
    placePosition?: MtxIdx,
    nextHand: () => Figure[],
};

export type GameSettings = {
    figureBank: Figure[],
    boardSize: { rows: number, cols: number },
    handSize: number,
};

export type Game = {
    board: Board,
    settings: GameSettings,
};
