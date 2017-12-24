import * as React from "react";
import {
    DragSourceConnector, DragSourceMonitor, DragSource, ConnectDragSource,
    DragDropContext, DropTargetConnector, DropTargetMonitor, ConnectDropTarget, DropTarget,
} from "react-dnd";
import { def, mapObject, ValueConstraint } from "../utils";
import HTML5Backend from "react-dnd-html5-backend";
import { Key } from "readline";

type SFC<T> = React.SFC<T>;

export type Connector<Props> = <AllProps extends Props>(Comp: SFC<AllProps>) => SFC<AllProps>; // TODO: add key restriction?

export type Constraint<T> = ValueConstraint<T, {
    sourceIn: {},
    sourceOut: {},
    targetIn: {},
    targetOut: {},
}>;

export type SourceConnectors<Template extends Constraint<Template>> = {
    [T in keyof Template]: Connector<Template[T]["sourceIn"]>;
};
export type TargetConnectors<Template extends Constraint<Template>> = {
    [T in keyof Template]: Connector<Template[T]["targetIn"]>;
};

export type SourceSpec<SourceProps, SourceRet> = {
    beginDrag: (props: SourceProps, monitor: DragSourceMonitor) => SourceRet,
};

export type TargetSpec<TargetProps, TargetRet> = {
    drop: (props: TargetProps, monitor: DropTargetMonitor) => TargetRet,
};

export type Spec<SourceProps, SourceRet, TargetProps, TargetRet> = {}
    & SourceSpec<SourceProps, SourceRet>
    & TargetSpec<TargetProps, TargetRet>
    ;

export type Specs<T extends Constraint<T>> = T;

export function spec<
    SourceProps, SourceRet,
    TargetProps, TargetRet
>(allSpecs: Spec<SourceProps, SourceRet, TargetProps, TargetRet>) {
    return {
        ...allSpecs,
        sourceIn: def<SourceProps>(),
        sourceOut: def<SourceRet>(),
        targetIn: def<TargetProps>(),
        targetOut: def<TargetRet>(),
    };
}

function buildSourceConnector<
    T extends string,
    Props, Ret, S extends SourceSpec<Props, Ret>
>(key: T, sourceSpec: S): Connector<Props> {
    function collect(connect: DragSourceConnector) {
        return {
            connectDragSource: connect.dragSource(),
        };
    }

    const wrappedSource = {
        beginDrag: (wp: { props: Props }, monitor: DragSourceMonitor) =>
            sourceSpec.beginDrag(wp.props, monitor),
    };

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

function buildTargetConnector<
    T extends string,
    Props, Ret, S extends TargetSpec<Props, Ret>
>(key: T, targetSpec: S): Connector<Props> {
    function collect(connect: DropTargetConnector) {
        return {
            connectDropTarget: connect.dropTarget(),
        };
    }

    const wrappedTarget = {
        drop: (wp: { props: Props }, monitor: DropTargetMonitor) => targetSpec.drop(wp.props, monitor),
    };

    return function connector<P extends Props>(Comp: SFC<P>): SFC<P> {
        const wrapped: SFC<{
            props: P,
            connectDropTarget: ConnectDropTarget,
        }> = wrappedProps => wrappedProps.connectDropTarget(
            React.createElement("div", {}, // TODO: do we need to wrap?
                React.createElement(Comp, wrappedProps.props, wrappedProps.children)
            )
        );

        const dropTargetComp = DropTarget<{
            props: P,
            connectDropTarget: ConnectDropTarget,
        }>(key, wrappedTarget, collect)(wrapped);
        const connectedComp: SFC<P> = props => React.createElement(
            dropTargetComp,
            { props: props, connectDropTarget: undefined as any },
            props.children);

        return connectedComp;
    };
}

export function buildTargetConnectors<T extends Constraint<T>>(s: Specs<T>): TargetConnectors<T> {
    return mapObject(s, buildTargetConnector);
}

export function connectDnd<P>(Comp: React.ComponentClass<P>) {
    return DragDropContext(HTML5Backend)(Comp);
}
