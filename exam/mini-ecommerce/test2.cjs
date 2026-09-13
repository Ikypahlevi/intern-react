const fs = require('fs');
let text = fs.readFileSync('temp_drawer.jsx', 'utf8');
console.log(text.substring(0, 500));
