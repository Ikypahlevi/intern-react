// Bài 6.7. Kiểm tra ngày cuối tuần [Nâng cao]
// Viết hàm isWeekend(date) kiểm tra xem một ngày có rơi vào Thứ Bảy hoặc Chủ Nhật hay không.
// Sau đó viết hàm countWeekendsInRange(startDate, endDate) đếm số ngày cuối tuần trong một khoảng thời gian.
function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function countWeekendsInRange(startDate, endDate) {
  let count = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isWeekend(currentDate)) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}

console.log("--- Bài 6.7 ---");
const start = new Date(2024, 0, 1);
const end = new Date(2024, 0, 31);
console.log("6/1/2024 có phải cuối tuần?", isWeekend(new Date(2024, 0, 6)));
console.log(
  "Số ngày cuối tuần trong tháng 1/2024:",
  countWeekendsInRange(start, end),
);
