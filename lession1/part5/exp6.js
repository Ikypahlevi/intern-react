// Bài 5.6. toLowerCase() / toUpperCase()
const capitalize = (str) => {
  const firstItem = str.slice(0, 1).toUpperCase();

  const restItem = str.slice(1).toLowerCase();

  return firstItem + restItem;
};

console.log(capitalize("tHanh Hoá"));
