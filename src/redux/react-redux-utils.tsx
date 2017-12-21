import * as React from "react";
import { Dispatch, connect, InferableComponentEnhancerWithProps, Component } from "react-redux";
import { AnyAction } from "redux";
import { mapObject } from "../utils";
import { ActionDispatchers, ActionCreators } from "./redux-utils";

export type TopComponent<Store, ActionsTemplate> = React.SFC<{
    store: Store,
    callbacks: ActionDispatchers<ActionsTemplate>,
}>;

export function connectTopLevel<Store, Actions>(
    Comp: TopComponent<Store, Actions>,
    actionCreators: ActionCreators<Actions>,
) {
    function mapStateToProps(store: Store) {
        return {
            store: store,
        };
    }

    function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
        function buildCallbacks<T>(creators: ActionCreators<T>): ActionDispatchers<T> {
            return mapObject(creators, (key, value) => (x: any) => dispatch(value(x)));
        }

        return {
            callbacks: buildCallbacks(actionCreators),
        };
    }

    const connector = connect(mapStateToProps, mapDispatchToProps);

    return connector(Comp);
}
