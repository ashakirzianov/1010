import { mapObject, KeyRestriction } from "../utils";

type TConstraint<ActionsTemplate> = KeyRestriction<ActionsTemplate, "default">;
type SConstraint<State> = KeyRestriction<State, "new">;

// Actions:

export type ActionType<Type extends string, Payload> = {
    type: Type,
    payload: Payload,
};
export type ActionTypes<Templates extends TConstraint<Templates>> =
    ({[k in keyof Templates]: ActionType<k, Templates[k]> })[keyof Templates];

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

// Reducers:

type Update<State extends SConstraint<State>> = Partial<State> | { new: State };
type SingleReducer<State extends SConstraint<State>, Payload = {}> =
    (state: State, payload: Payload) => Update<State>;
type FullReducerTemplate<
    State extends SConstraint<State>,
    Template extends TConstraint<Template>
> = {
    [k in keyof Template]: SingleReducer<State, Template[k]>;
};

type PartialReducerTemplate<
    State extends SConstraint<State>,
    Template extends TConstraint<Template>
> = {
    [k in keyof Template]?: SingleReducer<State, Template[k]>;
} & {
    default: SingleReducer<State>,
};

export type ReducerTemplate<
    State extends SConstraint<State>,
    Template extends TConstraint<Template>
> =
    | FullReducerTemplate<State, Template>
    | PartialReducerTemplate<State, Template>
    ;

type Reducer<State, Template extends TConstraint<Template>> =
    (state: State | undefined, action: ActionTypes<Template>) => State;

function findSingleReducer<State extends SConstraint<State>, Template extends TConstraint<Template>>(
    reducerTemplate: ReducerTemplate<State, Template>,
    key: keyof Template,
) {
    // For some reason couldn't type it with TypeScript, probably bug in TS
    return (reducerTemplate as FullReducerTemplate<State, Template>)[key]
        // || (reducerTemplate as PartialReducerTemplate<State, Template>).default
        ;
}

export function buildReducer<State extends SConstraint<State>, Template extends TConstraint<Template>>(
    reducerTemplate: ReducerTemplate<State, Template>,
    initial?: State,
): Reducer<State, Template> {
    return function reducer(state: State = null as any, action: ActionTypes<Template>): State {
        if (state === undefined) {
            return initial || null as any;
        }
        if (state === null || state.new) { // By contract state should not contain "new"
            // ...but Redux can send objects with "new" prop, 
            return state; // ...in which case we supposed to return current state
        }

        const r = findSingleReducer(reducerTemplate, action.type)

        if (r === undefined) { // Redux send some internal action types
            return state; // ...in which case we supposed to return current state
        }

        const updates = r(state, action.payload);
        return updates === state ? updates : 
        updates.new !== undefined ? updates.new
        : {
            // Need to cast due ts bug: https://github.com/Microsoft/TypeScript/issues/14409
            ...(state as any),
            ...(updates as any),
        };
    };
}

export function bugWorkaround<State, Template extends TConstraint<Template>>(
    reducer: Reducer<State, Template>
): (state: State | undefined, action: { type: string }) => State {
    // This is workaround for issue in redux: https://github.com/reactjs/redux/issues/2709
    return reducer as any;
}
