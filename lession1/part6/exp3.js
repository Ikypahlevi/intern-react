// Bài 6.3. Định dạng ngày với padStart [Trung bình]
// Viết hàm formatDate(date) nhận vào một đối tượng Date và trả về chuỗi định dạng "dd/mm/yyyy", có xử lý thêm số 0 phía trước nếu ngày/tháng nhỏ hơn 10.
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

console.log("--- Bài 6.3 ---");
console.log(formatDate(new Date(2024, 0, 5)));
