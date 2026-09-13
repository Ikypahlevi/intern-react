const fs = require('fs');
const file = 'src/Pages/admin/products/_components/ProductDrawer.jsx';
let text = fs.readFileSync(file, 'utf8');
// Try to fix mojibake
try {
  let fixed = Buffer.from(text, 'latin1').toString('utf8');
  console.log("Fixed snippet:", fixed.substring(0, 500));
} catch (e) {
  console.log("Error:", e);
}
