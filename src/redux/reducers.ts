import { combineReducers, AnyAction } from "redux";
import { Store } from "./store";
import { PlayArea, GameSettings } from "../model/game";

function playArea(store: PlayArea = null as any, action: AnyAction) {
    return store;
}

function gameSettings(store: GameSettings = null as any, action: AnyAction) {
    return store;
}

export const reducer = combineReducers<Store>({
    playArea: playArea,
    settings: gameSettings,
});
