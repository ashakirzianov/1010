import { mapObject } from "../utils";

export function def<T>() {
    return null as any as T;
}

export function defOpt<T>() {
    return def<T | undefined>();
}

export type Opt<T> = T | undefined;
export type ActionType<Type extends string, Payload> = {
    type: Type,
    payload: Payload,
};
export type ActionTypes<T> = ({ [k in keyof T]: ActionType<k, T[k]> })[keyof T];

export type ActionCreator<Type extends string, Payload> = (payload: Payload) => ActionType<Type, Payload>;
export type ActionCreators<T> = { [k in keyof T]: ActionCreator<k, T[k]> };
export type ActionDispatcher<Payload> = (payload: Payload) => void;
export type ActionDispatchers<T> = { [k in keyof T]: ActionDispatcher<T[k]> };


function actionCreator<T extends string, P>(type: T, payload?: P): ActionCreator<T, P> {
    return p => ({
        type: type,
        payload: p
    });
}

export function actionCreators<T>(actionTemplates: T): ActionCreators<T> {
    return mapObject(actionTemplates, actionCreator);
}