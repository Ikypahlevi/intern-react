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
import AdminPageHeader from "../../../Components/admin/AdminPageHeader";
import AdminPopButton from "../../../Components/admin/AdminPopButton";

export default function Overview() {
  const { data: orders = [], isLoading: loadingOrders } = useGetOrders();
  const { data: products = [], isLoading: loadingProducts } = useGetProducts();
  const { data: users = [], isLoading: loadingUsers } = useGetUsers();

  const isLoading = loadingOrders || loadingProducts || loadingUsers;

  if (isLoading) {
    return (
      <div className="font-comic text-2xl animate-pulse p-10">
        ĐANG TẢI DỮ LIỆU HQ...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-12 gap-8 max-w-7xl mx-auto font-bubble">
      <AdminPageHeader
        title="BẢNG ĐIỀU KHIỂN TỔNG QUAN"
        description="Giám sát hiệu suất doanh thu kho truyện, đơn xuất bản và hội viên độc giả toàn quốc."
        iconClass="fa-chart-pie"
        versionTag="OTAKU DATA LIVE"
        kpiBlocks={[]}
      >
        {/* <div className="flex justify-end mb-4">
          <AdminPopButton variant="outline" icon="fa-solid fa-download">
            Xuất Báo Cáo
          </AdminPopButton>
        </div> */}
      </AdminPageHeader>

      <KpiCards orders={orders} products={products} users={users} />

      {/* Visual Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <RevenueChart orders={orders} />
        </div>
        <div className="xl:col-span-4">
          <CategoryDonut products={products} orders={orders} />
        </div>
      </div>

      {/* Dual Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <PendingOrders orders={orders} />
        </div>
        <div className="xl:col-span-4">
          <TopBestsellers products={products} orders={orders} />
        </div>
      </div>

      {/* Low Stock Alert */}
      <LowStockAlert products={products} />
    </div>
  );
}
