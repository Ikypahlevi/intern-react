import { useState } from "react";
import { Button } from "../../../../test-playground/src/components/button";
import { Input } from "../../../../test-playground/src/components/input";
import { Select } from "../../../../test-playground/src/components/select";
import { Modal } from "../../../../test-playground/src/components/modal";
import { Table } from "../../../../test-playground/src/components/table";

export default function AdminDashboard() {
  // 1. STATE QUẢN LÝ GIAO DIỆN
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Đóng/Mở Sidebar
  const [isModalOpen, setIsModalOpen] = useState(false); // Đóng/Mở Modal xuất báo cáo

  // 2. DỮ LIỆU BẢNG GIAO DỊCH (Dùng cho Table Component)
  const transactionData = [
    {
      id: "GD001",
      customer: "Nguyễn Văn A",
      amount: "500,000đ",
      date: "29/07/2026",
      status: "Hoàn thành",
    },
    {
      id: "GD002",
      customer: "Trần Thị B",
      amount: "1,200,000đ",
      date: "29/07/2026",
      status: "Đang xử lý",
    },
    {
      id: "GD003",
      customer: "Lê Văn C",
      amount: "350,000đ",
      date: "28/07/2026",
      status: "Đã hủy",
    },
  ];

  const transactionColumns = [
    { title: "Mã GD", dataIndex: "id" },
    { title: "Khách hàng", dataIndex: "customer" },
    { title: "Số tiền", dataIndex: "amount" },
    { title: "Ngày", dataIndex: "date" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => {
        // Tùy biến màu sắc Trạng thái
        let color = "bg-gray-100 text-gray-700";
        if (text === "Hoàn thành") color = "bg-green-100 text-green-700";
        if (text === "Đang xử lý") color = "bg-blue-100 text-blue-700";
        if (text === "Đã hủy") color = "bg-red-100 text-red-700";
        return (
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${color}`}>
            {text}
          </span>
        );
      },
    },
    {
      title: "Thao tác",
      render: () => (
        <Button size="sm" variant="outline">
          Chi tiết
        </Button>
      ), // Dùng Button Component
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* ================= 1. SIDEBAR (THANH BÊN TRÁI) ================= */}
      {/* Nếu isSidebarOpen = true thì rộng 64 (256px), false thì rộng 20 (80px) */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"} 
        bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-2xl relative z-20`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          <span className="text-2xl font-black text-green-400 tracking-wider">
            {isSidebarOpen ? "THEGIOIDUA 🥥" : "🥥"}
          </span>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 p-4 space-y-2">
          {["Tổng quan", "Đơn hàng", "Khách hàng", "Kho hàng"].map(
            (item, idx) => (
              <a
                key={idx}
                href="#"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
              >
                <span className="text-xl">📊</span>
                {/* Giấu chữ đi nếu sidebar bị thu gọn */}
                <span
                  className={`${!isSidebarOpen && "hidden"} font-medium whitespace-nowrap`}
                >
                  {item}
                </span>
              </a>
            ),
          )}
        </nav>
      </aside>

      {/* ================= 2. KHU VỰC BÊN PHẢI (HEADER + NỘI DUNG) ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* --- HEADER --- */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            {/* Nút Hamburger để thu gọn/mở rộng Sidebar */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              🍔
            </button>

            {/* Thanh Tìm kiếm (Dùng Input Component) */}
            <div className="w-64 pt-4">
              {" "}
              {/* pt-4 để bù trừ cái mb-4 bẩm sinh của Input component */}
              <Input icon="🔍" placeholder="Tìm mã đơn hàng..." />
            </div>
          </div>

          {/* Avatar & Thông báo */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              🔔{" "}
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Admin"
                className="w-9 h-9 rounded-full ring-2 ring-green-500"
              />
              <span className="font-medium text-slate-700 hidden sm:block">
                Sếp Tổng
              </span>
            </div>
          </div>
        </header>

        {/* --- MAIN CONTENT (NỘI DUNG DASHBOARD) --- */}
        {/* Cho phép cuộn nếu nội dung dài (overflow-y-auto) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Tổng quan kinh doanh
              </h1>
              <p className="text-slate-500">Cập nhật lúc: 10:22 AM - Hôm nay</p>
            </div>

            {/* Nút bấm gọi Modal (Dùng Button Component) */}
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              icon="⬇️"
            >
              Xuất Báo Cáo
            </Button>
          </div>

          {/* --- KHỐI THỐNG KÊ (GRID) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Tổng Doanh Thu
                </p>
                <h3 className="text-3xl font-bold text-slate-800">45.2 Tr</h3>
                <p className="text-green-500 text-sm font-medium mt-2">
                  ↑ +12% so với tháng trước
                </p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                💰
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Đơn Hàng Mới
                </p>
                <h3 className="text-3xl font-bold text-slate-800">124</h3>
                <p className="text-red-500 text-sm font-medium mt-2">
                  ↓ -2% so với tháng trước
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                📦
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Khách Hàng
                </p>
                <h3 className="text-3xl font-bold text-slate-800">1,890</h3>
                <p className="text-green-500 text-sm font-medium mt-2">
                  ↑ +8% khách quay lại
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </div>

          {/* --- BẢNG GIAO DỊCH (TABLE COMPONENT) --- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-lg font-bold text-slate-800">
                Giao dịch gần đây
              </h2>

              {/* Lọc dữ liệu (Dùng Select Component) */}
              <div className="w-48 pt-4">
                <Select
                  options={[
                    { label: "Tất cả trạng thái", value: "all" },
                    { label: "Hoàn thành", value: "done" },
                    { label: "Đang xử lý", value: "pending" },
                  ]}
                />
              </div>
            </div>

            {/* BÊ NGUYÊN CÁI KỆ DỮ LIỆU VÀO ĐÂY */}
            <Table columns={transactionColumns} data={transactionData} />
          </div>
        </main>
      </div>

      {/* ================= 3. MODAL XUẤT BÁO CÁO (Dùng Portal) ================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tùy chọn xuất dữ liệu"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            Bạn muốn xuất báo cáo doanh thu theo định dạng nào?
          </p>
          <div className="flex gap-4">
            <Button className="w-full" variant="outline">
              File Excel (.xlsx)
            </Button>
            <Button className="w-full" variant="primary">
              File PDF (.pdf)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
