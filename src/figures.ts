import { sameArrays, distinct, flatten, matricify, mapMatrix } from "./utils";
import { ShapeCell, Figure, ColorCode } from "./game";

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

export function makeFigure(color: ColorCode) {
    return function f(flatShape: ShapeFlat) {
        return {
            shape: matricify(3)(flatShape),
            color: color,
        };
    };
}

export function makeFigures(shapes: ShapeFlat[]): Figure[] {
    return flatten(shapes
        .map((shape, i) =>
            makeRotations(shape)
                .map(makeFigure(i))));
}

export function getAllFigures() {
    return makeFigures(allShapes);
}

export const allFigures = getAllFigures();
