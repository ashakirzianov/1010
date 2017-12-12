
// const shapes: Shape[] = [
//     [
//         1, 1, 1,
//         1, 1, 1,
//         1, 1, 1,
//     ],
//     [
//         1, 1, 1,
//         1, 0, 0,
//         1, 0, 0,
//     ],
//     [
//         1, 1, 0,
//         1, 1, 0,
//         0, 0, 0,
//     ],
//     [
//         1, 0, 0,
//         0, 0, 0,
//         0, 0, 0,
//     ],
//     [
//         1, 1, 0,
//         1, 0, 0,
//         0, 0, 0,
//     ],
//     [
//         0, 1, 0,
//         0, 1, 0,
//         0, 1, 0,
//     ],
//     [
//         1, 1, 0,
//         0, 0, 0,
//         0, 0, 0,
//     ],
// ];

// function rotateShape3x3(shape: Shape): Shape {
//     const rotation = [6, 3, 0, 7, 4, 1, 8, 5, 2];
//     return rotation.map(i => shape[i]);
// }

// function makeRotations3x3(shape: Shape): Shape[] {
//     const r1 = rotateShape3x3(shape);
//     const r2 = rotateShape3x3(r1);
//     const r3 = rotateShape3x3(r2);

//     return [shape, r1, r2, r3];
// }

// function makeFigure3x3(arr: Array<0 | 1>, color: CellColor) {
//     if (arr.length !== 9) {
//         throw new Error("Bad figure description");
//     }

//     const figure = new Array<CellStatus[]>();
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             const curr = arr[3 * i + j];
//             figure[i][j] = curr === 0 ? "none" : color;
//         }
//     }

//     return figure;
// }

// export const figures = shapes
//     .map((shape, i) => makeRotations3x3(shape).map(s => makeFigure3x3(s, i)))
//     .reduce((acc, curr) => acc.concat(curr))
//     ;
