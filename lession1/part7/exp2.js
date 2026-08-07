// Bài 7.2. Tìm kiếm sản phẩm
const products = [
  { name: "Laptop Dell XPS", price: 35000000, category: "Electronics" },
  { name: "Chuột không dây Dell", price: 500000, category: "Accessories" },
  { name: "Bàn phím cơ Logitech", price: 2500000, category: "Accessories" },
  {
    name: "Màn hình Dell UltraSharp",
    price: 12000000,
    category: "Electronics",
  },
  { name: "Tai nghe Sony", price: 4000000, category: "Audio" },
];

function searchProducts(products, keyword) {
  const lowerKeyword = keyword.toLowerCase();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(lowerKeyword),
  );
  return [...filtered].sort((a, b) => a.price - b.price);
}

// Gọi hàm in ra kết quả
console.log("--- Bài 7.2 ---");
console.log("Kết quả tìm kiếm với từ khóa 'Dell':");
console.log(searchProducts(products, "Dell"));

console.log("\nKết quả tìm kiếm với từ khóa 'Tai nghe':");
console.log(searchProducts(products, "tai nghe"));
