const point = [10, 20, 30];

const [x, y] = point;
console.log(x, y);

const instance = (x, y) => {
  let kc = Math.sqrt(x ** 2 + y ** 2);
  return kc;
};

console.log("Khoảng cách từ gốc toạ độ : " + instance(x, y));
