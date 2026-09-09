import React, { useState, useMemo } from "react";
import { useGetUsers } from "../../../Services/queries/useUsers";
import { useGetOrders } from "../../../Services/queries/useOrders";

import UsersHeader from "./_components/UsersHeader";
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
      <UsersHeader totalUsers={usersWithSpend.length} />
      
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
