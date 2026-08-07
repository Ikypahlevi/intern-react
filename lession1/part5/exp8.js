// Bài 5.8. Slugify chuỗi
const slugify = (title) => {
  const slugifyString = title
    .trim()
    .toLowerCase()
    .replace(".", "@")
    .split(" ")
    .join("-");
  return slugifyString;
};

console.log(slugify("Sầm Sơn Thanh Hoá"));
