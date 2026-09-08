import React, { useMemo } from "react";

export default function CategoryDonut({ products }) {
  const categoryStats = useMemo(() => {
    const stats = {};
    products.forEach(p => {
      if (!stats[p.category]) {
        stats[p.category] = 0;
      }
      stats[p.category] += (p.price * p.sold);
    });

    // Sắp xếp giảm dần theo doanh thu
    const sorted = Object.entries(stats)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue);

    // Lấy top 4, phần còn lại gộp vào 'Khác'
    const top3 = sorted.slice(0, 3);
    const othersRevenue = sorted.slice(3).reduce((acc, curr) => acc + curr.revenue, 0);
    
    if (othersRevenue > 0) {
      top3.push({ name: "Khác", revenue: othersRevenue });
    }

    const total = top3.reduce((acc, curr) => acc + curr.revenue, 0);

    return {
      total,
      data: top3.map(t => ({
        ...t,
        percent: total === 0 ? 0 : Math.round((t.revenue / total) * 100)
      }))
    };
  }, [products]);

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-gray-400"];

  return (
    <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col h-full font-bubble">
      <div className="p-4 border-b-[3px] border-black bg-gray-50 flex items-center justify-between">
        <h2 className="font-comic text-lg uppercase text-black font-black flex items-center gap-2">
          <i className="fa-solid fa-chart-pie text-red-600"></i> DOANH SỐ THỂ LOẠI
        </h2>
      </div>
      <div className="p-6 flex-1 flex flex-col items-center justify-center gap-6">
        {/* Fake Donut Chart via CSS Conic Gradient */}
        <div className="relative w-48 h-48 rounded-full border-[4px] border-black shadow-[5px_5px_0px_#000] overflow-hidden"
             style={{
               background: categoryStats.total === 0 ? '#ddd' : `conic-gradient(
                 #ef4444 0% ${categoryStats.data[0]?.percent || 0}%,
                 #3b82f6 ${categoryStats.data[0]?.percent || 0}% ${(categoryStats.data[0]?.percent || 0) + (categoryStats.data[1]?.percent || 0)}%,
                 #22c55e ${(categoryStats.data[0]?.percent || 0) + (categoryStats.data[1]?.percent || 0)}% ${(categoryStats.data[0]?.percent || 0) + (categoryStats.data[1]?.percent || 0) + (categoryStats.data[2]?.percent || 0)}%,
                 #9ca3af ${(categoryStats.data[0]?.percent || 0) + (categoryStats.data[1]?.percent || 0) + (categoryStats.data[2]?.percent || 0)}% 100%
               )`
             }}
        >
          {/* Inner circle for Donut hole */}
          <div className="absolute inset-[25%] bg-white rounded-full border-[4px] border-black shadow-[inset_2px_2px_0px_rgba(0,0,0,0.5)] flex items-center justify-center">
            <div className="text-center">
              <div className="font-comic text-[10px] uppercase text-gray-500">TỔNG</div>
              <div className="font-black text-xs text-black">TOP 4</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full flex flex-col gap-3">
          {categoryStats.data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 border-[2px] border-black ${colors[index]} shadow-[1px_1px_0px_#000]`}></span>
                <span className="font-bold text-sm text-black">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-comic text-xs text-gray-600">{item.revenue.toLocaleString()}₫</span>
                <span className="font-black text-sm w-10 text-right">{item.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
