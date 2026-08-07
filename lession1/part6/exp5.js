// Bài 6.5. Tính số ngày chênh lệch [Trung bình]
// Viết hàm diffInDays(date1, date2) tính số ngày chênh lệch giữa hai đối tượng Date.
function diffInDays(date1, date2) {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const diffMs = Math.abs(date2 - date1);
  return Math.floor(diffMs / ONE_DAY);
}

console.log("--- Bài 6.5 ---");
const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 0, 15);
console.log("Chênh lệch ngày:", diffInDays(d1, d2));
