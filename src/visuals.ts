export type Color = string;
export type ColorName = "empty" | "none" | "selected";
export type ColorCode = number | ColorName;

export type Palette = {
    blocks: Color[],
} & {
    [k in ColorName]: Color;
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
        none: "rgba(0, 0, 0, 0)",
        selected: "orange",
    },
    cellSize: 30,
    cellMargin: 3,
    cornerRadius: 5,
};

export function cellColor(colorCode: ColorCode, palette: Palette) {
    return typeof colorCode === "number" ?
        palette.blocks[colorCode] : palette[colorCode];
}
