import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../Stores/authStore";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      path: "/admin/overview",
      icon: "fa-solid fa-chart-line",
      label: "Tổng quan",
    },
    { path: "/admin/products", icon: "fa-solid fa-book", label: "Sản phẩm" },
    { path: "/admin/users", icon: "fa-solid fa-users", label: "Tài khoản" },
    { path: "/admin/orders", icon: "fa-solid fa-truck", label: "Đơn hàng" },
    // { path: "/admin/promotions", icon: "fa-solid fa-tag", label: "Khuyến mãi" },
    { path: "/admin/settings", icon: "fa-solid fa-gear", label: "Cài đặt" },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r-[3px] border-black z-50 flex flex-col justify-between overflow-y-auto font-bubble transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex flex-col">
        <div className="p-4 border-b-[3px] border-black bg-comic-yellow flex flex-col gap-2 shadow-[0_3px_0px_#000]">
          <div className="flex items-center justify-between">
            <span className="font-comic text-xl uppercase tracking-tight text-black flex items-center gap-1">
              <i className="fa-solid fa-bolt text-red-600 font-bold"></i>SWOO!
              MANGA
            </span>
            <span className="bg-black text-comic-yellow font-comic text-[10px] px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_#ba002a]">
              HQ v2
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white text-black border border-black font-comic text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold shadow-[2px_2px_0px_#000]">
              ADMIN PORTAL ⚡
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-2 p-3 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 border-[2px] transition-all font-bold ${
                  isActive
                    ? "bg-comic-yellow text-black border-black shadow-[3px_3px_0px_#000]"
                    : "border-transparent text-gray-700 hover:bg-gray-100 hover:border-black hover:shadow-[2px_2px_0px_#000]"
                }`}
              >
                <i className={item.icon}></i>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t-[3px] border-black bg-gray-50">
        <div className="bg-white border-[2px] border-black p-2 shadow-[3px_3px_0px_#000] mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-none border-[2px] border-black bg-comic-yellow flex items-center justify-center font-comic text-sm text-black">
              {user?.name?.substring(0, 2).toUpperCase() || "AD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-comic text-sm text-black truncate">
                {user?.name || "Oda Master"}
              </p>
              <p className="font-comic text-[10px] text-red-600 uppercase font-bold">
                Super Admin ★
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-comic text-sm py-2 px-3 border-[2px] border-black shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all uppercase"
        >
          <span>Đăng xuất</span>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </aside>
  );
}
