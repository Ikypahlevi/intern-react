const fs = require('fs');
let text = fs.readFileSync('src/Pages/admin/products/_components/ProductDrawer.jsx', 'utf8');

// The file currently has UTF-8 encoded string of what was read as win1252.
// We need to encode the string back to win1252 bytes, then read those bytes as utf8.
// Since JS doesn't have win1252 natively, let's map characters 128-159 to their win1252 bytes.

const win1252ToChar = {
  0x80: '€', 0x82: '‚', 0x83: 'ƒ', 0x84: '„', 0x85: '…', 0x86: '†', 0x87: '‡', 0x88: 'ˆ', 0x89: '‰', 0x8A: 'Š', 0x8B: '‹', 0x8C: 'Œ', 0x8E: 'Ž',
  0x91: '‘', 0x92: '’', 0x93: '“', 0x94: '”', 0x95: '•', 0x96: '–', 0x97: '—', 0x98: '˜', 0x99: '™', 0x9A: 'š', 0x9B: '›', 0x9C: 'œ', 0x9E: 'ž', 0x9F: 'Ÿ'
};

const charToWin1252 = {};
for (let i = 0; i < 256; i++) {
  if (win1252ToChar[i]) {
    charToWin1252[win1252ToChar[i]] = i;
  } else if (i < 128 || i >= 160) {
    charToWin1252[String.fromCharCode(i)] = i;
  }
}

// Manually convert the string to a buffer of Win1252 bytes
let bytes = [];
for (let i = 0; i < text.length; i++) {
  let char = text[i];
  if (charToWin1252[char] !== undefined) {
    bytes.push(charToWin1252[char]);
  } else {
    // If it's a character that wasn't in win1252 (e.g., standard emojis that didn't get corrupted or got mixed in)
    // we just use its charCode, but this might mean the file is mixed.
    // For now, let's assume all text can be mapped.
    let code = text.charCodeAt(i);
    if (code < 256) bytes.push(code);
    else {
      // Fallback: encode to utf-8 bytes
      let buf = Buffer.from(char, 'utf8');
      for(let b of buf) bytes.push(b);
    }
  }
}

let fixed = Buffer.from(bytes).toString('utf8');
console.log(fixed.substring(500, 1000));
