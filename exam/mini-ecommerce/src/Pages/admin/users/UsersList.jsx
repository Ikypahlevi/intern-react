import React, { useState, useMemo } from "react";
import { useGetUsers } from "../../../Services/queries/useUsers";
import { useGetOrders } from "../../../Services/queries/useOrders";

import AdminPageHeader from "../../../Components/admin/AdminPageHeader";
import UsersActionBar from "./_components/UsersActionBar";
import UsersTable from "./_components/UsersTable";
import UserDrawer from "./_components/UserDrawer";

export default function UsersList() {
  const { data: users = [], isLoading: loadingUsers } = useGetUsers();
  const { data: orders = [], isLoading: loadingOrders } = useGetOrders();

  const [activeTab, setActiveTab] = useState("all"); // 'all', 'customers', 'admins', 'locked'
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    id: "",
    name: "",
    contact: "",
    role: "ALL",
    status: "ALL",
    spend: "ALL",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Combine users with their total spend based on orders
  const usersWithSpend = useMemo(() => {
    return users.map((user) => {
      const userOrders = orders.filter((o) => o.userId === user.id && o.status !== "cancelled");
      const totalSpend = userOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      return { ...user, totalSpend, orderCount: userOrders.length };
    });
  }, [users, orders]);

  // Filtering logic
  const filteredUsers = useMemo(() => {
    return usersWithSpend.filter((user) => {
      // 1. Tab filter
      if (activeTab === "customers" && user.role !== "customer") return false;
      if (activeTab === "admins" && user.role !== "admin") return false;
      if (activeTab === "locked" && user.status !== "locked") return false;

      // 2. Global search
      if (globalSearch) {
        const searchStr = globalSearch.toLowerCase();
        const fullText = `${user.id} ${user.name} ${user.email} ${user.phone || ""} ${user.nickname || ""}`.toLowerCase();
        if (!fullText.includes(searchStr)) return false;
      }

      // 3. Column filters
      if (columnFilters.id && !user.id.toString().includes(columnFilters.id)) return false;
      
      if (columnFilters.name) {
        const nameText = `${user.name} ${user.nickname || ""}`.toLowerCase();
        if (!nameText.includes(columnFilters.name.toLowerCase())) return false;
      }
      
      if (columnFilters.contact) {
        const contactText = `${user.email} ${user.phone || ""}`.toLowerCase();
        if (!contactText.includes(columnFilters.contact.toLowerCase())) return false;
      }
      
      if (columnFilters.role !== "ALL" && user.role !== columnFilters.role) return false;
      if (columnFilters.status !== "ALL" && user.status !== columnFilters.status) return false;
      
      if (columnFilters.spend !== "ALL") {
        if (columnFilters.spend === "TOP" && user.totalSpend < 10000000) return false;
        if (columnFilters.spend === "MID" && (user.totalSpend < 5000000 || user.totalSpend >= 10000000)) return false;
        if (columnFilters.spend === "LOW" && user.totalSpend >= 1000000) return false;
      }

      return true;
    });
  }, [usersWithSpend, activeTab, globalSearch, columnFilters]);

  // Tab counts
  const tabCounts = {
    all: usersWithSpend.length,
    customers: usersWithSpend.filter(u => u.role === "customer").length,
    admins: usersWithSpend.filter(u => u.role === "admin").length,
    locked: usersWithSpend.filter(u => u.status === "locked").length,
  };

  const kpiBlocks = useMemo(() => {
    return [
      {
        label: "Tổng thành viên",
        value: usersWithSpend.length,
        trend: "up",
        trendLabel: "+12 tuần này",
        trendColor: "text-green-600",
        bgColor: "bg-gray-100",
        labelColor: "text-gray-600"
      },
      {
        label: "Đang Online",
        value: "142",
        trend: "live",
        trendLabel: "Trực tiếp",
        trendColor: "text-black",
        bgColor: "bg-comic-yellow",
        labelColor: "text-black"
      }
    ];
  }, [usersWithSpend.length]);

  const handleOpenDrawer = (user = null) => {
    setEditingUser(user);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setEditingUser(null);
    setIsDrawerOpen(false);
  };

  if (loadingUsers || loadingOrders) {
    return <div className="font-comic text-2xl animate-pulse p-10">ĐANG TẢI DỮ LIỆU...</div>;
  }

  return (
    <div className="flex flex-col w-full pb-12 gap-8 max-w-7xl mx-auto font-bubble">
      <AdminPageHeader 
        title="QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN"
        description="Quản lý tổng quan dữ liệu thành viên, cấp phép vai trò và khóa tài khoản vi phạm."
        iconClass="fa-users"
        versionTag="Otaku Core v2.4"
        kpiBlocks={kpiBlocks}
      >
        <div className="relative bg-red-600 text-white px-6 py-2 border-[3px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-between overflow-hidden mb-4">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bullhorn text-comic-yellow text-xl"></i>
            <span className="font-comic text-sm uppercase tracking-wider font-bold">Lưu ý quản trị:</span>
            <span className="font-bold text-sm">Chỉ Admin mới có quyền truy cập và thay đổi cấu hình tài khoản.</span>
          </div>
        </div>
      </AdminPageHeader>
      
      <div className="flex flex-col gap-4">
        <UsersActionBar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          tabCounts={tabCounts}
          globalSearch={globalSearch}
          setGlobalSearch={setGlobalSearch}
          onOpenAdd={() => handleOpenDrawer(null)}
          filteredUsers={filteredUsers}
        />
        
        <UsersTable 
          users={filteredUsers}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          onEditUser={handleOpenDrawer}
        />
      </div>

      {isDrawerOpen && (
        <UserDrawer 
          user={editingUser} 
          onClose={handleCloseDrawer} 
        />
      )}
    </div>
  );
}
