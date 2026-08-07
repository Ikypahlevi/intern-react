// DỮ LIỆU TỪ SERVER TRẢ VỀ
const apiData = {
  petInfo: { name: "Pikachu", type: "Electric" },
  foodInventory: ["Bánh quy", "Quả táo", "Kẹo"],
};

// ==========================================
// BƯỚC 1: Viết code Destructuring ở đây
// (Lấy 'name' từ petInfo và phần tử đầu tiên từ foodInventory)
// const ... = apiData;
const {
  petInfo: { name: namePet },
  foodInventory: [bq],
} = apiData;

// ==========================================
// BƯỚC 2: Sửa lỗi object myPet dưới đây
const myPet = {
  name: namePet, // Cập nhật lại bằng biến lấy từ Destructuring
  fullness: 0,
  nameFood: bq,

  eat(nameFood) {
    console.log(`${this.name} bắt đầu ăn ${nameFood}...`);

    // Sửa khối setInterval này để không bị lỗi 'this'
    let intervalId = setInterval(() => {
      this.fullness += 10;
      console.log(`${this.name} đang nhai... Độ no hiện tại: ${this.fullness}`);

      if (this.fullness >= 50) {
        console.log(`${this.name} đã no bụng!`);
        // Viết code dừng vòng lặp ở đây
        clearInterval(intervalId);
      }
    }, 1000);
  },
};

myPet.eat(bq);
// Chạy thử hàm:
// myPet.eat('Biến-Thức-Ăn-Lấy-Từ-Bước-1');
