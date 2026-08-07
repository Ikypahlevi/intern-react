const students = [
  { name: "Anh", score: 8.5, pass: true },
  { name: "Bắc", score: 4.0, pass: false },
  { name: "Chi", score: 9.2, pass: true },
  { name: "Dũng", score: 5.5, pass: true },
  { name: "Nam", score: 3.0, pass: false },
];

// Bài 4.1. map() cơ bản : Dùng map() để tạo mảng mới chỉ chứa tên các sinh viên (viết hoa toàn bộ).
const studentsName = students.map((u) => u.name.toUpperCase());
console.log("Danh sách tên sinh viên : ");
console.log(studentsName);

// Bài 4.2. filter() cơ bản : Dùng filter() để lấy ra danh sách sinh viên có pass === true.
const studentsPassTrue = students.filter((u) => u.pass == true);
console.log("Danh sách sinh viên qua môn : ");
console.log(studentsPassTrue);

// Bài 4.3. reduce() tính trung bình : Dùng reduce() để tính điểm trung bình (score) của tất cả sinh viên.
const total = students.reduce((acc, u) => acc + u.score, 0);
const average = total / students.length;
console.log("Điểm trung bình của tất cả sinh viên : " + average);

// Bài 4.4. find() : Dùng find() để tìm sinh viên đầu tiên có điểm trên 9.
const studentsNine = students.find((u) => u.score > 9);
console.log("Sinh viên đầu tiên có điểm trên 9 là : " + studentsNine.name);

// Bài 4.5. some() : Dùng some() để kiểm tra xem có sinh viên nào bị điểm liệt (dưới 4) hay không.
const studentsFour = students.some((u) => u.score < 4);
console.log("Có sinh viên bị điểm liệt (dưới 4) : " + studentsFour);

// Bài 4.6. every() : Dùng every() để kiểm tra xem tất cả sinh viên có đạt (pass: true) hay không
const studentsPassAll = students.every((u) => u.pass === true);
console.log("Tất cả sinh viên có đạt hay không : " + studentsPassAll);

// Bài 4.7. Chaining filter + map + reduce : Kết hợp filter() + map() + reduce() theo chuỗi (chaining) để: lọc ra sinh viên đậu, lấy ra điểm số, rồi tính tổng điểm của các sinh viên đậu.
const chaining = students
  .filter((u) => u.pass == true)
  .map((u) => u.score)
  .reduce((acc, u) => acc + u, 0);
console.log("Tổng điểm của các sinh viên đậu là : " + chaining);

// Bài 4.8. Nhóm dữ liệu bằng reduce() : Dùng reduce() để nhóm sinh viên theo trạng thái đạt/không đạt, kết quả mong muốn dạng { pass: [...], fail: [...] }.
const studentsPass = students.reduce(
  (acc, u) => {
    if (u.pass == true) {
      acc.pass.push(u);
    } else {
      acc.fail.push(u);
    }
    return acc;
  },
  { pass: [], fail: [] },
);

console.log("Danh sách sinh viên đạt/không đạt : ");
console.log(studentsPass);
