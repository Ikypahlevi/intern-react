const fs = require('fs');
let c = fs.readFileSync('src/Services/userService.js', 'utf8');

c = c.replace(
  'getById: async (id) => {',
  'getByEmail: async (email) => {\n    return await api.get(/users?email=\);\n  },\n  getById: async (id) => {'
);
fs.writeFileSync('src/Services/userService.js', c);

