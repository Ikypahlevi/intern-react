const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const { users, products } = db;
const customers = users.filter(u => u.role !== 'admin');

if (customers.length === 0) {
  customers.push(users[0]); // fallback to admin if no customers
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(startMonth, endMonth) {
  const start = new Date(2026, startMonth, 1).getTime();
  const end = new Date(2026, endMonth, 28).getTime();
  return new Date(start + Math.random() * (end - start)).toISOString();
}

const statuses = ['pending', 'shipping', 'completed', 'cancelled'];
const addresses = [
  "12 Đường số 5, KDC An Phú Hưng, Quận 7, TP. HCM",
  "Tòa Landmark 81, P.22, Bình Thạnh, TP. Hồ Chí Minh",
  "Số 45 Ngõ 198 Xã Đàn, Đống Đa, Hà Nội",
  "Khu Đô Thị Ecopark, Văn Giang, Hưng Yên",
  "Số 12 Chùa Bộc, Quang Trung, Đống Đa, Hà Nội",
  "100 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
  "15 Lê Lợi, Hải Châu, Đà Nẵng",
  "22 Nguyễn Huệ, Quận 1, TP. HCM"
];

const generatedOrders = [];

for (let i = 0; i < 20; i++) {
  const customer = customers[getRandomInt(0, customers.length - 1)];
  const numItems = getRandomInt(1, 4);
  const orderItems = [];
  let itemsTotal = 0;

  for (let j = 0; j < numItems; j++) {
    const product = products[getRandomInt(0, products.length - 1)];
    const quantity = getRandomInt(1, 3);
    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image || "/img/default.jpg"
    });
    itemsTotal += product.price * quantity;
  }

  const shippingFee = 30000;
  const status = statuses[getRandomInt(0, statuses.length - 1)];
  
  // Distributed across January (0) to September (8)
  const createdAt = getRandomDate(0, 8);

  generatedOrders.push({
    id: `SWOO-${getRandomInt(10000, 99999)}`,
    userId: String(customer.id),
    customerName: customer.name || "Khách Hàng Bí Ẩn",
    phone: customer.phone || `09${getRandomInt(10000000, 99999999)}`,
    address: addresses[getRandomInt(0, addresses.length - 1)],
    items: orderItems,
    totalAmount: itemsTotal + shippingFee,
    status: status,
    createdAt: createdAt
  });
}

db.orders = generatedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Successfully generated 20 real orders in db.json!");
