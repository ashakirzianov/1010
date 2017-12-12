import * as React from "react";

type SFC<T> = React.SFC<T>;

type Color = string;
type Palette = {
    cell: { 0: string },
};

export const Line: SFC<{}> = props =>
    <div style={{
        display: "block",
        marginBottom: -4, // TODO: find out better way
    }}>{props.children}</div>;
export const Stack: SFC<{}> = props =>
    <div style={{ display: "inline-block" }}>{props.children}</div>;

export const Cell: SFC<{
        color: string,
        size: number,
        borderRadius?: number,
        margin?: number,
    }> = props =>
        <div style={{
            background: props.color,
            width: props.size,
            height: props.size,
            borderRadius: props.borderRadius,
            margin: props.margin,
            display: "inline-block",
        }}/>;

export const Grid: SFC<{
    rows: Array<Array<{ color: Color }>>,
    cellSize: number,
    borderRadius?: number,
    margin?: number,
}> = props =>
    <Stack>{
        props.rows.map((r, i) =>
        <Line key={i}>
            { r.map((c, j) => <Cell
                key={j}
                color={c.color}
                size={props.cellSize}
                borderRadius={props.borderRadius}
                margin={props.margin}
                />) }
        </Line>)
    }</Stack>;
