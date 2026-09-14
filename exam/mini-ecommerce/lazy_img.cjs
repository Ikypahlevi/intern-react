const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.jsx')) {
      callback(dirPath);
    }
  });
}

walkDir(path.join(__dirname, 'src'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  content = content.replace(/<img(?!([^>]+)?loading=)/g, '<img loading="lazy" decoding="async"');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Lazy loaded images in ' + filePath);
  }
});

