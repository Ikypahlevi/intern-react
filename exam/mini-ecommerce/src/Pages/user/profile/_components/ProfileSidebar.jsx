import React from "react";
import { useAuthStore } from "../../../../Stores/authStore";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <aside className="lg:col-span-3">
      <div className="bg-white border-[3px] border-black shadow-comic p-6 flex flex-col items-center text-center relative">
        <div className="absolute -top-3 -right-2 bg-comic-red text-white font-comic text-xs px-3 py-1 border-2 border-black rotate-6 shadow-comic-sm uppercase tracking-wider font-black">
          {user?.role === "admin" ? "ADMIN" : "OTAKU HERO"}
        </div>
        
        <div className="w-28 h-28 rounded-xl bg-comic-yellow border-[3px] border-black p-1 shadow-comic mb-3 relative">
          <div className="w-full h-full overflow-hidden rounded-lg border-2 border-black bg-white relative flex items-center justify-center">
            {user?.avatar ? (
              <img alt="Avatar" className="w-full h-full object-cover" src={user.avatar} />
            ) : (
              <i className="fa-solid fa-user text-4xl text-gray-400"></i>
            )}
            <div className="absolute bottom-0 right-0 bg-black text-comic-yellow px-1 text-[9px] font-comic font-black uppercase">
              ONLINE
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-comic text-black tracking-wide leading-none uppercase font-black">
          {user?.name || "Người dùng"}
        </h2>
        <span className="inline-block bg-yellow-100 border border-black px-2 py-0.5 mt-1.5 mb-2 font-bold text-xs text-black tracking-tight font-bubble">
          {user?.email}
        </span>

        <nav className="w-full space-y-2 font-comic text-xs uppercase tracking-wider font-black mt-4">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-between px-3 py-2 border-2 border-black shadow-comic-sm transition-colors ${
              activeTab === 'profile' ? "bg-green-500 text-white" : "bg-white text-black hover:bg-comic-yellow"
            }`}
          >
            <span className="flex items-center gap-2">
              <i className={`fa-solid fa-bolt ${activeTab === 'profile' ? "text-comic-yellow" : "text-black"}`}></i> Thông Tin Hồ Sơ
            </span>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-3 py-2 border-2 border-black shadow-comic-sm transition-colors ${
              activeTab === 'orders' ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-comic-yellow"
            }`}
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-box"></i> Lịch Sử Đơn Hàng
            </span>
            {user?.orders?.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-none font-bold ${
                activeTab === 'orders' ? "bg-white text-black" : "bg-black text-white"
              }`}>
                {user.orders.length}
              </span>
            )}
          </button>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2 bg-red-100 text-comic-red hover:bg-comic-red hover:text-white border-2 border-black shadow-comic-sm transition-colors mt-4"
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất
            </span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
