import * as React from "react";
import * as Radium from "radium";
import { TypeDiff, Partialize, Undefined, KeyRestriction } from "../utils";

export type Callbacks<A> = {
    [name in keyof A]: ((arg: A[name]) => void);
};

export type CallbacksOpt<A> = Partial<Callbacks<A>>;

export type Hoverable<T extends KeyRestriction<T, ":hover">> = T & { ":hover"?: Partial<T> };

type SFC<T = {}> = React.SFC<T>;

export function defaults<T>(Comp: SFC<T>): Undefined<T> {
    return {} as any;
}

export function apply<T>(Comp: SFC<T>) {
    return <P extends keyof T>(partial: Pick<T, P>): SFC<Partialize<T, Pick<T, P>>> => {
        return props => React.createElement(Comp, { ...(partial as any), ...(props as any) });
    };
}

export function hoverable<T>(Comp: SFC<T>): SFC<T> {
    return Radium(Comp);
}
