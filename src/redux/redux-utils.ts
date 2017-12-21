import { mapObject } from "../utils";

export type ActionType<Type extends string, Payload> = {
    type: Type,
    payload: Payload,
};
export type ActionTypes<Templates> = ({ [k in keyof Templates]: ActionType<k, Templates[k]> })[keyof Templates];

export type ActionCreator<Type extends string, Payload> = (payload: Payload) => ActionType<Type, Payload>;
export type ActionCreators<Template> = { [k in keyof Template]: ActionCreator<k, Template[k]> };
export type ActionDispatcher<Payload> = (payload: Payload) => void;
export type ActionDispatchers<Template> = { [k in keyof Template]: ActionDispatcher<Template[k]> };

function actionCreator<T extends string, P>(type: T, payload?: P): ActionCreator<T, P> {
    return p => ({
        type: type,
        payload: p,
    });
}

export function actionCreators<Template>(actionTemplate: Template): ActionCreators<Template> {
    return mapObject(actionTemplate, actionCreator);
}
