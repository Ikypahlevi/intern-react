const fs = require('fs');
const { execSync } = require('child_process');
const iconv = require('iconv-lite');

// 1. Get raw bytes from git commit 51fcc19
let gitOutput = execSync('git show 51fcc19bd451e6726a1680714a58deb3a2f0b014:exam/mini-ecommerce/src/Pages/admin/products/_components/ProductDrawer.jsx');

// 2. gitOutput is a buffer containing the raw double-encoded UTF-8 bytes (e.g. 4D C3 83 C2 A3)
// First, decode it as UTF-8 to get the mojibake string ("MÃ£")
let mojibakeStr = gitOutput.toString('utf8');

// 3. Encode the mojibake string into Win-1252 bytes (4D C3 A3)
let win1252Bytes = iconv.encode(mojibakeStr, 'win1252');

// 4. Decode the Win-1252 bytes as UTF-8 to get the correct string ("Mã")
let fixedStr = iconv.decode(win1252Bytes, 'utf8');

// Replace the file content
fs.writeFileSync('src/Pages/admin/products/_components/ProductDrawer.jsx', fixedStr, 'utf8');
console.log('Fixed file from git!');
