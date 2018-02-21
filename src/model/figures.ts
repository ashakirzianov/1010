import { sameArrays, distinct, flatten, matricify, mapMtx, reduceMtx, subMtx, columnsMtx, range, sameMtxs, rotateClockwiseMtx } from "../utils";
import { ShapeCell, Figure, Shape } from "./game";
import { ColorCode } from "../visuals";

const allShapes: Shape[] = [
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
    ],
    [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ],
    [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [0, 0, 0],
    ],
];

export function rotate(shape: Shape) {
    return rotateClockwiseMtx(shape);
}

export function canMoveUp(shape: Shape) {
    return shape[0].every(cell => cell === 0);
}

export function canMoveLeft(shape: Shape) {
    return range(shape.length).every(i => shape[i][0] === 0);
}

export function moveUp(shape: Shape): Shape {
    return shape.slice(1);
}

export function moveLeft(shape: Shape): Shape {
    return shape.map(sc => sc.slice(1));
}

function normalize(shape: Shape): Shape {
    while (canMoveUp(shape)) {
        shape = moveUp(shape);
    }

    while (canMoveLeft(shape)) {
        shape = moveLeft(shape);
    }

    return shape;
}

export function makeRotations(shape: Shape): Shape[] {
    const r0 = normalize(shape);
    const r1 = normalize(rotate(r0));
    const r2 = normalize(rotate(r1));
    const r3 = normalize(rotate(r2));

    return distinct<Shape>(sameMtxs)([r0, r1, r2, r3]);
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

export function makeFigures(shapes: Shape[]): Figure[] {
    return flatten(shapes
        .map((shape, i) =>
            makeRotations(shape)
                .map(trimShape)
                .map(makeFigure(i))
            ));
}

export function getAllFigures() {
    return makeFigures(allShapes);
}

export const allFigures = getAllFigures();
