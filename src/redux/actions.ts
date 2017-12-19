import { MtxIdx } from "../utils";

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
