const arr1 = [1, 2, 3, 4, 5];

// dùng vòng lặp
const sum1 = (...a1) => {
  let total = 0;

  for (let num of a1) {
    total += num;
  }
  return total;
};

// dùng hàm reduce()
const sum2 = (...a2) => {
  return a2.reduce((sum, numbers) => sum + numbers, 0);
};

const result1 = sum1(...arr1);
const result2 = sum2(...arr1);
console.log("Kết quả bằng vòng lặp : " + result1);
console.log("Kết quả bằng hàm reduce : " + result2);
