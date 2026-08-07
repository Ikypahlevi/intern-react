import React from "react";
import { Table } from "../components/ui/table";

export const Dashboard = () => {
  // Dữ liệu cho Grid Thống kê
  const stats = [
    { title: "Tổng Doanh Thu", value: "$45,231.89", change: "+20.1%", trend: "up", icon: "💰" },
    { title: "Người dùng mới", value: "+2350", change: "+180.1%", trend: "up", icon: "👥" },
    { title: "Đơn hàng", value: "+12,234", change: "+19%", trend: "up", icon: "📦" },
    { title: "Tỷ lệ chuyển đổi", value: "3.2%", change: "-1.1%", trend: "down", icon: "📈" },
  ];

  // Cấu hình cột cho Bảng Giao Dịch
  const tableColumns = [
    { title: "Mã GD", dataIndex: "id", render: (text) => <span className="font-mono text-slate-500">{text}</span> },
    { title: "Khách hàng", dataIndex: "customer", render: (text) => <span className="font-semibold text-slate-800">{text}</span> },
    { title: "Số tiền", dataIndex: "amount", render: (amount) => <span className="font-bold text-slate-800">${amount}</span> },
    { title: "Trạng thái", dataIndex: "status", render: (status) => (
      <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
        status === "Thành công" ? "bg-emerald-100 text-emerald-700" :
        status === "Đang xử lý" ? "bg-amber-100 text-amber-700" :
        "bg-red-100 text-red-700"
      }`}>
        {status}
      </span>
    ) },
    { title: "Ngày", dataIndex: "date", render: (date) => <span className="text-slate-500 text-sm">{date}</span> },
  ];

  // Dữ liệu mẫu cho Bảng
  const transactions = [
    { id: "TRX-1029", customer: "Olivia Martin", amount: "1,999.00", status: "Thành công", date: "Hôm nay, 14:30" },
    { id: "TRX-1028", customer: "Jackson Lee", amount: "39.00", status: "Đang xử lý", date: "Hôm nay, 13:15" },
    { id: "TRX-1027", customer: "Isabella Nguyen", amount: "299.00", status: "Thành công", date: "Hôm qua, 09:42" },
    { id: "TRX-1026", customer: "William Kim", amount: "99.00", status: "Thất bại", date: "Hôm qua, 18:20" },
    { id: "TRX-1025", customer: "Sofia Davis", amount: "39.00", status: "Thành công", date: "05/08/2026" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Tổng quan (Dashboard)</h2>
        <p className="text-slate-500">Xem thống kê kinh doanh và các giao dịch mới nhất.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500">{stat.title}</span>
              <span className="text-xl bg-slate-50 w-8 h-8 flex items-center justify-center rounded-lg">{stat.icon}</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <p className={`text-xs font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                {stat.change} <span className="text-slate-400 font-normal">so với tháng trước</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Giao dịch gần đây</h3>
          <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-800">Xem tất cả →</button>
        </div>
        <div className="p-0">
          <Table columns={tableColumns} data={transactions} />
        </div>
      </div>
    </div>
  );
};
