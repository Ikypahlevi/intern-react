const { execSync } = require('child_process');
let output = execSync('git show 51fcc19bd451e6726a1680714a58deb3a2f0b014:exam/mini-ecommerce/src/Pages/admin/products/_components/ProductDrawer.jsx');
let str = output.toString('utf8');
let idx = str.indexOf('SKU');
console.log(output.subarray(idx - 10, idx + 20).toString('hex'));
console.log(output.subarray(idx - 10, idx + 20).toString('utf8'));
