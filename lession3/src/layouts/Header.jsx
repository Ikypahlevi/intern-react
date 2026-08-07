import React from "react";

export const Header = ({ toggleMobileSidebar, isDesktopExpanded, setIsDesktopExpanded }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shrink-0 shadow-sm">
      
      {/* Left side: Hamburger (Mobile Only) + Search */}
      <div className="flex items-center flex-1 max-w-md gap-4">
        
        {/* Hamburger Menu (Hiện trên Mobile, và hiện trên Desktop NẾU sidebar bị ẩn) */}
        <button 
          onClick={() => {
            toggleMobileSidebar();
            setIsDesktopExpanded(!isDesktopExpanded);
          }}
          className={`${isDesktopExpanded ? "md:hidden" : "md:block"} text-slate-500 hover:text-indigo-600 transition-colors p-1`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {/* Right side: Noti + Avatar */}
      <div className="flex items-center gap-4 sm:gap-6 pl-4">
        
        {/* Notifications */}
        <button className="relative text-slate-500 hover:text-indigo-600 transition-colors p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e0e7ff"
            alt="Avatar"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-slate-200 group-hover:border-indigo-300 transition-colors"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-slate-700 leading-tight">Nguyễn Văn A</p>
            <p className="text-xs font-medium text-slate-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
};
