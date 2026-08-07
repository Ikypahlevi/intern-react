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

async function handleGetUser(id) {
  try {
    const userData = await getUserPromise(id);
    console.log("Lấy dữ liệu thành công:", userData);
  } catch (error) {
    console.error("Báo lỗi:", error);
  } finally {
    console.log("----------------------------------");
  }
}

handleGetUser(10);
handleGetUser(-5);
