// Bài 7.3. Giả lập lấy dữ liệu thời tiết nhiều thành phố
function fetchWeather(city) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000 + 500;
    setTimeout(() => {
      const isError = Math.random() < 0.2;
      if (isError) {
        reject(`Không thể lấy dữ liệu thời tiết cho ${city}`);
      } else {
        const temp = Math.floor(Math.random() * 15) + 20;
        resolve(`Thời tiết tại ${city}: ${temp}°C`);
      }
    }, delay);
  });
}

async function fetchAllWeather() {
  const cities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Huế", "Hải Phòng"];
  console.log("Bắt đầu lấy dữ liệu thời tiết...");
  const startTime = Date.now();

  const weatherPromises = cities.map((city) => fetchWeather(city));

  const results = await Promise.allSettled(weatherPromises);

  const endTime = Date.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`\nKết quả tổng hợp (Mất ${timeTaken} giây):`);
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`[Thành công] ${result.value}`);
    } else {
      console.log(`[Thất bại] ${result.reason}`);
    }
  });
}

// Gọi hàm in ra kết quả
console.log("--- Bài 7.3 ---");
fetchAllWeather();
