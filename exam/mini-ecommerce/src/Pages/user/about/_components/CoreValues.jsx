import React from "react";

export default function CoreValues() {
  const pillars = [
    {
      id: 1,
      title: "100% BẢN QUYỀN CHÍNH HÃNG",
      icon: "✓",
      iconBg: "bg-green-600",
      iconColor: "text-white",
      desc: "Tất cả sách và ấn phẩm sưu tầm đều nhập trực tiếp từ các đối tác được ủy quyền chính ngạch tại Tokyo & Việt Nam. Đền gấp 10 lần nếu phát hiện sách lậu."
    },
    {
      id: 2,
      title: "GIAO SIÊU TỐC 2 GIỜ NỘI THÀNH",
      icon: "⚡",
      iconBg: "bg-comic-yellow",
      iconColor: "text-black",
      desc: "Đặt sáng nhận trưa, đặt chiều nhận tối. Biệt đội Swoo Flash luôn túc trực để bạn không phải chờ đợi từng tập manga mới ra lò mỗi thứ Hai hàng tuần."
    },
    {
      id: 3,
      title: "ĐỔI TRẢ TRONG 7 NGÀY DỄ DÀNG",
      icon: "↺",
      iconBg: "bg-red-500",
      iconColor: "text-white",
      desc: "Bị rách bìa do vận chuyển? Thiếu trang in do lỗi nhà in? Đổi mới 1-1 ngay lập tức hoàn toàn miễn phí mà không cần qua nhiều thủ tục phiền hà."
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bubble">
      {pillars.map(pillar => (
        <div key={pillar.id} className="bg-white border-2 border-black p-6 shadow-comic relative flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="font-comic text-2xl text-black font-black">{pillar.title}</span>
            <div className={`w-10 h-10 rounded-full ${pillar.iconBg} border-2 border-black flex items-center justify-center ${pillar.iconColor} font-black text-sm shadow-comic-sm flex-shrink-0 ml-2`}>
              {pillar.icon}
            </div>
          </div>
          <p className="text-xs font-bold text-gray-600 leading-relaxed">
            {pillar.desc}
          </p>
        </div>
      ))}
    </section>
  );
}
