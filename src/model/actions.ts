import { defOpt, def, MtxIdx } from "../utils";

export const actionTemplates = {
    takeFigure: defOpt<number>(),
    targetOver: defOpt<MtxIdx>(),
    placeOn: def(),
    newGame: def(),
};