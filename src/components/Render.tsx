import * as React from "react";

type SFC<T> = React.SFC<T>;
export const Square: SFC<{
    color: string,
    size: number,
}> = props =>
    <div style={{
        background: props.color,
        width: props.size,
        height: props.size,
    }}/>;
