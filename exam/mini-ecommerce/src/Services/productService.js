import api from "./api";
import axios from "axios";

const baseURL = api.defaults.baseURL || import.meta.env.VITE_API_URL || "https://mini-ecommerce-oo3t.onrender.com";

export const productService = {
  // Lấy danh sách sản phẩm (không phân trang)
  getAll: async () => {
    return await api.get("/products");
  },
  
  // Lấy danh sách sản phẩm (CÓ PHÂN TRANG)
  getPaginated: async (params) => {
    // Dùng axios thuần để lấy được headers (x-total-count) do api instance đã intercept response.data
    const response = await axios.get(`${baseURL}/products`, { 
      params,
      timeout: 60000 
    });
    return {
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || 0, 10),
    };
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

