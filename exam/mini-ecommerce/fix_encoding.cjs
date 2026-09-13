const fs = require('fs');
const iconv = require('iconv-lite');

const file = 'src/Pages/admin/products/_components/ProductDrawer.jsx';
let text = fs.readFileSync(file, 'utf8');

// Encode the mojibake back to Win-1252 bytes
let bytes = iconv.encode(text, 'win1252');

// Decode the bytes as UTF-8
let fixed = iconv.decode(bytes, 'utf8');

// Replace the file content
fs.writeFileSync(file, fixed, 'utf8');
console.log('Fixed file!');
