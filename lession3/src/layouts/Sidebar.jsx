import React from "react";

export const Sidebar = ({ isDesktopExpanded, setIsDesktopExpanded, isMobileOpen, setIsMobileOpen }) => {
  const menuItems = [
    { name: "Tổng quan", icon: "📊" },
    { name: "Người dùng", icon: "👥" },
    { name: "Giao dịch", icon: "💳" },
    { name: "Cài đặt", icon: "⚙️" },
  ];

  return (
    <>
      {/* 
        OVERLAY (Chỉ hiện trên Mobile khi mở Sidebar)
        Khi bấm vào màn đen này, Sidebar sẽ đóng lại.
      */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* SIDEBAR MAIN */}
      <aside
        className={`
          fixed md:relative z-50 h-full bg-slate-900 text-white flex flex-col border-r border-slate-800 transition-all duration-300 ease-in-out
          
          /* RESPONSIVE TRÊN MOBILE: Trượt ra/vào */
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 
          
          /* RESPONSIVE TRÊN DESKTOP: Luôn hiện, chỉ đổi width (0 hoặc 64) */
          md:translate-x-0
          ${isDesktopExpanded ? "md:w-64" : "md:w-0 md:border-none md:overflow-hidden"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-500/30">
              A
            </div>
            <span
              className={`font-bold text-lg tracking-wide transition-opacity duration-300 ${
                !isDesktopExpanded ? "md:opacity-0 md:hidden" : "opacity-100"
              }`}
            >
              AdminPro
            </span>
          </div>

          {/* Nút thu gọn Sidebar trên Desktop (Ẩn trên Mobile) */}
          <button
            onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
            className="hidden md:block text-slate-400 hover:text-white transition-colors p-1"
          >
            {isDesktopExpanded ? (
              // Icon Chevron Left (Khi đang mở rộng)
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              // Icon Chevron Right (Khi đang thu gọn)
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>

          {/* Nút Đóng (X) trên Mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-slate-400 hover:text-white transition-colors p-1 bg-slate-800 rounded-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-200 group"
            >
              <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
              <span
                className={`font-medium whitespace-nowrap transition-opacity duration-300 ${
                  !isDesktopExpanded ? "md:opacity-0 md:hidden" : "opacity-100"
                }`}
              >
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <button className="flex items-center justify-center md:justify-start gap-4 px-3 py-2.5 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors w-full group">
            <span className="text-xl shrink-0 group-hover:-translate-x-1 transition-transform">🚪</span>
            <span
              className={`font-medium whitespace-nowrap transition-opacity duration-300 ${
                !isDesktopExpanded ? "md:opacity-0 md:hidden" : "opacity-100"
              }`}
            >
              Đăng xuất
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
