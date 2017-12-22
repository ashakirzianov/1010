import * as React from "react";
import { Palette, VisualSettings, visualSettings, ColorCode, cellColor } from "../visuals";
import { mapMtx, Map } from "../utils";
import {
    Comp,
    Grid, GridCell, Text,
    Line, Stack, Screen, MessageBox, Button, TextStyle,
} from "./Library";
import { CallbacksOpt, apply, defaults } from "./comp-utils";
import { Cell } from "../model/game";

export type GameGridCell = {
    color: ColorCode,
    borderColor?: ColorCode,
};

const GameGrid: Comp<{
    cells: GameGridCell[][],
    vs: VisualSettings,
}, {
        onClick: [number, number],
        mouseOverCell: [number, number] | undefined,
    }> = props =>
        <Grid
            mouseOverCell={props.mouseOverCell}
            onClick={props.onClick}
            rows={mapMtx(props.cells, c => makeGridCell(c, props.vs.palette))}
            cellSize={props.vs.cellSize}
            margin={props.vs.cellMargin}
            borderRadius={props.vs.cornerRadius}
            borderWidth={props.vs.selectedWidth}
        />;

const StyledGameGrid = apply(GameGrid)({
    vs: visualSettings,
    onClick: undefined,
    mouseOverCell: undefined,
});

function styledText(style: TextStyle) {
    return apply(Text)({
        style: style,
    });
}

const styles: Map<TextStyle> = {
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
        fontSize: "1.5em",
        fontWeight: 400,
    },
    big: {
        fontSize: "2em",
        fontWeight: 400,
    },
    bold: {
        fontWeight: 600,
    },
};

const Blue = styledText(styles.blue);
const LightGrey = styledText(styles.lightGrey);
const Orange = styledText(styles.orange);

const Small = styledText(styles.small);
const Medium = styledText(styles.medium);
const Big = styledText(styles.big);

const Hoverable = styledText(styles.hoverable);

const Bold = styledText(styles.bold);

const TextButton: typeof Button = props =>
    <Button {...props}>
        <Text style={{ ...styles.hoverable, ...styles.blue, ...styles.medium }}>
            {props.children}
        </Text>
    </Button>;

export {
    StyledGameGrid,
    Small, Medium, Big, Blue, LightGrey, Orange, Bold,
    TextButton,
};

// Re-exports from Library:

export {
    Comp,
    Stack, Line,
    Screen, MessageBox,
};

// Local utils -------

function makeGridCell(cell: GameGridCell, palette: Palette): GridCell {
    return {
        color: cellColor(cell.color, palette),
        borderColor: cell.borderColor !== undefined
            ? cellColor(cell.borderColor, palette)
            : undefined,
    };
}
