// Bài 1.1. Arrow function cơ bản
let squareArrow = (n) => {
  let bp = n * n;
  return bp;
};

console.log("Arrow Function");
console.log("Bình phương của n là : " + squareArrow(5));

// function expression
let squareEx = function (n) {
  let bp = n * n;
  return bp;
};

console.log("Function Expression");
console.log("Bình phương của n là : " + squareEx(7));

// function declaration
function squareDe(n) {
  let bp = n * n;
  return bp;
}
console.log("Function Declaration");
console.log("Bình phương của n là : " + squareDe(6));
