import * as React from "react";
import { CallbacksOpt, apply, hoverable, Callbacks, Hoverable, } from "./comp-utils";
import { MtxIdx, KeyRestriction, TypeDiff } from "../utils";

export type Comp<P extends KeyRestriction<P, keyof A>, A = {}> = React.SFC<P & CallbacksOpt<A>>;

export type Size = number | string;
export type FontWeight =
    | "normal" | "bold" | "bolder" | "lighter"
    | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type DisplayValue = "block" | "inline" | "inline-block";
export type AlignValue = "left" | "center" | "right";
const Div: Comp<{
    display?: DisplayValue,
    align?: AlignValue,
    margin?: Size,
}> = props =>
        <div style={{
            display: props.display || "block",
            textAlign: props.align,
            margin: props.margin || 0,
        }}>
            {props.children}
        </div>;

export type TextStyle = Hoverable<{
    fontSize?: Size,
    fontWeight?: FontWeight,
    color?: Color,
    borderBottom?: string,
    cursor?: "pointer",
}>;
const Text: Comp<{
    style: TextStyle,
}, {
}> = hoverable(props =>
    <span
        style={{
            fontFamily: "Open Sans",
            ...props.style,
        }}
    >
        {props.children}
    </span>
);

const Button: Comp<{}, {
    onClick: {},
}> = props =>
    <span onClick={() => props.onClick && props.onClick({})}>
        {props.children}
    </span>;

export type LayoutProps = {
    align?: AlignValue,
    margin?: Size,
};
export type LayoutComp = Comp<LayoutProps>;
const Line: LayoutComp = props =>
    <Div>
        {
            props.children instanceof Array ?
                props.children.map((ch, i) =>
                    <Div
                        key={i}
                        display="inline-block"
                        align={props.align}
                        margin={props.margin}
                    >
                        {ch}
                    </Div>)
                : props.children
        }
    </Div>;

const Stack: LayoutComp = props =>
    <Div>
        {
            props.children instanceof Array ? props.children.map((ch, i) =>
                <Div
                    key={i}
                    align={props.align}
                    margin={props.margin}
                >
                    {ch}
                </Div>)
                : props.children
        }
    </Div>;

export type Color = string;
export type GridCell = {
    color: Color,
    borderColor?: Color,
};
const Grid: Comp<{
    rows: GridCell[][],
    cellSize: Size,
    borderRadius?: Size,
    borderWidth?: Size,
    margin?: Size,
} & CallbacksOpt<{
    onClick: MtxIdx,
    mouseOverCell: MtxIdx | undefined,
}>> = props =>
        <table style={{
            borderSpacing: props.margin,
            display: "inline",
        }}>
            <tbody>
                {props.rows.map((row, i) =>
                    <tr key={i}>{row.map((cell, j) =>
                        <td
                            key={j}
                            onMouseEnter={e => props.mouseOverCell && props.mouseOverCell([i, j])}
                            onMouseLeave={e => props.mouseOverCell && props.mouseOverCell(undefined)}
                            onClick={a => props.onClick && props.onClick([i, j])}
                            style={{
                                background: cell.color,
                                width: props.cellSize,
                                height: props.cellSize,
                                borderRadius: props.borderRadius,
                                borderColor: cell.borderColor || cell.color,
                                borderWidth: props.borderWidth,
                                borderStyle: "solid",
                            }}
                        />)}
                    </tr>)}
            </tbody>
        </table>;

const Screen: Comp<{
    visible?: boolean,
    background?: Color,
}> = props =>
        props.visible ?
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    background: props.background || "rgba(0, 0, 0, 0)",
                    zIndex: 10,
                }}
            >
                {props.children}
            </div>
            : <div style={{ display: "none" }} />;

const MessageBox: Comp<{
    top?: Size,
    background?: Color,
    borderWidth?: Size,
    padding?: Size,
    marginTop?: Size,
}> = props =>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid",
            borderWidth: props.borderWidth || "2px",
            marginTop: props.marginTop || "-20%",
            padding: props.padding || "10%",
            background: props.background || "rgba(250, 250, 250, 0.8)",
        }}>
            {props.children}
        </div>;

export {
    Div,
    Text, Button,
    Line, Stack,
    Grid,
    Screen, MessageBox,
};
