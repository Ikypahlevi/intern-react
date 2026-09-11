const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.settings = {
  brandName: "Swoo Manga - Thiên Đường Truyện Tranh & Light Novel Bản Quyền",
  hotline: "(025) 3686 25 16",
  email: "admin@swoomanga.vn",
  address: "Kho Tổng Otaku HQ, Tầng 3 Swoo Tower, Cầu Giấy, Hà Nội",
  currency: "VND",
  timezone: "Asia/Ho_Chi_Minh",
  payments: {
    vnpay: true,
    momo: true,
    zalo: true,
    cod: true,
    stripe: false
  },
  shipping: {
    freeshipThreshold: 300000,
    wrapRequired: true,
    bubbleWrap: true,
    freeBookmark: true
  },
  security: {
    require2FA: true,
    backupTime: "02:00 AM"
  }
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Injected settings into db.json");
