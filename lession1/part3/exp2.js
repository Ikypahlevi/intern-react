function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "User" + id });
      } else {
        reject("ID ko hợp lệ");
      }
    }, 1000);
  });
}

getUserPromise(1)
  .then((user) => {
    console.log("Trường hợp 1 - Thành công", user);
  })
  .catch((error) => {
    console.log("Trường hợp 1 - Lỗi", error);
  });

getUserPromise(-5)
  .then((user) => {
    console.log("Trường hợp 2 - Thành công:", user);
  })
  .catch((error) => {
    console.error("Trường hợp 2 - Bắt được lỗi:", error);
  });
