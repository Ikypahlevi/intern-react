const fs = require('fs');

const replaces = [
  {
    file: 'src/Pages/user/checkout/Checkout.jsx',
    old: 'import { checkoutSchema } from "./_schema/checkoutSchema";',
    new: 'import { checkoutSchema } from "../../../Validations/checkoutSchema";'
  },
  {
    file: 'src/Pages/auth/Login.jsx',
    old: 'import { loginSchema } from "./_schema/authSchema";',
    new: 'import { loginSchema } from "../../Validations/authSchema";'
  },
  {
    file: 'src/Pages/auth/Register.jsx',
    old: 'import { registerSchema } from "./_schema/authSchema";',
    new: 'import { registerSchema } from "../../Validations/authSchema";'
  },
  {
    file: 'src/Pages/user/profile/_components/ProfileDetails.jsx',
    old: 'import { profileSchema } from "../_schema/profileSchema";',
    new: 'import { profileSchema } from "../../../../Validations/profileSchema";'
  }
];

replaces.forEach(r => {
  if (fs.existsSync(r.file)) {
    let content = fs.readFileSync(r.file, 'utf8');
    content = content.replace(r.old, r.new);
    fs.writeFileSync(r.file, content);
    console.log('Fixed', r.file);
  }
});
