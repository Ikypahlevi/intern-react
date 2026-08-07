// Bài 6.6. Tính ngày tốt nghiệp dự kiến [Nâng cao]
// Cho ngày nhập học. Viết hàm tính ngày tốt nghiệp dự kiến sau 4 năm (addYears), và tính số ngày còn lại từ hôm nay đến ngày tốt nghiệp đó.
function addYears(date, years) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function getGraduationInfo(enrollDate) {
  const graduationDate = addYears(enrollDate, 4);
  const today = new Date();

  const ONE_DAY = 1000 * 60 * 60 * 24;
  const diffMs = graduationDate - today;
  const daysRemaining = Math.ceil(diffMs / ONE_DAY);

  return {
    graduationDate: graduationDate,
    daysRemaining: daysRemaining,
  };
}

const enrollDate = new Date(2024, 8, 5); // 5/9/2024
console.log("--- Bài 6.6 ---");
console.log(getGraduationInfo(enrollDate));
