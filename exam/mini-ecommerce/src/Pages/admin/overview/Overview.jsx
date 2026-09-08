import React from "react";
import { useGetOrders } from "../../../Services/queries/useOrders";
import { useGetProducts } from "../../../Services/queries/useProducts";
import { useGetUsers } from "../../../Services/queries/useUsers";

import KpiCards from "./_components/KpiCards";
import RevenueChart from "./_components/RevenueChart";
import CategoryDonut from "./_components/CategoryDonut";
import PendingOrders from "./_components/PendingOrders";
import TopBestsellers from "./_components/TopBestsellers";
import LowStockAlert from "./_components/LowStockAlert";

export default function Overview() {
  const { data: orders = [], isLoading: loadingOrders } = useGetOrders();
  const { data: products = [], isLoading: loadingProducts } = useGetProducts();
  const { data: users = [], isLoading: loadingUsers } = useGetUsers();

  const isLoading = loadingOrders || loadingProducts || loadingUsers;

  if (isLoading) {
    return <div className="font-comic text-2xl animate-pulse p-10">ĐANG TẢI DỮ LIỆU HQ...</div>;
  }

  return (
    <div className="flex flex-col w-full pb-12 gap-8 max-w-7xl mx-auto font-bubble">
      
      {/* Top Comic Banner / Title Bar */}
      <div className="relative bg-white border-[3px] border-black shadow-comic p-4 sm:p-6 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(#1c1b1b 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" }}></div>
        
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-red-600 text-white font-comic text-[10px] px-2 py-0.5 border-[2px] border-black shadow-[2px_2px_0px_#000] font-bold uppercase tracking-wider flex items-center gap-1">
              <i className="fa-solid fa-bolt text-[14px]"></i> HÔM NAY: REAL-TIME OTAKU DATA
            </span>
            <span className="bg-comic-yellow text-black font-comic text-[10px] px-2 py-0.5 border-[2px] border-black shadow-[2px_2px_0px_#000] font-bold">
              CẬP NHẬT TỰ ĐỘNG (LIVE)
            </span>
          </div>
          <h1 className="font-comic text-3xl uppercase tracking-tight text-black flex items-center gap-2 font-black">
            BẢNG ĐIỀU KHIỂN & THỐNG KÊ TỔNG QUAN ⚡
          </h1>
          <p className="font-bold text-gray-700">
            Giám sát hiệu suất doanh thu kho truyện, đơn xuất bản và hội viên độc giả toàn quốc.
          </p>
        </div>

        {/* Toolbar Actions */}
        <div className="relative z-10 flex items-center gap-2">
          <button className="flex items-center gap-1 bg-white text-black border-[2px] border-black font-comic text-sm px-3 py-2 shadow-[3px_3px_0px_#000] hover:bg-gray-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all uppercase font-black">
            <i className="fa-solid fa-download text-lg"></i>
            <span>Xuất Báo Cáo</span>
          </button>
        </div>
      </div>

      <KpiCards orders={orders} products={products} users={users} />

      {/* Visual Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <RevenueChart orders={orders} />
        </div>
        <div className="xl:col-span-4">
          <CategoryDonut products={products} />
        </div>
      </div>

      {/* Dual Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <PendingOrders orders={orders} />
        </div>
        <div className="xl:col-span-4">
          <TopBestsellers products={products} />
        </div>
      </div>

      {/* Low Stock Alert */}
      <LowStockAlert products={products} />

    </div>
  );
}
