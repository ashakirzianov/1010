import { def } from "../utils";
import { SourceSpecs, buildSourceConnectors } from "./dnd-utils";

const sourcesTemplate = {
    figureSource: def(),
};

const sources: SourceSpecs<typeof sourcesTemplate> = {
    figureSource: {
        beginDrag: props => ({}),
    },
};

export const sourceConnectors = buildSourceConnectors(sources);
