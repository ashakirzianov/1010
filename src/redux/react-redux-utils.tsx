import * as React from "react";
import { Dispatch, connect, InferableComponentEnhancerWithProps, Component } from "react-redux";
import { AnyAction } from "redux";
import { mapObject } from "../utils";
import { ActionDispatchers, ActionCreators } from "./redux-utils";

export type TopComponent<Store, Actions> = React.SFC<{
    store: Store,
    actions: ActionDispatchers<Actions>,
}>;

export function buildConnectedComp<Store, Actions>(
    Comp: TopComponent<Store, Actions>,
    actionCreators: ActionCreators<Actions>,
) {
    const Main: React.SFC<CompProps> = props =>
        <Comp
            { ...props }
        />;

    function mapStateToProps(store: Store) {
        return {
            store: store,
        };
    }

    function mapDispatchToProps(dispatch: Dispatch<AnyAction>, own: {}) {
        function wrapActions<T>(actions: ActionCreators<T>): ActionDispatchers<T> {
            return mapObject(actions, (key, value) => (x: any) => dispatch(value(x)));
        }

        return {
            actions: wrapActions(actionCreators),
        };
    }

    const connector = connect(
        mapStateToProps,
        mapDispatchToProps);

    function extractResultType<R>(f: InferableComponentEnhancerWithProps<R, any>): R {
        return undefined as any as R;
    }
    const typeVar = extractResultType(connector);
    type CompProps = typeof typeVar;

    return connector(Comp);
}