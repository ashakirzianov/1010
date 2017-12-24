import * as React from "react";
import { DragSourceConnector, DragSourceMonitor, DragSource, ConnectDragSource, DragDropContext } from "react-dnd";
import { def, mapObject } from "../utils";
import HTML5Backend from "react-dnd-html5-backend";

type SFC<T> = React.SFC<T>;

type SourceSpec<Type extends string, Props> = {
    beginDrag: (props: Props, monitor?: DragSourceMonitor) => object;
};
export type SourceSpecs<Template> = {
    [T in keyof Template]: SourceSpec<T, Template[T]>;
};
type SourceConnector<Props> = <AllProps extends Props>(Comp: SFC<AllProps>) => SFC<AllProps>; // TODO: add key restriction?
type SourceConnectors<Template> = {
    [T in keyof Template]: SourceConnector<Template[T]>;
};

function buildSourceConnector<
    T extends string,
    Props, S extends SourceSpec<T, Props>
>(key: T, source: S): SourceConnector<Props> {
    function collect(connect: DragSourceConnector) {
        return {
            connectDragSource: connect.dragSource(),
        };
    }

    const wrappedSource = mapObject(source, (_, f) => (wp: { props: Props}) => f(wp.props));

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

export function buildSourceConnectors<T>(s: SourceSpecs<T>): SourceConnectors<T> {
    return mapObject(s, buildSourceConnector);
}

export function connectDnd<P>(Comp: React.ComponentClass<P>) {
    return DragDropContext(HTML5Backend)(Comp);
}
