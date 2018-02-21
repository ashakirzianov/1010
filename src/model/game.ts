import { ColorCode } from "../visuals";
import { MtxIdx } from "../utils";

export type ShapeCell = 0 | 1;
export type Shape = ShapeCell[][];

export type Figure = {
    color: ColorCode,
    shape: Shape,
};

export type EmptyCell = { cell: "empty" };
export type FullCell = { cell: "full", color: ColorCode, selected?: boolean };
export type ConflictCell = { cell: "conflict", top: Cell, bottom: Cell };
export type Cell = EmptyCell | FullCell | ConflictCell;

export type Board = {
    score: number,
    cells: Cell[][],
    availableFigures: Figure[],
    inHand: { figure: number, dragIdx: MtxIdx } | undefined,
    placePosition?: MtxIdx,
    isGameOver: boolean,
    nextHand: () => Figure[],
    nextGame: () => Board,
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
