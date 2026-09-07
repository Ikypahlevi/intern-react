import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Tên sản phẩm không được để trống" }),
  price: z.coerce
    .number({ invalid_type_error: "Giá tiền phải là số" })
    .positive({ message: "Giá tiền phải lớn hơn 0" }),
  stock: z.coerce
    .number({ invalid_type_error: "Số lượng phải là số" })
    .min(0, { message: "Số lượng không được âm" }),
  category: z.string().min(1, { message: "Vui lòng chọn thể loại" }),
  image: z.string().min(1, { message: "Vui lòng nhập đường dẫn ảnh" }),
  description: z.string().optional(),
});
