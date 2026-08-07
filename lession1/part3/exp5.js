const mockCallApi = (rateError) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (rateError > 0.8) {
        resolve("Thành công! Lấy được dữ liệu.");
      } else {
        reject("Thất bại! Mạng chập chờn.");
      }
    }, 2000);
  });
};

async function fetchWithRetry(url, retries) {
  for (let i = 0; i <= retries; i++) {
    try {
      const data = await mockCallApi(Math.random());

      console.log(`Lần ${i}: Đã lấy được dữ liệu từ ${url}`);
      return data;
    } catch (error) {
      if (i === retries) {
        console.log(`Lần ${i}: Thất bại`);
        throw error;
      } else {
        console.log(`Lần ${i}: Thất bại, đang thử lại lần nữa...`);
      }
    }
  }
}

fetchWithRetry("facebook.com", 3)
  .then((result) => console.log("KẾT QUẢ CUỐI CÙNG:", result))
  .catch((err) => console.log("LỖI CUỐI CÙNG:", err));
