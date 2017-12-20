import { MtxIdx } from "../utils";
import { Action } from "redux";

export function takeFigure(figureIndex: number | undefined) {
    return {
        type: "TAKE_FIGURE",
        payload: figureIndex,
    };
}

export function targetOver(targetPosition: MtxIdx | undefined) {
    return {
        type: "TARGET_OVER",
        payload: targetPosition,
    };
}

export function placeOn(position: MtxIdx) {
    return {
        type: "PLACE_ON",
        payload: position,
    };
}

export function newGame() {
    return {
        type: "NEW_GAME",
    };
}
