import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { reducer } from "./reducers";
import { Game } from "../model/game";
import { createGame } from "../model/logic";

const middleware = applyMiddleware(logger);

export type Store = Game;
const initial: Store = createGame();
export const store = createStore(reducer, initial, middleware);
