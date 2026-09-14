import * as z from 'zod';
import { ROLES, STATUS } from '../Constants';

export const userSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  nickname: z.string().optional(),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
  role: z.enum([ROLES.ADMIN, ROLES.CUSTOMER]),
  status: z.enum([STATUS.ACTIVE, STATUS.LOCKED]),
});
