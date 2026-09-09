const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const statusMap = {
  "Có sẵn (In stock)": "active",
  "Hết hàng (Out of stock)": "out_of_stock",
  "Pre-order": "preorder",
  "Sắp ra mắt (Coming soon)": "new"
};

// Update products
db.products = db.products.map((p, index) => {
  // standardize status
  if (p.status && statusMap[p.status]) {
    p.status = statusMap[p.status];
  } else if (!p.status || typeof p.status !== 'string') {
    p.status = 'active';
  } else {
    // If it's already one of our standard keys, keep it. If not, default to active
    if (!['active', 'paused', 'new', 'preorder', 'out_of_stock'].includes(p.status)) {
       p.status = 'active';
    }
  }

  // Set originalPrice (assuming 10-20% higher than price)
  if (!p.originalPrice) {
    p.originalPrice = Math.round((p.price * 1.15) / 1000) * 1000;
  }

  // Set sku
  if (!p.sku) {
    p.sku = `MANGA-${p.id.padStart(3, '0')}`;
  }

  // Set author
  if (!p.author) {
    p.author = "Chưa cập nhật";
    if (p.name.toLowerCase().includes('one piece')) p.author = "Eiichiro Oda";
    if (p.name.toLowerCase().includes('kimetsu no yaiba')) p.author = "Koyoharu Gotouge";
    if (p.name.toLowerCase().includes('jujutsu kaisen')) p.author = "Gege Akutami";
    if (p.name.toLowerCase().includes('spy x family')) p.author = "Tatsuya Endo";
    if (p.name.toLowerCase().includes('chainsaw man')) p.author = "Tatsuki Fujimoto";
  }

  // Set format
  if (!p.format) {
    p.format = p.category === 'Boxset' ? "Hộp Gỗ" : "Bản Tiêu Chuẩn";
  }

  return p;
});

// Write back
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated products in db.json');
