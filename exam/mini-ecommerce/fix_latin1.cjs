const fs = require('fs');
const { execSync } = require('child_process');
const iconv = require('iconv-lite');

let gitOutput = execSync('git show 51fcc19bd451e6726a1680714a58deb3a2f0b014:exam/mini-ecommerce/src/Pages/admin/products/_components/ProductDrawer.jsx');
let mojibakeStr = gitOutput.toString('utf8');

// The original BOM is U+FEFF. Let's remove it if it exists so it doesn't mess up Latin1 encoding
if (mojibakeStr.charCodeAt(0) === 0xFEFF) {
  mojibakeStr = mojibakeStr.substring(1);
}

// Encode to latin1 instead of win1252
let bytes = iconv.encode(mojibakeStr, 'latin1');
let fixedStr = iconv.decode(bytes, 'utf8');

fs.writeFileSync('src/Pages/admin/products/_components/ProductDrawer.jsx', fixedStr, 'utf8');
console.log('Fixed file from git with latin1!');
