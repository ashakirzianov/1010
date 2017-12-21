import { buildReducer, bugWorkaround, buildPartialReducer } from "./redux-utils";
import { Board, Game, GameSettings } from "../model/game";
import { ActionsTemplate } from "../model/actions";
import { tryPlaceCurrentFigure } from "../model/logic";
import { combineReducers } from "./react-redux-utils";

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

const settings = buildPartialReducer<GameSettings, ActionsTemplate>({
});

export const reducer = combineReducers<Game, ActionsTemplate>({
    board,
    settings,
});
