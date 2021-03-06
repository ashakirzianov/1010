import { expect } from "chai";
import { moveUp, getAllFigures, moveLeft, makeFigure, makeFigures, makeRotations, trimShape } from "./figures";
import { Shape } from "./game";

describe("Figures", () => {
    it("moveUp", () => {
        expect(moveUp([
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ])).to.be.deep.eq([
                [1, 1, 1],
                [0, 0, 0],
            ]);
    });

    it("moveLeft", () => {
        expect(moveLeft([
                [0, 1, 1],
                [0, 1, 1],
                [0, 0, 0],
            ])).to.be.deep.eq([
                [1, 1],
                [1, 1],
                [0, 0],
            ]);
    });

    it("makeFigure", () => {
        expect(makeFigure(2)([
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0],
        ])).to.be.deep.eq({
            shape: [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0],
            ],
            color: 2,
        });
    });

    it("makeRotations", () => {
        expect(makeRotations([
            [1, 1],
            [1, 0],
        ])).to.be.deep.eq([
            [
                [1, 1],
                [1, 0],
            ],
            [
                [1, 1],
                [0, 1],
            ],
            [
                [0, 1],
                [1, 1],
            ],
            [
                [1, 0],
                [1, 1],
            ],
        ]);
    });

    it("makeFigures", () => {
        const shapes: Shape[] = [
            [
                [1, 1, 1],
            ],
        ];
        expect(makeFigures(shapes)).to.be.deep.eq([
            {
                shape: [
                    [1, 1, 1],
                ],
                color: 0,
            },
            {
                shape: [
                    [1],
                    [1],
                    [1],
                ],
                color: 0,
            },
        ]);
    });

    it("trimShape", () => {
        expect(trimShape([
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 0, 1],
            [0, 0, 1, 0],
        ])).to.be.deep.eq([
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0],
        ]);
    });
});
