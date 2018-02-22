import { buildReducer, buildPartialReducer } from "./redux-utils";
import { Board, Game, GameSettings } from "../model/game";
import { ActionsTemplate } from "../model/actions";
import { tryPlaceCurrentFigure, createGame, buildBoard } from "../model/logic";
import { combineReducers } from "./react-redux-utils";

const board = buildReducer<Board, ActionsTemplate>({
    takeFigure: (s, p) => ({
        inHand: s.inHand === p ? undefined : p,
    }),
    targetOver: (s, p) => ({
        placePosition: p,
    }),
    placeOn: (s, p) => ({
        new: tryPlaceCurrentFigure(s),
    }),
    newGame: (s, p) => ({
        new: buildBoard(s.settings),
    }),
});

const settings = buildPartialReducer<GameSettings, ActionsTemplate>({
});

export const reducer = combineReducers<Game, ActionsTemplate>({
    board,
});
