import { def } from "../utils";
import { spec, buildConnectors } from "./dnd-utils";

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

export const dndConnectors = buildConnectors(dndSpecifications);
