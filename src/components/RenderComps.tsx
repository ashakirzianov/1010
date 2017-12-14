import * as React from "react";

type SFC<T> = React.SFC<T>;

export type DisplayValue = "block" | "inline" | "inline-block";
export type AlignValue = "left" | "center" | "right";
export const Div: SFC<{
    display?: DisplayValue,
    align?: AlignValue,
}> = props => <div style={{
    display: props.display || "block",
    textAlign: props.align,
}}>{props.children}</div>;

export type LayoutProps = {
    align?: AlignValue,
};
export type LayoutComp = SFC<LayoutProps>;
export const Line: LayoutComp = props =>
        <Div>
            {
                props.children instanceof Array ?
                    props.children.map(ch => <Div
                        display="inline-block"
                        align={props.align}
                    >{ch}</Div>)
                    : props.children
            }
        </Div>;

export const Stack: LayoutComp = props =>
    <Div align={props.align}>{props.children}</Div>;

export type Color = string;
export type GridCell = { color: Color };
export const Grid: SFC<{
    rows: GridCell[][],
    cellSize: number,
    borderRadius?: number,
    margin?: number,
}> = props =>
        <table style={{
            borderSpacing: props.margin,
            display: "inline",
        }}>
            {props.rows.map(row =>
                <tr>{row.map(col =>
                    <td style={{
                        background: col.color,
                        width: props.cellSize,
                        height: props.cellSize,
                        borderRadius: props.borderRadius,
                    }} />)}
                </tr>)}
        </table>;
