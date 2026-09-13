const { execSync } = require('child_process');
const iconv = require('iconv-lite');
let gitOutput = execSync('git show 51fcc19bd451e6726a1680714a58deb3a2f0b014:exam/mini-ecommerce/src/Pages/admin/products/_components/ProductDrawer.jsx');
let decoded = iconv.decode(gitOutput, 'win1252');
console.log(decoded.substring(0, 700));
