import * as React from "react";
import { Palette, VisualSettings, visualSettings, ColorCode, cellColor } from "../visuals";
import { mapMtx, Map } from "../utils";
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

const textStyles: Map<TextStyle> = {
    hoverable: {
        ":hover": {
            cursor: "pointer",
            borderBottom: "0.3em dotted",
        },
    },
    blue: { color: "#4286f4" },
    lightGrey: { color: "#CCCCCC" },
    orange: { color: "#f4bc42" },
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
};

const styledText = applyStyle(Text);
const Blue = styledText(textStyles.blue);
const LightGrey = styledText(textStyles.lightGrey);
const Orange = styledText(textStyles.orange);

const Small = styledText(textStyles.small);
const Medium = styledText(textStyles.medium);
const Big = styledText(textStyles.big);

const Hoverable = styledText(textStyles.hoverable);

const Bold = styledText(textStyles.bold);

const Button = Lib.Button;
const TextButton: typeof Button = props =>
    <Button {...props}>
        <Text style={{ ...textStyles.hoverable, ...textStyles.blue, ...textStyles.small }}>
            {props.children}
        </Text>
    </Button>;

const Stack = Lib.Stack;
const Line = Lib.Line;
const Screen = partial(Lib.Screen)({ background: "rgba(0, 0, 0, 0.2)", visible: undefined });
const MessageBox = applyStyle(Lib.MessageBox)({
    background: "rgba(255, 255, 255, 0.9)",
    padding: "3em",
    marginTop: "-25%",
});

export {
    StyledGameGrid,
    Small, Medium, Big, Blue, LightGrey, Orange, Bold,
    TextButton,
    Stack, Line, Screen, MessageBox,
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
