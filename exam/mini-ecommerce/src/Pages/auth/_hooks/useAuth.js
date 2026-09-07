import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../Stores/authStore";
import { toast } from "sonner";

export const useAuth = () => {
  const navigate = useNavigate();
  const loginToStore = useAuthStore((state) => state.login);

  // Mặc định tài khoản admin
  const DEFAULT_ADMIN = {
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    name: "Quản trị viên",
  };

  const handleLogin = (data) => {
    const { email, password } = data;

    // 1. Kiểm tra tài khoản Admin mặc định
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      loginToStore({ email, role: "admin", name: DEFAULT_ADMIN.name });
      toast.success("Đăng nhập Admin thành công!");
      navigate("/admin");
      return;
    }

    // 2. Kiểm tra tài khoản thường trong LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem("mock_users") || "[]");
    const user = storedUsers.find((u) => u.email === email);

    if (!user) {
      toast.error("Tài khoản không tồn tại!");
      return;
    }

    if (user.password !== password) {
      toast.error("Mật khẩu không chính xác!");
      return;
    }

    // Đăng nhập thành công
    loginToStore({ email: user.email, role: "customer", name: user.name || "Khách" });
    toast.success("Đăng nhập thành công!");
    navigate("/");
  };

  const handleRegister = (data) => {
    const { email, password, name } = data;
    const storedUsers = JSON.parse(localStorage.getItem("mock_users") || "[]");

    // Kiểm tra trùng email
    if (storedUsers.some((u) => u.email === email) || email === DEFAULT_ADMIN.email) {
      toast.error("Email này đã được sử dụng!");
      return;
    }

    // Lưu user mới vào danh sách
    const newUser = { email, password, name, role: "customer" };
    storedUsers.push(newUser);
    localStorage.setItem("mock_users", JSON.stringify(storedUsers));

    toast.success("Đăng ký thành công! Đang tự động đăng nhập...");
    // Đăng nhập luôn sau khi đăng ký
    loginToStore({ email: newUser.email, role: newUser.role, name: newUser.name });
    navigate("/");
  };

  return { handleLogin, handleRegister };
};
