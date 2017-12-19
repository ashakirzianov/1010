import * as React from "react";
import { Actions } from "./comp-utils";
import { MtxIdx } from "../utils";

type SFC<T> = React.SFC<T>;

export type DisplayValue = "block" | "inline" | "inline-block";
export type AlignValue = "left" | "center" | "right";
const Div: SFC<{
    display?: DisplayValue,
    align?: AlignValue,
    margin?: number,
}> = props =>
        <div style={{
            display: props.display || "block",
            textAlign: props.align,
            margin: props.margin || 0,
        }}>
            {props.children}
        </div>;

export type LayoutProps = {
    align?: AlignValue,
    margin?: number,
};
export type LayoutComp = SFC<LayoutProps>;
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
const Grid: SFC<{
    rows: GridCell[][],
    cellSize: number,
    borderRadius?: number,
    margin?: number,
} & Actions<{
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
                                borderWidth: 3, // TODO: extract as parameter
                                borderStyle: "solid",
                            }}
                        />)}
                    </tr>)}
            </tbody>
        </table>;

export { Div, Line, Stack, Grid };
