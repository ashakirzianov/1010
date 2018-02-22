import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { reducer } from "./reducers";
import { Game } from "../model/game";
import { createGame } from "../model/logic";
import { Store, storeState, restoreState } from "./storage";

const middleware = applyMiddleware(
    // logger,
);

const initial: Store = restoreState() || createGame();
export const store = createStore(reducer, initial, middleware);

store.subscribe(() => {
    storeState(store.getState());
});
