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

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="bg-[#fcf9f8] min-h-screen text-black antialiased selection:bg-yellow-400 relative lg:grid lg:grid-cols-[256px_1fr]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Column */}
      <div className="flex flex-col min-w-0 w-full transition-all duration-300">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="relative w-full p-2 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

