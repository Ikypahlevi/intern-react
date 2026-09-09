const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Update users
db.users = db.users.map((u, index) => {
  // Make sure role is either admin or customer
  if (!['admin', 'customer'].includes(u.role)) {
    u.role = 'customer';
  }
  
  // Add missing fields
  if (!u.phone) {
    u.phone = `09${Math.floor(10000000 + Math.random() * 90000000)}`;
  }
  if (!u.nickname) {
    u.nickname = `@${u.name.split(' ')[0].toLowerCase()}_${Math.floor(Math.random() * 999)}`;
  }
  if (!u.status) {
    // Randomly lock some customers
    u.status = (u.role === 'customer' && Math.random() > 0.8) ? 'locked' : 'active';
  }
  return u;
});

// Write back
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated users in db.json');
