const fs = require('fs');
const path = require('path');

const movePages = ['about', 'cart', 'checkout', 'contact', 'home', 'productDetail', 'products', 'profile'];
const moveComponents = ['Button', 'Input', 'Modal', 'ProductCard', 'Select', 'Table'];

const srcDir = path.join(__dirname, 'src');
const pagesDir = path.join(srcDir, 'Pages');
const componentsDir = path.join(srcDir, 'Components');
const userPagesDir = path.join(pagesDir, 'user');
const userComponentsDir = path.join(componentsDir, 'user');

// 1. Create directories
if (!fs.existsSync(userPagesDir)) fs.mkdirSync(userPagesDir);
if (!fs.existsSync(userComponentsDir)) fs.mkdirSync(userComponentsDir);

// 2. Move folders
movePages.forEach(p => {
  const oldPath = path.join(pagesDir, p);
  const newPath = path.join(userPagesDir, p);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${oldPath} to ${newPath}`);
  }
});

moveComponents.forEach(c => {
  const oldPath = path.join(componentsDir, c);
  const newPath = path.join(userComponentsDir, c);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${oldPath} to ${newPath}`);
  }
});

// Helper to update imports
function updateImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // We need to resolve every relative import and see if it points to a moved file, or if the file itself moved.
  // Actually, a simpler regex approach:
  
  // Since we are moving files, let's figure out the absolute path of the file.
  // Then for each import line: import ... from 'relative_path'
  // 1. Resolve absolute path of imported module.
  // 2. Check if the imported module was moved.
  // 3. Re-calculate the relative path from the new file path to the new imported module path.

  const importRegex = /(import\s+.*?from\s+['"])(.*?)(['"];?)/g;
  const dynamicImportRegex = /(import\(['"])(.*?)(['"]\))/g;
  
  // To recalculate, we need a map of old absolute paths to new absolute paths.
  // Let's build a mapping function.
  function getNewAbsolutePath(absPath) {
    // Normalize path to use forward slashes for matching
    const normPath = absPath.replace(/\\/g, '/');
    
    // Check if it's in a moved page
    for (let p of movePages) {
      const oldPrefix = pagesDir.replace(/\\/g, '/') + '/' + p;
      if (normPath === oldPrefix || normPath.startsWith(oldPrefix + '/')) {
        return normPath.replace(oldPrefix, userPagesDir.replace(/\\/g, '/') + '/' + p);
      }
    }
    
    // Check if it's in a moved component
    for (let c of moveComponents) {
      const oldPrefix = componentsDir.replace(/\\/g, '/') + '/' + c;
      if (normPath === oldPrefix || normPath.startsWith(oldPrefix + '/')) {
        return normPath.replace(oldPrefix, userComponentsDir.replace(/\\/g, '/') + '/' + c);
      }
    }
    
    return normPath;
  }

  // Get the new path of the CURRENT file
  const newCurrentFilePath = getNewAbsolutePath(filePath);

  const processImport = (match, p1, p2, p3) => {
    if (!p2.startsWith('.')) return match; // Only process relative imports
    
    // Resolve absolute path of the imported module based on the OLD current file path
    // wait, if we are modifying the file AFTER it has been moved physically, `filePath` is already the new path!
    // But our script reads the directory tree AFTER moving.
    // So `filePath` IS the new path.
    // If it's the new path, the old imports inside the file are currently broken because they were relative to the OLD path.
    // So we need to compute the OLD path of the current file first!
    
    let oldCurrentFilePath = filePath.replace(/\\/g, '/');
    // Reverse lookup to find old path
    for (let p of movePages) {
      const newPrefix = userPagesDir.replace(/\\/g, '/') + '/' + p;
      if (oldCurrentFilePath === newPrefix || oldCurrentFilePath.startsWith(newPrefix + '/')) {
        oldCurrentFilePath = oldCurrentFilePath.replace(newPrefix, pagesDir.replace(/\\/g, '/') + '/' + p);
        break;
      }
    }
    for (let c of moveComponents) {
      const newPrefix = userComponentsDir.replace(/\\/g, '/') + '/' + c;
      if (oldCurrentFilePath === newPrefix || oldCurrentFilePath.startsWith(newPrefix + '/')) {
        oldCurrentFilePath = oldCurrentFilePath.replace(newPrefix, componentsDir.replace(/\\/g, '/') + '/' + c);
        break;
      }
    }
    
    // Now we know the old current file path.
    const oldCurrentDir = path.dirname(oldCurrentFilePath);
    
    // The imported path (p2) is relative to oldCurrentDir. Let's get its absolute path.
    const importedAbsPath = path.resolve(oldCurrentDir, p2);
    
    // Now find where this imported module moved to (if it moved).
    const newImportedAbsPath = getNewAbsolutePath(importedAbsPath);
    
    // Now calculate the new relative path from the NEW current dir to the NEW imported module dir.
    const newCurrentDir = path.dirname(filePath); // filePath is already the new path
    
    let newRelativePath = path.relative(newCurrentDir, newImportedAbsPath).replace(/\\/g, '/');
    if (!newRelativePath.startsWith('.')) {
      newRelativePath = './' + newRelativePath;
    }
    
    return p1 + newRelativePath + p3;
  };

  content = content.replace(importRegex, processImport);
  content = content.replace(dynamicImportRegex, processImport);
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}

// Recursively find all JS/JSX files
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.js') || dirPath.endsWith('.jsx')) {
      callback(dirPath);
    }
  });
}

// 3. Update all imports in the entire src directory
walkDir(srcDir, updateImportsInFile);
console.log("Finished updating imports!");
