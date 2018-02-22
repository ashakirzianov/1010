import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { throttle } from "lodash";
import { reducer } from "./reducers";
import { createGame, isGame } from "../model/logic";
import { Store, storeState, restoreState } from "./storage";

const middleware = applyMiddleware(
    // logger,
);

function validateStore(restored: Store | undefined) {
    return isGame(store) ? store : undefined;
}

const initial: Store = validateStore(restoreState()) || createGame();
export const store = createStore(reducer, initial, middleware);

store.subscribe(throttle(() => {
    storeState(store.getState());
}, 1000));
