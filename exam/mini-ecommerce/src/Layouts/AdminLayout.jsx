import { Outlet } from "react-router-dom";
import { useAuthStore } from "../Stores/authStore";

export default function AdminLayout() {
  const { logout } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">Quản lý Sản phẩm</div>
          <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">Quản lý Tài khoản</div>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-semibold"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
