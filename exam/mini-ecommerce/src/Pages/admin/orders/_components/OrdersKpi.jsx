import React, { useMemo } from "react";
import { isOrderCountedInRevenue } from "../../../../Utils/helpers";

export default function OrdersKpi({ orders }) {
  const stats = useMemo(() => {
    let revenue = 0;
    let total = orders.length;
    let pending = 0;
    let shipping = 0;
    let completed = 0;

    orders.forEach(o => {
      if (isOrderCountedInRevenue(o)) {
        revenue += o.totalAmount;
      }
      if (o.status === 'pending') pending++;
      else if (o.status === 'shipping') shipping++;
      else if (o.status === 'completed') completed++;
    });

    return { total, revenue, pending, shipping, completed };
  }, [orders]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 font-bubble">
      {/* Thẻ 1 */}
      <div className="relative bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b] flex flex-col justify-between overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-black">
          <i className="fa-solid fa-receipt text-[110px]"></i>
        </div>
        <div className="flex items-start justify-between">
          <span className="font-comic text-[12px] uppercase text-gray-500 tracking-wider">Hôm nay / Realtime</span>
          <span className="bg-yellow-300 text-black border-[2px] border-black font-comic text-[12px] px-2 py-1 shadow-[1px_1px_0px_#1c1b1b]">
            LIVE 🟢
          </span>
        </div>
        <div className="my-2">
          <p className="font-comic text-4xl text-black leading-none">{stats.total}</p>
          <p className="font-comic text-lg uppercase text-black mt-1">Tổng Đơn Đã Nhận</p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t-[2px] border-black text-gray-600 font-bold text-sm">
          <span>Doanh thu ước tính</span>
          <span className="text-black">{stats.revenue.toLocaleString()}₫</span>
        </div>
      </div>

      {/* Thẻ 2 */}
      <div className="relative bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b] flex flex-col justify-between overflow-hidden">
        <div className="flex items-start justify-between">
          <span className="font-comic text-[12px] uppercase text-red-600 font-bold tracking-wider flex items-center gap-1">
            <i className="fa-solid fa-circle-exclamation text-[16px]"></i> Cần đóng màng co ngay
          </span>
          <span className="bg-red-600 text-white border-[2px] border-black font-comic text-[12px] px-2 py-1 shadow-[1px_1px_0px_#1c1b1b] animate-bounce">
            GẤP
          </span>
        </div>
        <div className="my-2">
          <p className="font-comic text-4xl text-red-600 leading-none">{stats.pending}</p>
          <p className="font-comic text-lg uppercase text-black mt-1">Chờ Duyệt & Đóng Gói</p>
        </div>
      </div>

      {/* Thẻ 3 */}
      <div className="relative bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b] flex flex-col justify-between overflow-hidden">
        <div className="flex items-start justify-between">
          <span className="font-comic text-[12px] uppercase text-blue-600 font-bold tracking-wider flex items-center gap-1">
            <i className="fa-solid fa-bolt text-[16px]"></i> GrabExpress & AhaMove
          </span>
          <span className="bg-blue-300 text-black border-[2px] border-black font-comic text-[12px] px-2 py-1 shadow-[1px_1px_0px_#1c1b1b]">
            ĐANG GIAO
          </span>
        </div>
        <div className="my-2">
          <p className="font-comic text-4xl text-black leading-none">{stats.shipping}</p>
          <p className="font-comic text-lg uppercase text-black mt-1">Đơn Đang Vận Chuyển</p>
        </div>
      </div>

      {/* Thẻ 4 */}
      <div className="relative bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b] flex flex-col justify-between overflow-hidden">
        <div className="flex items-start justify-between">
          <span className="font-comic text-[12px] uppercase text-green-600 font-bold tracking-wider flex items-center gap-1">
            <i className="fa-solid fa-certificate text-[16px]"></i> Đối soát hoàn tất
          </span>
          <span className="bg-green-100 text-black border-[2px] border-black font-comic text-[12px] px-2 py-1 shadow-[1px_1px_0px_#1c1b1b]">
            SẮC NÉT
          </span>
        </div>
        <div className="my-2">
          <p className="font-comic text-4xl text-black leading-none">{stats.completed}</p>
          <p className="font-comic text-lg uppercase text-black mt-1">Giao Thành Công</p>
        </div>
      </div>
    </section>
  );
}
