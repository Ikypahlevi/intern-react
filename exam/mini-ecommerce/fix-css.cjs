const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/Pages/admin/settings');

const replaceMap = {
  // Backgrounds
  'bg-surface-container-lowest': 'bg-white',
  'bg-surface-container-low': 'bg-yellow-50',
  'bg-surface-container-high': 'bg-gray-100',
  'bg-surface-container-highest': 'bg-gray-200',
  'bg-primary-container': 'bg-comic-yellow',
  'bg-secondary-container': 'bg-red-500', // secondary is usually red in comic theme
  'bg-tertiary-container': 'bg-green-200',
  'bg-error-container': 'bg-red-200',
  'bg-secondary': 'bg-red-600',
  
  // Colors
  'border-on-background': 'border-black',
  'text-on-background': 'text-black',
  'text-on-surface': 'text-gray-800',
  'text-on-surface-variant': 'text-gray-600',
  'text-on-secondary': 'text-white',
  'text-on-tertiary-container': 'text-black',
  'text-secondary': 'text-red-600',
  'text-primary': 'text-blue-600',
  'text-tertiary': 'text-green-600',
  
  // Spacing (Approximate)
  'gap-space-3xs': 'gap-1',
  'gap-space-2xs': 'gap-2',
  'gap-space-xs': 'gap-3',
  'gap-space-sm': 'gap-4',
  'gap-space-md': 'gap-6',
  'gap-space-lg': 'gap-8',
  'gap-space-xl': 'gap-10',
  'gap-space-3xl': 'gap-16',
  
  'p-space-3xs': 'p-1',
  'p-space-2xs': 'p-2',
  'p-space-xs': 'p-3',
  'p-space-sm': 'p-4',
  'p-space-md': 'p-6',
  'p-space-lg': 'p-8',
  
  'px-space-3xs': 'px-1',
  'px-space-2xs': 'px-2',
  'px-space-xs': 'px-3',
  'px-space-sm': 'px-4',
  'px-space-md': 'px-6',
  'px-space-lg': 'px-8',
  
  'py-space-3xs': 'py-1',
  'py-space-2xs': 'py-2',
  'py-space-xs': 'py-3',
  'py-space-sm': 'py-4',
  'py-space-md': 'py-6',
  'py-space-lg': 'py-8',
  
  'mt-space-2xs': 'mt-2',
  'mt-space-3xs': 'mt-1',
  'mt-space-xs': 'mt-3',
  'mt-space-sm': 'mt-4',
  'mt-space-md': 'mt-6',
  'mt-space-lg': 'mt-8',
  
  'mb-space-2xs': 'mb-2',
  'mb-space-3xs': 'mb-1',
  'mb-space-xs': 'mb-3',
  'mb-space-sm': 'mb-4',
  'mb-space-md': 'mb-6',
  'mb-space-lg': 'mb-8',
  'mb-space-3xl': 'mb-16',
  
  'pb-space-xs': 'pb-3',
  'pt-space-xs': 'pt-3',
  
  // Fonts
  'font-headline-md': 'font-comic',
  'font-headline-sm': 'font-comic',
  'font-label-caps': 'font-comic uppercase',
  'font-label-numeric': 'font-comic tracking-wider',
  'font-title-md': 'font-bubble font-bold',
  'font-body-sm': 'font-bubble font-bold',
  
  // Shadows (replace hex color)
  '#1c1b1b': '#000',
  '-mx-gutter-desktop': '-mx-6',
  'px-gutter-desktop': 'px-6'
};

function walkDir(d) {
  fs.readdirSync(d).forEach(f => {
    let p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walkDir(p);
    else if (p.endsWith('.jsx')) {
      let content = fs.readFileSync(p, 'utf8');
      
      // Iterate over replacements
      for (const [key, value] of Object.entries(replaceMap)) {
        const regex = new RegExp(key, 'g');
        content = content.replace(regex, value);
      }
      
      fs.writeFileSync(p, content, 'utf8');
    }
  });
}

walkDir(dir);
console.log('Fixed CSS in Settings!');
