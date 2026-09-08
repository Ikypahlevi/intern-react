import axios from "axios";

// Khởi tạo instance của Axios
const api = axios.create({
  // Chuyển sang dùng JSON-Server local
  baseURL: "http://localhost:8000",
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
