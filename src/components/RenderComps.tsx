import * as React from "react";
import { Actions } from "./comp-utils";

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
export type GridCell = { color: Color };
const Grid: SFC<{
    rows: GridCell[][],
    cellSize: number,
    borderRadius?: number,
    margin?: number,
    cellBorderColor?: Color,
} & Actions<{
    onClick: null,
}>> = props =>
        <table onClick={a => props.onClick && props.onClick(null)} style={{
            borderSpacing: props.margin,
            display: "inline",
        }}>
            <tbody>
                {props.rows.map((row, i) =>
                    <tr key={i}>{row.map((col, j) =>
                        <td key={j} style={{
                            background: col.color,
                            width: props.cellSize,
                            height: props.cellSize,
                            borderRadius: props.borderRadius,
                            borderColor: props.cellBorderColor || col.color,
                            borderWidth: 3, // TODO: extract as parameter
                            borderStyle: "solid",
                        }} />)}
                    </tr>)}
            </tbody>
        </table>;

export { Div, Line, Stack, Grid };
