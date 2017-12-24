import { def } from "../utils";
import { buildSourceConnectors, spec } from "./dnd-utils";

const dndSpecifications = {
    figureSource: spec({
        beginDrag: (props: { selected: boolean }) => ({ isSelected: props.selected }),
    }),
};

export const sourceConnectors = buildSourceConnectors(dndSpecifications);
