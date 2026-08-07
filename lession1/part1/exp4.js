const user = {
  id: 1,
  info: {
    username: "duong2208",
    address: { city: "Thanh Hoá", district: "Sầm Sơn" },
  },
};

const {
  info: {
    username,
    address: { city, district },
  },
} = user;
console.log("User : " + username);
console.log("City : " + city);
console.log("District : " + district);
