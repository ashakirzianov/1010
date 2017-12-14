import { sameArrays, distinct, flatten, matricify, mapMtx, reduceMtx, subMtx } from "./utils";
import { ShapeCell, Figure, ColorCode, Shape } from "./game";

export type ShapeFlat = ShapeCell[];
const allShapes: ShapeFlat[] = [
    [
        1, 1, 1,
        1, 1, 1,
        1, 1, 1,
    ],
    [
        1, 1, 1,
        1, 0, 0,
        1, 0, 0,
    ],
    [
        1, 1, 0,
        1, 1, 0,
        0, 0, 0,
    ],
    [
        1, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ],
    [
        1, 1, 0,
        1, 0, 0,
        0, 0, 0,
    ],
    [
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
    ],
    [
        1, 0, 0,
        1, 0, 0,
        0, 0, 0,
    ],
];

function rotate(shape: ShapeFlat): ShapeFlat {
    const rotation = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    return rotation.map(i => shape[i]);
}

export function canMoveUp(shape: ShapeFlat) {
    return !shape[0] && !shape[1] && !shape[2];
}

export function canMoveLeft(shape: ShapeFlat) {
    return !shape[0] && !shape[3] && !shape[6];
}

export function moveUp(shape: ShapeFlat): ShapeFlat {
    return shape.map((sc, i) => i < 6 ? shape[i + 3] : 0);
}

export function moveLeft(shape: ShapeFlat): ShapeFlat {
    return shape.map((sc, i) => ((i + 1) % 3) !== 0 ? shape[i + 1] : 0);
}

function normalize(shape: ShapeFlat): ShapeFlat {
    while (canMoveUp(shape)) {
        shape = moveUp(shape);
    }

    while (canMoveLeft(shape)) {
        shape = moveLeft(shape);
    }

    return shape;
}

export function makeRotations(shape: ShapeFlat): ShapeFlat[] {
    const r0 = normalize(shape);
    const r1 = normalize(rotate(r0));
    const r2 = normalize(rotate(r1));
    const r3 = normalize(rotate(r2));

    return distinct<ShapeFlat>(sameArrays)([r0, r1, r2, r3]);
}

export function trimShape(shape: Shape): Shape {
    const borders = reduceMtx(shape, (acc, el, idx) => el === 0 ? acc : ({
        startRow: Math.min(idx[0], acc.startRow),
        startCol: Math.min(idx[1], acc.startCol),
        endRow: Math.max(idx[0] + 1, acc.endRow),
        endCol: Math.max(idx[1] + 1, acc.endCol),
    }), {
        startRow: shape.length,
        startCol: shape[0].length,
        endRow: 0,
        endCol: 0,
    });

    return subMtx(borders)(shape);
}

export function makeFigure(color: ColorCode) {
    return function f(shape: Shape) {
        return {
            shape: shape,
            color: color,
        };
    };
}

export function makeFigures(shapes: ShapeFlat[]): Figure[] {
    return flatten(shapes
        .map((shape, i) =>
            makeRotations(shape)
                .map(matricify(3))
                .map(trimShape)
                .map(makeFigure(i))
            ));
}

export function getAllFigures() {
    return makeFigures(allShapes);
}

export const allFigures = getAllFigures();
