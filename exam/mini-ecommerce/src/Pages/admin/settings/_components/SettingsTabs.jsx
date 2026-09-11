import React from "react";

export default function SettingsTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "general", icon: "fa-store", label: "1. Thông tin chung & Thương hiệu" },
    { id: "payment", icon: "fa-wallet", label: "2. Cổng thanh toán & Ngân hàng" },
    { id: "shipping", icon: "fa-truck-fast", label: "3. Đối tác vận chuyển & Đóng gói" },
    { id: "security", icon: "fa-shield-halved", label: "4. An ninh & Sao lưu" },
  ];

  return (
    <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs mb-space-xl border-b-[2px] border-on-background font-bubble">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-space-2xs px-space-md py-space-xs border-[2px] border-on-background font-headline-sm text-[16px] font-bold uppercase tracking-wider shrink-0 transition-all ${
            activeTab === tab.id
              ? "bg-primary-container text-on-background shadow-[3px_3px_0px_#1c1b1b] hover:translate-y-[-1px]"
              : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <i className={`fa-solid ${tab.icon} text-[16px]`}></i>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
