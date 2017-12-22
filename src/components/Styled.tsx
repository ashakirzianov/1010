import * as React from "react";
import { Palette, VisualSettings, visualSettings, ColorCode, cellColor } from "../visuals";
import { mapMtx, Map, buildMap } from "../utils";
import * as Lib from "./Library";
import { Comp } from "./Library";
import { CallbacksOpt, partial, defaults } from "./comp-utils";
import { Cell } from "../model/game";

export type GameGridCell = {
    color: ColorCode,
    borderColor?: ColorCode,
};

const GameGrid: Lib.Comp<{
    cells: GameGridCell[][],
    vs: VisualSettings,
}, {
        onClick: [number, number],
        mouseOverCell: [number, number] | undefined,
    }> = props =>
        <Lib.Grid
            mouseOverCell={props.mouseOverCell}
            onClick={props.onClick}
            rows={mapMtx(props.cells, c => makeGridCell(c, props.vs.palette))}
            cellSize={props.vs.cellSize}
            margin={props.vs.cellMargin}
            borderRadius={props.vs.cornerRadius}
            borderWidth={props.vs.selectedWidth}
        />;

const StyledGameGrid = partial(GameGrid)({
    vs: visualSettings,
    onClick: undefined,
    mouseOverCell: undefined,
});

function applyStyle<T extends { style: S }, S = T["style"]>(c: Comp<T>) {
    return (style: S) => partial(c)({ style: style });
}

const Text = Lib.Text;
type TextStyle = Lib.TextStyle;

const textStyles = buildMap<TextStyle>()({
    hoverable: {
        borderBottom: "0.1em dotted",
        ":hover": {
            cursor: "pointer",
            borderBottom: "0.1em solid",
        },
    },
    blue: { color: "#4286f4" },
    lightGrey: { color: "#EEEEEE" },
    black: { color: "#000000" },
    orange: { color: "#f4bc42" },
    red: { color: "#f45c41" },
    green: { color: "#3daf33" },
    small: {
        fontSize: "1em",
        fontWeight: 400,
    },
    medium: {
        fontSize: "2em",
        fontWeight: 400,
    },
    big: {
        fontSize: "3em",
        fontWeight: 400,
    },
    bold: {
        fontWeight: 600,
    },
});

const styledText = applyStyle(Text);
export const Blue = styledText(textStyles.blue);
export const LightGrey = styledText(textStyles.lightGrey);
export const Black = styledText(textStyles.black);
export const Orange = styledText(textStyles.orange);
export const Red = styledText(textStyles.red);
export const Green = styledText(textStyles.green);

const Small = styledText(textStyles.small);
const Medium = styledText(textStyles.medium);
const Big = styledText(textStyles.big);

const Hoverable = styledText(textStyles.hoverable);

const Bold = styledText(textStyles.bold);

export const StyledText: Comp<{
    styles?: Array<keyof typeof textStyles>,
}> = props => {
    const C = styledText((props.styles || []).reduce((acc, sn) =>
            ({ ...acc, ...textStyles[sn] }), {}));
    return <C>{props.children}</C>;
};

const Button = Lib.Button;
const TextButton: typeof Button = props =>
    <Button {...props}>
        <Text style={{ ...textStyles.hoverable, ...textStyles.blue, ...textStyles.medium }}>
            {props.children}
        </Text>
    </Button>;

export const Padded = Lib.Padded;
export const Stack = Lib.Stack;
export const Line = Lib.Line;
export const Screen = partial(Lib.Screen)({ background: "rgba(0, 0, 0, 0.2)", visible: undefined });
export const MessageBox = applyStyle(Lib.MessageBox)({
    background: "rgba(255, 255, 255, 0.9)",
    padding: "2em",
    marginTop: "-25%",
    boxShadow: "0.35em 0.35em rgba(0, 0, 0, 0.5)",
});

export {
    StyledGameGrid,
    Small, Medium, Big, Bold,
    TextButton,
    Comp,
};

// Local utils -------

function makeGridCell(cell: GameGridCell, palette: Palette): Lib.GridCell {
    return {
        color: cellColor(cell.color, palette),
        borderColor: cell.borderColor !== undefined
            ? cellColor(cell.borderColor, palette)
            : undefined,
    };
}
