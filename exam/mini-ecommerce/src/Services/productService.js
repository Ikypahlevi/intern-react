import api from "./api";

export const productService = {
  // Lấy danh sách sản phẩm
  getAll: async () => {
    return await api.get("/products");
  },
  // Lấy chi tiết 1 sản phẩm
  getById: async (id) => {
    return await api.get(`/products/${id}`);
  },
  // Thêm mới (Dành cho admin)
  create: async (data) => {
    return await api.post("/products", data);
  },
  // Cập nhật (Dành cho admin)
  update: async (id, data) => {
    return await api.patch(`/products/${id}`, data);
  },
  // Xóa (Dành cho admin)
  delete: async (id) => {
    return await api.delete(`/products/${id}`);
  },
};
