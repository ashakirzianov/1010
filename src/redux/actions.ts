export function takeFigure(figureIndex: number | undefined) {
    return {
        type: "TAKE_FIGURE",
        payload: figureIndex,
    };
}

export function targetOver(targetPosition: [number, number] | undefined) {
    return {
        type: "TARGET_OVER",
        payload: targetPosition && {
            row: targetPosition[0],
            col: targetPosition[1],
        },
    };
}
