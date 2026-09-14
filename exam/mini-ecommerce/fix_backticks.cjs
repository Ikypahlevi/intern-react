const fs = require('fs');

function fix(file) {
  let c = fs.readFileSync(file, 'utf8');
  // It seems powershell removed backticks inside { } when I wrote it
  // Actually, I wrote \\\ which became \\
  // Let me just restore the backticks.
  c = c.replace(/className=\{\\\\(.*)\\\\\\}/g, 'className={\$1\}');
  c = c.replace(/className=\{\\\\(.*)\\\\}/g, 'className={\$1\}');
  fs.writeFileSync(file, c);
}

// In OrdersTable.jsx
let tableContent = fs.readFileSync('src/Pages/admin/orders/_components/OrdersTable.jsx', 'utf8');
tableContent = tableContent.replace(/className=\{\\\\(.*)\\\\\\}/g, 'className={\$1\}');
// Wait, looking at the error:
// className={\hover:bg-yellow-50 transition-all duration-500 border-l-[6px] \ \}
// I can just rewrite the string interpolation blocks.

