const fs = require('fs');
let prodFile = 'src/Pages/admin/products/_components/ProductDrawer.jsx';
let f = fs.readFileSync(prodFile, 'utf8');
f = f.replace(/const productSchema = z\.object\([\s\S]*?\);/, '');
f = f.replace(/import \* as z from "zod";/, 'import { productSchema } from "../../../../Validations/productSchema";');
fs.writeFileSync(prodFile, f);

let userFile = 'src/Pages/admin/users/_components/UserDrawer.jsx';
let u = fs.readFileSync(userFile, 'utf8');
u = u.replace(/const userSchema = z\.object\([\s\S]*?\);/, '');
u = u.replace(/import \* as z from "zod";/, 'import { userSchema } from "../../../../Validations/userSchema";');
fs.writeFileSync(userFile, u);
