import { def } from "../utils";
import { buildSourceConnectors, spec, buildTargetConnectors } from "./dnd-utils";

const dndSpecifications = {
    figureToSquare: spec({
        beginDrag: (props: {}, monitor) => {
            return {};
         },
        drop: (props: { placeOn?: (arg: any) => any }, monitor) => {

            return props.placeOn && props.placeOn({});
        },
    }),
};

export const sourceConnectors = buildSourceConnectors(dndSpecifications);
export const targetConnectors = buildTargetConnectors(dndSpecifications);
