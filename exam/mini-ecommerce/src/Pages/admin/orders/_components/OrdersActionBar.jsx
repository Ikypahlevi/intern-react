import React, { useState } from "react";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";
import ConfirmModal from "../../../../Components/admin/ConfirmModal";
import { exportToExcel } from "../../../../Utils/excel";
import { toast } from "sonner";

export default function OrdersActionBar({ orders, activeTab, setActiveTab }) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const tabs = [
    {
      id: "all",
      label: "Tất cả",
      count: orders.length,
      color: "bg-black text-white",
    },
    {
      id: "pending",
      label: "Chờ duyệt",
      count: orders.filter((o) => o.status === "pending").length,
      color: "bg-red-600 text-white",
    },
    {
      id: "shipping",
      label: "Đang giao",
      count: orders.filter((o) => o.status === "shipping").length,
      color: "bg-blue-400 text-black",
    },
    {
      id: "completed",
      label: "Hoàn thành",
      count: orders.filter((o) => o.status === "completed").length,
      color: "bg-green-500 text-black",
    },
    {
      id: "cancelled",
      label: "Hủy / Hoàn",
      count: orders.filter((o) => o.status === "cancelled").length,
      color: "bg-gray-400 text-black",
    },
  ];

  const handleConfirmExport = () => {
    const exportData = orders.map((o) => ({
      "Mã Đơn Hàng": o.id,
      "Tên Khách Hàng": o.customerName,
      "SĐT": o.phone,
      "Địa chỉ": o.address,
      "Tổng Tiền (VNĐ)": o.totalAmount,
      "Trạng Thái": o.status,
      "Ngày Đặt": new Date(o.createdAt).toLocaleString(),
    }));
    exportToExcel(
      exportData,
      `Danh_Sach_Don_Hang_${new Date().toISOString().slice(0, 10)}`,
    );
    toast.success("Xuất file Excel thành công!");
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-gray-100 border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b] font-bubble">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border-[2px] border-black font-comic text-sm uppercase shadow-[2px_2px_0px_#1c1b1b] whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-yellow-300 text-black"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`font-comic text-[10px] px-1.5 py-0.5 border border-black ${tab.color}`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <AdminPopButton variant="secondary" icon="fa-solid fa-print">
            In phiếu giao
          </AdminPopButton>
          <AdminPopButton
            variant="outline"
            icon="fa-solid fa-table-view"
            onClick={() => setIsExportModalOpen(true)}
          >
            Xuất Excel
          </AdminPopButton>
        </div>
      </section>

      <ConfirmModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onConfirm={handleConfirmExport}
        title="XÁC NHẬN XUẤT EXCEL"
        message={`Hệ thống sẽ xuất danh sách gồm ${orders.length} đơn hàng ra file Excel. Bạn có muốn tiếp tục?`}
        confirmText="XUẤT EXCEL"
        cancelText="HỦY"
        isDanger={false}
      />
    </>
  );
}
