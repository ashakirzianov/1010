import * as React from "react";

type SFC<T> = React.SFC<T>;

export type DisplayValue = "block" | "inline" | "inline-block";
export type AlignValue = "left" | "center" | "right";
export const Div: SFC<{
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
export const Line: LayoutComp = props =>
    <Div>
        {
            props.children instanceof Array ?
                props.children.map(ch =>
                    <Div
                        display="inline-block"
                        align={props.align}
                        margin={props.margin}
                    >
                        {ch}
                    </Div>)
                : props.children
        }
    </Div>;

// export const Stack: LayoutComp = props =>
//     <Div
//         align={props.align}
//         margin={props.margin}
//     >
//         {props.children}
//     </Div>;

export const Stack: LayoutComp = props =>
    <Div>
        {
            props.children instanceof Array ? props.children.map(ch =>
            <Div
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
