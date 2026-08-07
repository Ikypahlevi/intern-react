const matrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];

const matrixCopy = [...matrix];
const [arr1, arr2, arr3] = matrixCopy;
console.log(arr1);
console.log(arr2);
console.log(arr3);

const matrixMerge = [...arr1, ...arr2, ...arr3];
console.log(matrixMerge);
