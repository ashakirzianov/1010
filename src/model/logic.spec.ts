import { expect } from "chai";
import { makeFigureLayer } from "./logic";

describe("logic", () => {
    it("makeFigureLayer", () => {
        expect(makeFigureLayer({
            color: 0,
            shape: [
                [1, 1],
                [1, 0],
            ],
        },
            { rows: 5, cols: 5 },
            [2, 1]),
        ).to.be.deep.eq([
            [{ cell: "empty" }, { cell: "empty" }, { cell: "empty" }, { cell: "empty" }, { cell: "empty" }],
            [{ cell: "empty" }, { cell: "empty" }, { cell: "empty" }, { cell: "empty" }, { cell: "empty" }],
            [{ cell: "empty" }, { cell: "full", color: 0 }, { cell: "full", color: 0 }, { cell: "empty" }, { cell: "empty" }],
            [{ cell: "empty" }, { cell: "full", color: 0 }, { cell: "empty" }, { cell: "empty" }, { cell: "empty" }],
            [{ cell: "empty" }, { cell: "empty" }, { cell: "empty" }, { cell: "empty" }, { cell: "empty" }],
        ]);
    });
});
