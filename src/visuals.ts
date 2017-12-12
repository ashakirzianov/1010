export type Color = string;

export type Palette = {
    blocks: Color[],
    empty: Color,
    none: Color,
};

export type VisualSettings = {
    palette: Palette,
    cellSize: number,
    cellMargin: number,
    cornerRadius: number,
};

export const visualSettings: VisualSettings = {
    palette: {
        blocks: ["red", "green", "blue", "yellow", "orange", "pink"],
        empty: "grey",
        none: "transparent", // TODO: get correct color
    },
    cellSize: 30,
    cellMargin: 3,
    cornerRadius: 3,
};
