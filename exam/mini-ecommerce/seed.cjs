const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Add 'sold' to products and adjust 'stock' for low stock alert
db.products = db.products.map(p => {
  if (p.sold === undefined) {
    p.sold = Math.floor(Math.random() * 500) + 50; // Random 50 to 550
  }
  return p;
});

// Force some products to have low stock
db.products[0].stock = 7; // One piece
db.products[1].stock = 3; // Kimetsu
db.products[2].stock = 12; // Sololeveling

// 2. Generate mock orders
const statuses = ['pending', 'completed', 'shipping', 'cancelled'];
const mockOrders = [];

const today = new Date();
for (let i = 0; i < 20; i++) {
  // Random date within last 6 months
  const date = new Date(today);
  date.setMonth(today.getMonth() - Math.floor(Math.random() * 6));
  date.setDate(Math.floor(Math.random() * 28) + 1);

  const status = i < 5 ? 'pending' : statuses[Math.floor(Math.random() * statuses.length)];
  const product = db.products[Math.floor(Math.random() * db.products.length)];
  const quantity = Math.floor(Math.random() * 3) + 1;

  mockOrders.push({
    id: `SWO-88${400 + i}`,
    userId: "2", // Duong Customer
    customerName: i % 2 === 0 ? "Trần Quang Minh" : "Lê Thuỳ Trang",
    phone: "0912345678",
    address: "Hà Nội",
    items: [
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      }
    ],
    totalAmount: product.price * quantity + 30000, // + shipping
    status: status,
    createdAt: date.toISOString()
  });
}

// Sort orders by date descending
mockOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

db.orders = mockOrders;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated db.json with mock orders and product sold counts.');
