import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../Stores/authStore";

export default function GuestRoute() {
  const { isAuthenticated } = useAuthStore();

  // Đang đăng nhập rồi thì không cho vào trang Login/Register nữa
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
