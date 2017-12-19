import { expect } from "chai";
import { makeFigureLayer, removeFilled, needToRemove, indexesToRemove } from "./logic";

describe("Logic", () => {
    const o = { cell: "empty" as "empty" };
    const x = { cell: "full" as "full", color: 0 };
    const y = { cell: "full" as "full", color: 1 };
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
            [o, o, o, o, o],
            [o, o, o, o, o],
            [o, x, x, o, o],
            [o, x, o, o, o],
            [o, o, o, o, o],
        ]);
    });

    it("removeFilled", () => {
        expect(removeFilled([
            [o, x, x, o, o],
            [o, x, x, o, o],
            [y, x, y, x, x],
            [o, x, x, y, y],
            [o, x, x, o, o],
        ])).to.be.deep.eq([
            [o, o, o, o, o],
            [o, o, o, o, o],
            [o, o, o, o, o],
            [o, o, o, y, y],
            [o, o, o, o, o],
        ]);
    });

    it("needToRemove", () => {
        expect(needToRemove([x, x, y, y, x])).eq(true);
        expect(needToRemove([x, x, o, y, x])).eq(false);
    });

    it("indexesToRemove", () => {
        expect(indexesToRemove([
            [o, x, x, o, o],
            [o, x, x, o, o],
            [y, x, y, x, x],
            [o, x, x, y, y],
            [o, x, x, o, o],
        ])).deep.eq([2]);
    });
});
