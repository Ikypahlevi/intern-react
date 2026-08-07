import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AdminLayout = ({ children }) => {
  // Trạng thái thu gọn/mở rộng Sidebar trên Desktop
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  
  // Trạng thái bật/tắt Sidebar trên Mobile (Drawer)
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Khóa cuộn trang khi mở menu trên mobile
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      
      <Sidebar 
        isDesktopExpanded={isDesktopExpanded} 
        setIsDesktopExpanded={setIsDesktopExpanded}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header 
          toggleMobileSidebar={() => setIsMobileOpen(true)}
          isDesktopExpanded={isDesktopExpanded}
          setIsDesktopExpanded={setIsDesktopExpanded}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
