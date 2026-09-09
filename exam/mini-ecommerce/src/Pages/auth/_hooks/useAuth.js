import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../Stores/authStore";
import { toast } from "sonner";
import api from "../../../Services/api";
import { ROLES } from "../../../Constants";

export const useAuth = () => {
  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);

  // Tài khoản admin mặc định (hardcode để luôn có thể đăng nhập)
  const DEFAULT_ADMIN = {
    email: "admin@gmail.com",
    password: "admin123",
    role: ROLES.ADMIN,
    name: "Quản trị viên",
  };

  const handleLogin = async (data) => {
    const { email, password } = data;

    // 1. Kiểm tra tài khoản Admin mặc định trước
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      loginToStore({ email, role: ROLES.ADMIN, name: DEFAULT_ADMIN.name });
      toast.success("Đăng nhập Admin thành công!");
      navigate("/admin");
      return;
    }

    // 2. Kiểm tra tài khoản trong db.json (json-server)
    try {
      const users = await api.get(`/users?email=${encodeURIComponent(email)}`);

      if (!users || users.length === 0) {
        toast.error("Tài khoản không tồn tại!");
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        toast.error("Mật khẩu không chính xác!");
        return;
      }

      if (user.status === "locked") {
        toast.error("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên!");
        return;
      }

      // Đăng nhập thành công
      loginToStore({
        id: user.id,
        email: user.email,
        role: user.role || ROLES.CUSTOMER,
        name: user.name || "Khách",
      });
      toast.success(`Chào mừng trở lại, ${user.name || "Anh/Chị"}! 🎉`);
      navigate("/");
    } catch (error) {
      toast.error("Lỗi kết nối máy chủ. Vui lòng thử lại!");
    }
  };

  const handleRegister = async (data) => {
    const { email, password, name } = data;

    // Không cho phép đăng ký email của admin mặc định
    if (email === DEFAULT_ADMIN.email) {
      toast.error("Email này đã được sử dụng!");
      return;
    }

    try {
      // Kiểm tra email đã tồn tại trong db.json chưa
      const existing = await api.get(`/users?email=${encodeURIComponent(email)}`);

      if (existing && existing.length > 0) {
        toast.error("Email này đã được sử dụng!");
        return;
      }

      // Tạo user mới trong db.json
      const newUser = {
        email,
        password,
        name,
        role: ROLES.CUSTOMER,
        status: "active",
        phone: "",
        nickname: "",
      };

      const createdUser = await api.post("/users", newUser);

      toast.success("Đăng ký thành công! Đang tự động đăng nhập... 🎉");

      // Đăng nhập luôn sau khi đăng ký
      loginToStore({
        id: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
        name: createdUser.name,
      });
      navigate("/");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return { handleLogin, handleRegister };
};
