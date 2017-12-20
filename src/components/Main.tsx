import * as React from "react";
import { Board, Cell, Game } from "../model/game";
import { GameComp } from "./GameComps";
import { range, pickRandom, mapObject } from "../utils";
import { allFigures } from "../model/figures";
import { createGame } from "../model/logic";
import { Dispatch, connect, InferableComponentEnhancerWithProps, Component } from "react-redux";
import { Store } from "../redux/store";
import { AnyAction } from "redux";
import { allActionCreators, ActionCreators, ActionDispatchers } from "../redux/actions";

const Main: React.SFC<CompProps> = props =>
    <GameComp
        { ...props.actions }
        { ...props.game }
    />;

function mapStateToProps(store: Store, own: {}) {
    return {
        game: store,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, own: {}) {
    function wrapActions<T>(actions: ActionCreators<T>): ActionDispatchers<T> {
        return mapObject(actions, (key, value) => (x: any) => dispatch(value(x)));
    }

    return {
        actions: wrapActions(allActionCreators),
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

export const MainConnected = connector(Main);
