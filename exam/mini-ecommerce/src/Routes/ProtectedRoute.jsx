import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../Stores/authStore";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ProtectedRoute({ requireAdmin = false }) {
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated) return; // Chờ hydration xong mới kiểm tra
    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để truy cập trang này!");
    } else if (requireAdmin && user?.role !== "admin") {
      toast.error("Bạn không có quyền truy cập trang quản trị!");
    }
  }, [isAuthenticated, requireAdmin, user, _hasHydrated]);

  // Đang chờ Zustand đọc xong dữ liệu từ localStorage → không redirect vội
  if (!_hasHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
