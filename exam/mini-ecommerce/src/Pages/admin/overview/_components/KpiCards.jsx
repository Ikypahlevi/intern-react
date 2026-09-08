import React, { useMemo } from "react";

export default function KpiCards({ orders, products, users }) {
  // Calculate dynamic data
  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, order) => {
      if (order.status !== 'cancelled') {
        return acc + order.totalAmount;
      }
      return acc;
    }, 0);
  }, [orders]);

  const totalOrders = orders.length;
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock <= 15).length;
  
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 font-bubble">
      {/* Card 1: Tổng Doanh Thu */}
      <div className="relative bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-4 flex flex-col justify-between overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all">
        <div className="absolute top-0 right-0 w-16 h-16 bg-comic-yellow border-b-[3px] border-l-[3px] border-black flex items-center justify-center text-black">
          <i className="fa-solid fa-money-bill-wave text-2xl"></i>
        </div>
        <div className="flex flex-col gap-1 pr-12">
          <span className="font-comic text-[10px] uppercase text-gray-500 font-bold tracking-wider">KPI-01 // TÀI CHÍNH</span>
          <h2 className="font-comic text-lg uppercase text-black font-black">TỔNG DOANH THU</h2>
        </div>
        <div className="my-4">
          <div className="font-comic text-3xl text-black tracking-tight flex items-baseline gap-1">
            <span>{totalRevenue.toLocaleString()}</span><span className="text-xl text-red-600">₫</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="bg-green-500 text-white font-comic text-[10px] px-2 py-0.5 border-[2px] border-black shadow-[2px_2px_0px_#000] font-bold uppercase">Live 🟢</span>
          </div>
        </div>
      </div>

      {/* Card 2: Tổng Đơn Hàng */}
      <div className="relative bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-4 flex flex-col justify-between overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all">
        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-300 border-b-[3px] border-l-[3px] border-black flex items-center justify-center text-black">
          <i className="fa-solid fa-truck-fast text-2xl"></i>
        </div>
        <div className="flex flex-col gap-1 pr-12">
          <span className="font-comic text-[10px] uppercase text-gray-500 font-bold tracking-wider">KPI-02 // VẬN HÀNH</span>
          <h2 className="font-comic text-lg uppercase text-black font-black">TỔNG ĐƠN HÀNG</h2>
        </div>
        <div className="my-4">
          <div className="font-comic text-3xl text-black tracking-tight flex items-baseline gap-1">
            <span>{totalOrders}</span><span className="text-xl text-gray-600">Đơn</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="bg-blue-200 text-black font-comic text-[10px] px-2 py-0.5 border-[2px] border-black shadow-[2px_2px_0px_#000] font-bold uppercase tracking-wider">
              GIAO HÀNG 📦
            </span>
            <span className="text-xs text-red-600 font-bold">{pendingCount} chờ duyệt</span>
          </div>
        </div>
      </div>

      {/* Card 3: Sản Phẩm */}
      <div className="relative bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-4 flex flex-col justify-between overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all">
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-400 border-b-[3px] border-l-[3px] border-black flex items-center justify-center text-white">
          <i className="fa-solid fa-book-open text-2xl"></i>
        </div>
        <div className="flex flex-col gap-1 pr-12">
          <span className="font-comic text-[10px] uppercase text-gray-500 font-bold tracking-wider">KPI-03 // KHO HÀNG</span>
          <h2 className="font-comic text-lg uppercase text-black font-black">TRUYỆN & ARTBOOK</h2>
        </div>
        <div className="my-4">
          <div className="font-comic text-3xl text-black tracking-tight flex items-baseline gap-1">
            <span>{totalProducts}</span><span className="text-xl text-gray-600">Đầu</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {lowStockCount > 0 && (
              <span className="bg-red-600 text-white font-comic text-[10px] px-2 py-0.5 border-[2px] border-black shadow-[2px_2px_0px_#000] font-bold uppercase animate-pulse">
                CẢNH BÁO KHO ⚠️
              </span>
            )}
            <span className="text-xs text-red-600 font-bold">{lowStockCount} tập sắp hết</span>
          </div>
        </div>
      </div>

      {/* Card 4: Thành Viên */}
      <div className="relative bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] p-4 flex flex-col justify-between overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] transition-all">
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-300 border-b-[3px] border-l-[3px] border-black flex items-center justify-center text-black">
          <i className="fa-solid fa-users text-2xl"></i>
        </div>
        <div className="flex flex-col gap-1 pr-12">
          <span className="font-comic text-[10px] uppercase text-gray-500 font-bold tracking-wider">KPI-04 // THÀNH VIÊN</span>
          <h2 className="font-comic text-lg uppercase text-black font-black">TÀI KHOẢN OTAKU</h2>
        </div>
        <div className="my-4">
          <div className="font-comic text-3xl text-black tracking-tight flex items-baseline gap-1">
            <span>{totalUsers}</span><span className="text-xl text-gray-600">User</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="bg-green-200 text-black font-comic text-[10px] px-2 py-0.5 border-[2px] border-black shadow-[2px_2px_0px_#000] font-bold uppercase">
              VIP CLUB 👑
            </span>
            <span className="text-xs text-black font-bold">{adminCount} Admin HQ</span>
          </div>
        </div>
      </div>

    </div>
  );
}
