import * as store from "store";
import { Game } from "../model/game";

export type Store = Game;
export function storeState(state: Store) {
    store.set("state", state);
}

export function restoreState(): Store | undefined {
    return store.get("state") as Store;
}
