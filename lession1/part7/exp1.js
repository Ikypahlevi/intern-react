// Bài 7.1. Quản lý đơn hàng
const orders = [
  {
    id: 1,
    customer: "An",
    total: 250000,
    date: "2026-06-01",
    status: "completed",
  },
  {
    id: 2,
    customer: "Bình",
    total: 120000,
    date: "2026-06-15",
    status: "cancelled",
  },
  {
    id: 3,
    customer: "Chi",
    total: 500000,
    date: "2026-07-02",
    status: "completed",
  },
  {
    id: 4,
    customer: "An",
    total: 75000,
    date: "2026-07-05",
    status: "completed",
  },
];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// 1. Tính tổng doanh thu của các đơn hàng "completed"
const totalRevenue = orders
  .filter((o) => o.status === "completed")
  .reduce((sum, o) => sum + o.total, 0);

// 2. Tạo danh sách chuỗi hiển thị
const formattedOrders = orders.map(
  (o) =>
    `Đơn #${o.id} - ${o.customer} - ${o.total.toLocaleString()}đ - ${formatDate(o.date)}`,
);

// 3. Nhóm đơn hàng theo customer
const ordersByCustomer = orders.reduce((acc, o) => {
  if (!acc[o.customer]) {
    acc[o.customer] = [];
  }
  acc[o.customer].push(o);
  return acc;
}, {});

// 4. Giả lập xử lý đơn hàng
function processOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Đã xử lý xong đơn hàng #${order.id} của ${order.customer}`);
      resolve();
    }, 1000);
  });
}

async function processAllCompletedOrders() {
  console.log("Bắt đầu xử lý đơn hàng...");
  const completedOrders = orders.filter((o) => o.status === "completed");
  for (const order of completedOrders) {
    await processOrder(order);
  }
  console.log("Đã xử lý xong tất cả các đơn hàng completed.");
}

// Gọi hàm in ra kết quả
console.log("--- Bài 7.1 ---");
console.log(
  "1. Tổng doanh thu đơn hàng completed:",
  totalRevenue.toLocaleString() + "đ",
);
console.log("\n2. Danh sách hiển thị:");
formattedOrders.forEach((str) => console.log(str));
console.log("\n3. Đơn hàng nhóm theo khách hàng:", ordersByCustomer);
console.log("\n4. Tiến trình xử lý đơn hàng (async):");
processAllCompletedOrders();
