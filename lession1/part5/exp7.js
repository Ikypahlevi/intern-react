const renderStudentCard = ({ name, score, major }) => {
  const studentCard = `
    <div> Sinh viên : ${name} - Ngành : ${major} - Điểm : ${score} </div>
  `;
  return studentCard;
};

console.log(renderStudentCard({ name: "Dương", score: 8.5, major: "CNTT" }));
