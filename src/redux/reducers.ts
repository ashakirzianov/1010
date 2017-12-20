import { combineReducers, AnyAction } from "redux";
import { Store } from "./store";
import { Board, GameSettings } from "../model/game";
import { combineLayers, tryPlaceCurrentFigure } from "../model/logic";

function board(store: Board = null as any, action: AnyAction): Board {
    switch (action.type) {
        case "takeFigure":
            return {
                ...store,
                figureInHand: store.figureInHand === action.payload ?
                    undefined : action.payload,
            };
        case "targetOver":
            return {
                ...store,
                placePosition: action.payload,
            };
        case "placeOn":
            return tryPlaceCurrentFigure(store);
        case "newGame":
            return {
                ...store.nextGame(),
            };
        default:
            return store;
    }
}

function gameSettings(store: GameSettings = null as any, action: AnyAction) {
    return store;
}

export const reducer = combineReducers<Store>({
    board: board,
    settings: gameSettings,
});
