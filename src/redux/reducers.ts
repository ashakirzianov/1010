import { combineReducers, AnyAction } from "redux";
import { Store } from "./store";
import { Board, GameSettings } from "../model/game";
import { combineLayers, tryPlaceCurrentFigure } from "../model/logic";

function board(store: Board = null as any, action: AnyAction): Board {
    switch (action.type) {
        case "TAKE_FIGURE":
            return {
                ...store,
                figureInHand: store.figureInHand === action.payload ?
                    undefined : action.payload,
            };
        case "TARGET_OVER":
            return {
                ...store,
                placePosition: action.payload,
            };
        case "PLACE_ON":
            return tryPlaceCurrentFigure(store);
        case "NEW_GAME":
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
