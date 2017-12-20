import { defOpt, def, actionCreators } from "./redux-utils";
import { MtxIdx } from "../utils";

const actionTemplates = {
    takeFigure: defOpt<number>(),
    targetOver: defOpt<MtxIdx>(),
    placeOn: def(),
    newGame: def(),
};
type ActionTemplatesType = typeof actionTemplates;

export const allActionCreators = actionCreators(actionTemplates);
