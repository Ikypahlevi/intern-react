const scores = [90, 85, 77, 92, 60];
const scoresCopy = [...scores];

const scoresSort = scoresCopy.sort((a, b) => b - a);
console.log(scoresSort);

const [first, ...rest] = scoresSort;
console.log(`Điểm cao nhất đầu tiên : ${first}`);
console.log(`Các điểm còn lại : ${rest}`);
