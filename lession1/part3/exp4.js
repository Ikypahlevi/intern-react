const getRandomDelay = () =>
  Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

const fetchUser = () => {
  return new Promise((resolve) => {
    const time = getRandomDelay();
    setTimeout(() => {
      console.log(`fetchUser xong sau ${time}ms`);
      resolve({ id: 1, name: "Nguyễn Văn A" });
    }, time);
  });
};

const fetchPosts = () => {
  return new Promise((resolve) => {
    const time = getRandomDelay();
    setTimeout(() => {
      console.log(`fetchPosts xong sau ${time}ms`);
      resolve(["Bài viết 1", "Bài viết 2"]);
    }, time);
  });
};

const fetchComments = () => {
  return new Promise((resolve) => {
    const time = getRandomDelay();
    setTimeout(() => {
      console.log(`fetchComments xong sau ${time}ms`);
      resolve(["Bình luận 1", "Bình luận 2", "Bình luận 3"]);
    }, time);
  });
};

async function loadAllData() {
  try {
    console.log("Bắt đầu gọi API song song...");

    console.time("Tổng thời gian chạy");

    const [userData, userPosts, userComments] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments(),
    ]);

    console.log("\nĐÃ TẢI XONG TOÀN BỘ DỮ LIỆU:");
    console.log("- User:", userData);
    console.log("- Posts:", userPosts);
    console.log("- Comments:", userComments);

    console.timeEnd("Tổng thời gian chạy");
  } catch (error) {
    console.error("Có lỗi xảy ra trong quá trình tải:", error);
  }
}

loadAllData();
