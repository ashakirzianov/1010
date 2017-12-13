import * as React from "react";

type SFC<T> = React.SFC<T>;

export type Color = string;

export const Line: SFC<{}> = props =>
    <div style={{
        display: "block",
        // marginBottom: -4, // TODO: find out better way
    }}>{props.children}</div>;
export const Stack: SFC<{}> = props =>
    <div style={{ display: "inline-block" }}>{props.children}</div>;

// export const GridCell: SFC<{
//     color: string,
//     size: number,
//     borderRadius?: number,
//     margin?: number,
// }> = props =>
//         <div style={{
//             background: props.color,
//             width: props.size,
//             height: props.size,
//             borderRadius: props.borderRadius,
//             margin: props.margin,
//             display: "inline-block",
//         }} />;

export type GridCellType = { color: Color };
export const Grid: SFC<{
    rows: GridCellType[][],
    cellSize: number,
    borderRadius?: number,
    margin?: number,
}> = props =>
        <table style={{ display: "inline-block", borderSpacing: props.margin }}>
            {props.rows.map(row =>
                <tr>{row.map(col =>
                    <td style={{
                        background: col.color,
                        width: props.cellSize,
                        height: props.cellSize,
                        borderRadius: props.borderRadius,
                    }} />)}
                </tr>)}
        </table>
    ;
