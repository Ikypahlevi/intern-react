const fs = require('fs');
const file = 'src/Pages/admin/products/_components/ProductDrawer.jsx';
let text = fs.readFileSync(file, 'utf8');
try {
  let fixed = Buffer.from(text, 'latin1').toString('utf8');
  console.log("Fixed snippet:");
  console.log(fixed.substring(500, 1000));
} catch (e) {
  console.log("Error:", e);
}
