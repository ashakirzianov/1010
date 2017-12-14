export function takeFigure(figureIndex: number | undefined) {
    return {
        type: "TAKE_FIGURE",
        payload: figureIndex,
    };
}
