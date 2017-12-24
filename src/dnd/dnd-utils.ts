import * as React from "react";
import { DragSourceConnector, DragSourceMonitor, DragSource, ConnectDragSource, DragDropContext, DropTargetConnector, DropTargetMonitor } from "react-dnd";
import { def, mapObject, ValueConstraint } from "../utils";
import HTML5Backend from "react-dnd-html5-backend";
import { Key } from "readline";

type SFC<T> = React.SFC<T>;

export type Connector<Props> = <AllProps extends Props>(Comp: SFC<AllProps>) => SFC<AllProps>; // TODO: add key restriction?

// export type SourceSpec<Props> = {
//     beginDrag: (props: Props, monitor: DragSourceMonitor) => object;
// };
// export type SourceSpecs<Template> = {
//     [T in keyof Template]: SourceSpec<Template[T]>;
// };

export type Constraint<T> = ValueConstraint<T, {
    sourceIn: {},
    sourceOut: {},
}>;

export type SourceConnectors<Template extends Constraint<Template>> = {
    [T in keyof Template]: Connector<Template[T]["sourceIn"]>;
};

export type SourceSpec<SourceProps, SourceRet> = {
    beginDrag: (props: SourceProps, monitor: DragSourceMonitor) => SourceRet,
};

export type TargetSpec<TargetProps, TargetRet> = {
    drop: (props: TargetProps, monitor: DropTargetMonitor) => TargetRet,
};

export type Spec<SourceProps, SourceRet> = SourceSpec<SourceProps, SourceRet>;

export type Specs<T extends Constraint<T>> = T;

export function spec<SourceProps, SourceRet>(allSpecs: Spec<SourceProps, SourceRet>) {
    return {
        ...allSpecs,
        sourceIn: def<SourceProps>(),
        sourceOut: def<SourceRet>(),
    };
}

function buildSourceConnector<
    T extends string,
    Props, Ret, S extends SourceSpec<T, Props>
>(key: T, sourceSpec: S): Connector<Props> {
    function collect(connect: DragSourceConnector) {
        return {
            connectDragSource: connect.dragSource(),
        };
    }

    const wrappedSource = mapObject(sourceSpec, (_, f) => (wp: { props: Props}) => f(wp.props));

    return function connector<P extends Props>(Comp: SFC<P>): SFC<P> {
        const wrapped: SFC<{
            props: P,
            connectDragSource: ConnectDragSource,
        }> = wrappedProps => wrappedProps.connectDragSource(
            React.createElement("div", {},
                React.createElement(Comp, wrappedProps.props, wrappedProps.children)
            )
        );

        const dragSourceComp = DragSource<{
            props: P,
            connectDragSource: ConnectDragSource,
        }>(key, wrappedSource, collect)(wrapped);
        const connectedComp: SFC<P> = props => React.createElement(
            dragSourceComp,
            { props: props, connectDragSource: undefined as any },
            props.children);

        return connectedComp;
    };
}

export function buildSourceConnectors<T extends Constraint<T>>(s: Specs<T>): SourceConnectors<T> {
    return mapObject(s, buildSourceConnector);
}

export function connectDnd<P>(Comp: React.ComponentClass<P>) {
    return DragDropContext(HTML5Backend)(Comp);
}
