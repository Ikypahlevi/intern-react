const { execSync } = require('child_process');
let output = execSync('git show 51fcc19bd451e6726a1680714a58deb3a2f0b014:exam/mini-ecommerce/src/Pages/admin/products/_components/ProductDrawer.jsx');
let asUtf8 = output.toString('utf8');
let fixed = Buffer.from(asUtf8, 'latin1').toString('utf8');
console.log(fixed.substring(500, 1000));
