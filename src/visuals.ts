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
        blocks: [
            "#3F2E56", // Big square
            "#F7DD72", // Big corner
            "#C6CA53", // Small square
            "#ED6A5A", // Dot
            "#9BC1BC", // Small corner
            "#ACACDE", // Big plank
            "#ABDAFC", // Small plank
        ],
        empty: "#BBBBBB",
        none: "rgba(0, 0, 0, 0)", // TODO: get correct color
    },
    cellSize: 30,
    cellMargin: 3,
    cornerRadius: 3,
};
