import { combineReducers, AnyAction } from "redux";
import { Store } from "./store";

function foo(store: Store, action: AnyAction): Store {
    return { ...store };
}

function bar(store: Store, action: AnyAction): Store {
    return { ...store };
}

export const reducer = combineReducers<Store>({
    foo: foo,
    bar: bar,
});
