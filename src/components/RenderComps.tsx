import * as React from "react";

type SFC<T> = React.SFC<T>;

export const Line: SFC<{}> = props =>
<div style={{ display: "block" }}>
        {
            props.children instanceof Array ?
            props.children.map(ch => <div style={{ display: "inline-block" }}>{ch}</div>)
            : props.children
        }
    </div>;
export const Stack: SFC<{}> = props =>
<div style={{ display: "block" }}>{props.children}</div>;

export type Color = string;
export type GridCell = { color: Color };
export const Grid: SFC<{
    rows: GridCell[][],
    cellSize: number,
    borderRadius?: number,
    margin?: number,
}> = props =>
        <table style={{ borderSpacing: props.margin }}>
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
