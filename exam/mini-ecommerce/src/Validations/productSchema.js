import * as z from 'zod';
import { STATUS } from "../Constants";

export const productSchema = z.object({
  sku: z.string().min(1, "Mã SKU không được bỏ trống"),
  name: z.string().min(2, "Tên truyện phải có ít nhất 2 ký tự"),
  author: z.string().optional(),
  publisher: z.string().min(1, "Vui lòng chọn nhà xuất bản"),
  category: z.string().min(1, "Vui lòng chọn thể loại"),
  format: z.string().min(1, "Vui lòng chọn định dạng"),
  price: z.coerce.number().positive("Giá bán phải lớn hơn 0"),
  originalPrice: z.coerce.number().min(0, "Giá bìa không hợp lệ"),
  stock: z.coerce.number().min(0, "Tồn kho không được âm"),
  status: z.enum([STATUS.ACTIVE, STATUS.NEW, STATUS.PREORDER, STATUS.PAUSED, STATUS.OUT_OF_STOCK]),
  image: z.string().optional(),
});