import { expect } from "chai";
import { matricify, flatten, distinct, sameArrays, subMtx, columnsMtx, rotateClockwiseMtx } from "./utils";

describe("Utils", () => {
    it("matricify", () => {
        expect(matricify(3)([
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
        ]))
        .to.be.deep.eq([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    });

    it("flatten", () => {
        expect(flatten([
            [1, 2, 3],
            [4, 5, 6],
        ])).to.be.deep.eq([1, 2, 3, 4, 5, 6]);
    });

    it("sameArrays same", () => {
        expect(sameArrays(
            [1, 2, 3],
            [1, 2, 3],
        )).to.be.eq(true);
    });

    it("sameArrays false", () => {
        expect(sameArrays(
            [1, 2, 3],
            [1, 42, 3],
        )).to.be.eq(false);
    });

    it("distinct numbers", () => {
        expect(distinct((x, y) => x === y)([1, 2, 1, 3]))
            .to.be.deep.eq([1, 2, 3]);
    });

    it("distinct arrays", () => {
        expect(distinct<number[]>(sameArrays)([
            [1, 2, 3],
            [4, 5, 6],
            [1, 2, 3],
            [7, 8, 9],
        ])).to.be.deep.eq([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    });

    it("subMtx", () => {
        expect(subMtx({
            startRow: 1,
            startCol: 2,
            endRow: 3,
            endCol: 4,
        })([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 0],
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 0],
        ])).to.be.deep.eq([
            [8, 9],
            [3, 4],
        ]);
    });

    it("columnsMtx", () => {
        expect(columnsMtx([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 0, 1, 2],
        ])).deep.eq([
            [1, 5, 9],
            [2, 6, 0],
            [3, 7, 1],
            [4, 8, 2],
        ]);
    });

    it("rotateClockwiseMtx", () => {
        expect(rotateClockwiseMtx([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 0, 1, 2],
        ])).deep.eq([
            [9, 5, 1],
            [0, 6, 2],
            [1, 7, 3],
            [2, 8, 4],
        ]);
    });
});
