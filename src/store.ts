import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { reducer } from "./reducers";

const middleware = applyMiddleware(logger);

export type Store = { foo: string, bar: number };
const initial: Store = {
    foo: "Anton",
    bar: 42,
};
export const store = createStore(reducer, middleware);
