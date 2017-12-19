import { expect } from "chai";
import { makeFigureLayer, removeFilled, needToRemove, indexesToRemove } from "./logic";

describe("logic", () => {
    const ec = { cell: "empty" as "empty" };
    const zc = { cell: "full" as "full", color: 0 };
    const oc = { cell: "full" as "full", color: 1 };
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
            [ec, ec, ec, ec, ec],
            [ec, ec, ec, ec, ec],
            [ec, zc, zc, ec, ec],
            [ec, zc, ec, ec, ec],
            [ec, ec, ec, ec, ec],
        ]);
    });

    it("removeFilled", () => {
        expect(removeFilled([
            [ec, zc, zc, ec, ec],
            [ec, zc, zc, ec, ec],
            [oc, zc, oc, zc, zc],
            [ec, zc, zc, oc, oc],
            [ec, zc, zc, ec, ec],
        ])).to.be.deep.eq([
            [ec, ec, ec, ec, ec],
            [ec, ec, ec, ec, ec],
            [ec, ec, ec, ec, ec],
            [ec, ec, ec, oc, oc],
            [ec, ec, ec, ec, ec],
        ]);
    });

    it("needToRemove", () => {
        expect(needToRemove([zc, zc, oc, oc, zc])).eq(true);
        expect(needToRemove([zc, zc, ec, oc, zc])).eq(false);
    });

    it("indexesToRemove", () => {
        expect(indexesToRemove([
            [ec, zc, zc, ec, ec],
            [ec, zc, zc, ec, ec],
            [oc, zc, oc, zc, zc],
            [ec, zc, zc, oc, oc],
            [ec, zc, zc, ec, ec],
        ])).deep.eq([2]);
    });
});
