import { buildReducer, bugWorkaround } from "./redux-utils";
import { Board, Game } from "../model/game";
import { ActionsTemplate } from "../model/actions";
import { tryPlaceCurrentFigure } from "../model/logic";
import { combineReducers } from "redux";

const board = buildReducer<Board, ActionsTemplate>({
    takeFigure: (s, p) => ({
        figureInHand: s.figureInHand === p ? undefined : p,
    }),
    targetOver: (s, p) => ({
        placePosition: p,
    }),
    placeOn: (s, p) => ({
        new: tryPlaceCurrentFigure(s),
    }),
    newGame: (s, p) => ({
        new: s.nextGame(),
    }),
});

const settings = buildReducer<Board, ActionsTemplate>({
    default: s => s,
});

export const reducer = combineReducers<Game>({
    board: bugWorkaround(board),
    settings: bugWorkaround(settings),
});
