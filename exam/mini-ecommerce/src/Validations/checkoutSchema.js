import * as z from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  lastName: z.string().min(2, "Họ phải có ít nhất 2 ký tự"),
  country: z.string().min(1, "Vui lòng chọn quốc gia"),
  street: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  city: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  phone: z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  notes: z.string().optional()
});
