export type Color = string;
export type ColorName = "empty" | "none" | "selected";
export type ColorCode = number | ColorName;

export type Palette = {
    blocks: Color[],
} & {
    [k in ColorName]: Color;
};

export type VisualSettings = typeof visualSettings;

export const visualSettings = {
    palette: {
        blocks: [
            "#3F2E56", // 3 square
            "#C6CA53", // 2 square
            "#F7DD72", // 3 corner
            "#9BC1BC", // 2 corner
            "#248230", // 5 plank
            "#826a24", // 4 plank
            "#ACACDE", // 3 plank
            "#ABDAFC", // 2 plank
            "#ED6A5A", // Dot
        ],
        empty: "#EEEEEE",
        none: "rgba(0, 0, 0, 0)",
        selected: "orange",
    },
    cellSize: "2.5em",
    cellMargin: "0.5em",
    cornerRadius: "0.8em",
    selectedWidth: "0.2em",
};

export function cellColor(colorCode: ColorCode, palette: Palette) {
    return typeof colorCode === "number" ?
        palette.blocks[colorCode] : palette[colorCode];
}
