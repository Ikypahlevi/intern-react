import axios from "axios";

// Khởi tạo instance của Axios
const api = axios.create({
  // URL của MockAPI.io thực tế
  baseURL: "https://6a9a91509a7ec1b817d25de8.mockapi.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Có thể thêm Request/Response Interceptor ở đây nếu cần (Giai đoạn 4)
api.interceptors.request.use(
  (config) => {
    // Ví dụ: đính kèm token nếu cần
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Xử lý lỗi tập trung
    return Promise.reject(error);
  },
);

export default api;
