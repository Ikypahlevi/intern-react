import React from "react";

export default function MetricsBar() {
  const metrics = [
    {
      id: 1,
      title: "TỔNG ĐƠN GIAO TOÀN QUỐC",
      value: "500,000+",
      desc: "Manga chính hãng trao gửi thành công",
      colorClass: "text-green-700",
      dotClass: "bg-green-500 animate-ping"
    },
    {
      id: 2,
      title: "GIÁ TRỊ DOANH THU",
      value: "$12.5M",
      desc: "Bản quyền & phụ phẩm Otaku hợp pháp",
      colorClass: "text-red-600",
      valueColor: "text-red-600"
    },
    {
      id: 3,
      title: "ĐỐI TÁC XUẤT BẢN",
      value: "120+",
      desc: "NXB Nhật Bản & NXB uy tín Việt Nam",
      colorClass: "text-blue-600"
    },
    {
      id: 4,
      title: "ĐIỂM ĐỘI SHIP & HUB",
      value: "720+",
      desc: "Điểm tiếp nhận & đại lý ủy quyền",
      colorClass: "text-amber-600"
    }
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 font-bubble">
      {metrics.map(item => (
        <div key={item.id} className="bg-white border-2 border-black p-5 shadow-comic text-left relative overflow-hidden group hover:-translate-y-1 transition duration-200">
          <div className={`text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-1 ${item.colorClass}`}>
            {item.dotClass && <span className={`inline-block w-2 h-2 rounded-full ${item.dotClass}`}></span>}
            {item.title}
          </div>
          <div className={`font-comic text-4xl lg:text-5xl font-black ${item.valueColor || 'text-black'}`}>
            {item.value}
          </div>
          <div className="text-xs font-bold text-gray-600 mt-1">
            {item.desc}
          </div>
        </div>
      ))}
    </section>
  );
}
