import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { useAuthStore } from "../Stores/authStore";

export default function AdminLayout() {
  const { user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="bg-[#fcf9f8] min-h-screen text-black antialiased selection:bg-yellow-400 relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="pl-0 lg:pl-64 transition-all duration-300">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="relative pt-16 w-full min-h-screen p-2 sm:p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
