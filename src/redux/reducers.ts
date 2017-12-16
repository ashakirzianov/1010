import { combineReducers, AnyAction } from "redux";
import { Store } from "./store";
import { PlayArea, GameSettings } from "../model/game";

function playArea(store: PlayArea = null as any, action: AnyAction): PlayArea {
    switch (action.type) {
        case "TAKE_FIGURE":
            return {
                ...store,
                figureInHand: store.figureInHand === action.payload ?
                    undefined : action.payload,
            };
        default:
            return store;
    }
}

function gameSettings(store: GameSettings = null as any, action: AnyAction) {
    return store;
}

export const reducer = combineReducers<Store>({
    playArea: playArea,
    settings: gameSettings,
});
