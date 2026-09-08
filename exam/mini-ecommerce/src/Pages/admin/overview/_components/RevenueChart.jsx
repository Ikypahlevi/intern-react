import React, { useMemo } from "react";

export default function RevenueChart({ orders }) {
  // Generate last 6 months data dynamically
  const chartData = useMemo(() => {
    const months = [];
    const now = new Date();
    
    // Tạo mảng 6 tháng gần nhất (đảo ngược lại từ quá khứ đến hiện tại)
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        monthValue: d.getMonth() + 1, // 1-12
        yearValue: d.getFullYear(),
        label: `T${d.getMonth() + 1}`,
        revenue: 0,
        ordersCount: 0
      });
    }

    // Map orders vào tháng tương ứng
    orders.forEach(order => {
      if (order.status === 'cancelled') return;
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1;
      const orderYear = orderDate.getFullYear();

      const monthIndex = months.findIndex(m => m.monthValue === orderMonth && m.yearValue === orderYear);
      if (monthIndex !== -1) {
        months[monthIndex].revenue += order.totalAmount;
        months[monthIndex].ordersCount += 1;
      }
    });

    return months;
  }, [orders]);

  // Tìm tháng có doanh thu cao nhất để tính % cho height
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1000000); // Tối thiểu 1 triệu để tránh chia 0

  return (
    <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col h-full font-bubble">
      <div className="p-4 border-b-[3px] border-black bg-gray-50 flex items-center justify-between">
        <h2 className="font-comic text-lg uppercase text-black font-black flex items-center gap-2">
          <i className="fa-solid fa-chart-simple text-blue-600"></i> DOANH THU & ĐƠN HÀNG 6 THÁNG
        </h2>
        <span className="bg-comic-yellow text-black border-[2px] border-black font-comic text-[10px] px-2 py-0.5 shadow-[2px_2px_0px_#000] font-bold uppercase">
          LIVE DATA 🔴
        </span>
      </div>
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-end min-h-[300px]">
        {/* Chart Area */}
        <div className="relative flex-1 flex items-end justify-between gap-2 sm:gap-6 pt-10">
          {/* Background Grid */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
            <div className="w-full border-t-2 border-dashed border-gray-200"></div>
            <div className="w-full border-t-2 border-dashed border-gray-200"></div>
            <div className="w-full border-t-2 border-dashed border-gray-200"></div>
            <div className="w-full border-t-2 border-dashed border-gray-200"></div>
            <div className="w-full border-t-[3px] border-black"></div>
          </div>

          {/* Bars */}
          {chartData.map((data, index) => {
            const heightPercent = (data.revenue / maxRevenue) * 100;
            return (
              <div key={index} className="relative z-10 flex-1 flex flex-col items-center justify-end h-full group">
                <div 
                  className="w-full max-w-[40px] sm:max-w-[60px] bg-comic-yellow border-[3px] border-black shadow-[4px_4px_0px_#000] relative cursor-crosshair hover:bg-yellow-300 transition-all duration-500 ease-out"
                  style={{ height: `${heightPercent}%`, minHeight: '10px' }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white border-[3px] border-black shadow-[3px_3px_0px_#000] p-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all pointer-events-none z-20 w-[120px]">
                    <div className="font-comic text-[10px] text-gray-500">{data.label}</div>
                    <div className="font-bold text-xs text-black">{data.revenue.toLocaleString()}₫</div>
                    <div className="text-[10px] text-blue-600 font-bold">{data.ordersCount} Đơn</div>
                  </div>
                </div>
                <div className="mt-4 font-comic text-xs sm:text-sm text-black font-bold bg-white border-[2px] border-black px-1 sm:px-3 py-1 shadow-[2px_2px_0px_#000]">
                  {data.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
