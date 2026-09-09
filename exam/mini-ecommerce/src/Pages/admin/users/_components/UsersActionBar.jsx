import React from "react";
import { useUpdateUser } from "../../../../Services/queries/useUsers";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";

export default function UsersActionBar({ 
  activeTab, 
  setActiveTab, 
  tabCounts,
  globalSearch,
  setGlobalSearch,
  onOpenAdd,
  filteredUsers
}) {
  const updateUserMutation = useUpdateUser();

  const handleBulkLock = () => {
    // In a real app, we'd have a selected IDs array state.
    // For this mockup, we'll just alert that bulk lock is available via checkboxes.
    alert("Tính năng khóa hàng loạt sẽ kích hoạt khi chọn các checkbox dưới bảng.");
  };

  const tabs = [
    { id: "all", label: "Tất Cả", count: tabCounts.all, bg: "bg-black text-white" },
    { id: "customers", label: "Khách hàng", count: tabCounts.customers, bg: "bg-white text-black" },
    { id: "admins", label: "Quản trị viên", count: tabCounts.admins, bg: "bg-blue-200 text-black" },
    { id: "locked", label: "Đang bị khóa 🔒", count: tabCounts.locked, bg: "bg-red-200 text-red-800" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 border-[3px] border-black p-3 shadow-[3px_3px_0px_#000]">
        <div className="flex flex-wrap items-center gap-2">
          <AdminPopButton 
            variant="primary" 
            icon="fa-solid fa-user-plus" 
            onClick={onOpenAdd}
          >
            Thêm Tài Khoản Mới ⚡
          </AdminPopButton>
          
          <AdminPopButton 
            variant="danger" 
            icon="fa-solid fa-lock" 
            onClick={handleBulkLock}
          >
            Khóa Đã Chọn
          </AdminPopButton>
        </div>

        {/* Quick Search Global Filter */}
        <div className="flex items-center gap-2 bg-white border-[2px] border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] min-w-[280px]">
          <i className="fa-solid fa-filter text-gray-500"></i>
          <input 
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full bg-transparent outline-none font-bold text-sm text-black placeholder:text-gray-400"
            placeholder="Lọc nhanh toàn bộ bảng..." 
            type="text"
          />
          {globalSearch && (
            <button onClick={() => setGlobalSearch("")} className="font-comic text-[10px] text-red-600 font-bold uppercase hover:underline">Xóa</button>
          )}
        </div>
      </div>

      {/* Account Role Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white border-[3px] border-black p-2 shadow-[3px_3px_0px_#000] overflow-x-auto">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-comic text-sm px-4 py-2 flex items-center gap-2 border-[2px] border-black transition-all font-black uppercase ${
              activeTab === tab.id 
                ? `${tab.bg} shadow-[2px_2px_0px_#000]` 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent hover:border-black"
            }`}
          >
            <span>{tab.label}</span>
            <span className={`font-bubble text-[11px] px-1.5 py-0.5 border border-black font-bold ${activeTab === tab.id ? 'bg-white text-black' : 'bg-gray-300 text-black'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
