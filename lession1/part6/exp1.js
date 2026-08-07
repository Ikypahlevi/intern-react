// Bài 6.1. Lấy ngày/tháng/năm hiện tại
const date = new Date();
console.log("Ngày hiện tại : " + date.getDate());
console.log("Tháng hiện tại : " + (date.getMonth() + 1));
console.log("Năm hiện tại : " + date.getFullYear());
