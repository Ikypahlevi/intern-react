import React from "react";

export default function SettingsTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "general", icon: "fa-store", label: "1. Thông tin chung & Thương hiệu" },
    { id: "payment", icon: "fa-wallet", label: "2. Cổng thanh toán & Ngân hàng" },
    { id: "shipping", icon: "fa-truck-fast", label: "3. Đối tác vận chuyển & Đóng gói" },
    { id: "security", icon: "fa-shield-halved", label: "4. An ninh & Sao lưu" },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-10 border-b-[2px] border-black font-bubble">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 border-[2px] border-black font-comic text-[16px] font-bold uppercase tracking-wider shrink-0 transition-all ${
            activeTab === tab.id
              ? "bg-comic-yellow text-black shadow-[3px_3px_0px_#000] hover:translate-y-[-1px]"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <i className={`fa-solid ${tab.icon} text-[16px]`}></i>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
