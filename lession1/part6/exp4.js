// Bài 6.4. Cộng ngày vào Date [Trung bình]
// Viết hàm addDays(date, days) trả về một đối tượng Date mới sau khi cộng thêm số ngày days vào date (không được làm thay đổi date gốc).
function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

console.log("--- Bài 6.4 ---");
const date64 = new Date(2024, 0, 1);
console.log("Gốc:", date64);
console.log("Thêm 5 ngày:", addDays(date64, 5));
