import * as React from "react";
import { PlayArea, Cell, Game } from "../model/game";
import { GameComp } from "./GameComps";
import { range, pickRandom } from "../utils";
import { allFigures } from "../model/figures";
import { createGame } from "../model/logic";
import { Dispatch, connect, InferableComponentEnhancerWithProps, Component } from "react-redux";
import { Store } from "../redux/store";
import { AnyAction } from "redux";
import { takeFigure, targetOver, placeOn } from "../redux/actions";

const Main: React.SFC<CompProps> = props =>
    <GameComp
        placeOn={props.placeOn}
        targetOver={props.targetOver}
        takeFigure={props.takeFigure} // TODO: find better solution
        { ...props.game }
    />;

function mapStateToProps(store: Store, own: {}) {
    return {
        game: store,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, own: {}) {
    function wrap<T, U extends AnyAction>(f: (x: T) => U): (x: T) => void {
        return x => dispatch(f(x));
    }
    return {
        takeFigure: wrap(takeFigure),
        targetOver: wrap(targetOver),
        placeOn: wrap(placeOn),
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
