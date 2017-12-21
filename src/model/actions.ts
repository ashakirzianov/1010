import { defOpt, def, MtxIdx } from "../utils";

export const actionsTemplate = {
    takeFigure: defOpt<number>(),
    targetOver: defOpt<MtxIdx>(),
    placeOn: def(),
    newGame: def(),
};
export type ActionsTemplate = typeof actionsTemplate;
