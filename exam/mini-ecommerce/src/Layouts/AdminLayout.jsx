import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { useAuthStore } from "../Stores/authStore";

export default function AdminLayout() {
  const { user } = useAuthStore();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-[#fcf9f8] min-h-screen text-black antialiased selection:bg-yellow-400">
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <main className="relative pt-16 w-full min-h-screen p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
