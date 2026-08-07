const ids = [1, 2, 3, 4, 5];

const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Đã lấy sản phẩm " + id);
    }, 1000);
  });
};

async function TuanTu() {
  const timeStart = Date.now();
  for (const id of ids) {
    const timeRun = await getProductById(id);
  }
  const timeCount = Date.now() - timeStart;
  console.log(`Thời gian chạy Tuần tự: ${timeCount}ms`);
}

async function Songsong() {
  const timeStart = Date.now();
  const timeRun = await Promise.all(ids.map((id) => getProductById(id)));
  const timeCount = Date.now() - timeStart;

  console.log(`Thời gian chạy Song song: ${timeCount}ms`);
  console.log(`Dữ liệu lấy được:`, timeRun);
}

async function runTest() {
  console.log("Đang chạy Tuần tự...");
  await TuanTu();

  console.log("\nĐang chạy Song song...");
  await Songsong();
}

runTest();
