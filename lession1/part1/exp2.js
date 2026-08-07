//Bài 1.2. Destructuring object cơ bản
const student = { name: "Duong", age: 20, major: "IT" };

const { name: studentName, major: studentMajor } = student;

console.log("Tên sinh viên : " + studentName);
console.log("Chuyên ngành : " + studentMajor);
