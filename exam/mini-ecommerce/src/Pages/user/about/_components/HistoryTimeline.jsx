import React from "react";

export default function HistoryTimeline() {
  const milestones = [
    {
      year: "2014",
      bgClass: "bg-comic-yellow text-black",
      title: "Thành lập Swoo Manga Club",
      desc: "Khởi đầu là diễn đàn trao đổi truyện tranh tiếng Nhật và dịch vụ order artbook giới hạn cho cộng đồng cosplay & otaku Sài Gòn."
    },
    {
      year: "2017",
      bgClass: "bg-white text-black",
      title: "Ký kết hợp tác NXB Kim Đồng & Trẻ",
      desc: "Trở thành đại lý cấp 1 phân phối các tựa shonen huyền thoại: Dragon Ball, Naruto, Thám Tử Lừng Danh Conan, One Piece."
    },
    {
      year: "2019",
      bgClass: "bg-white text-black",
      title: "Ra mắt nền tảng Web SWOO! Heroes",
      desc: "Số hóa toàn bộ trải nghiệm đặt sách, tích điểm Otaku Points và hệ thống bọc bìa truyện tự động độc quyền."
    },
    {
      year: "2021",
      bgClass: "bg-white text-black",
      title: "Vượt mốc 100.000 thành viên VIP",
      desc: "Mở rộng kho vận Hà Nội, triển khai dịch vụ giao siêu tốc 2H cho mọi đơn hàng nội thành."
    },
    {
      year: "2023",
      bgClass: "bg-white text-black",
      title: "Hợp tác trực tiếp NXB Shueisha & Kodansha",
      desc: "Nhập khẩu bản quyền Artbook giới hạn, Boxset kỷ niệm Jujutsu Kaisen, Chainsaw Man và Spy x Family trực tiếp từ Nhật."
    },
    {
      year: "2024",
      bgClass: "bg-green-600 text-white",
      title: "Kỷ niệm 10 năm & Ra mắt hệ sinh thái Manga Club",
      desc: "Đạt mốc 500.000 kiện hàng và tiếp tục hành trình phục vụ độc giả khắp 63 tỉnh thành."
    }
  ];

  // Divide into two columns
  const midIndex = Math.ceil(milestones.length / 2);
  const leftCol = milestones.slice(0, midIndex);
  const rightCol = milestones.slice(midIndex);

  return (
    <section className="bg-white border-4 border-black p-6 md:p-8 shadow-comic space-y-8 font-bubble" id="milestones">
      {/* Section Header */}
      <div className="border-b-2 border-black pb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="inline-block bg-yellow-300 border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase mb-1 font-comic tracking-wider">CỘT MỐC PHÁT TRIỂN</div>
          <h2 className="font-comic text-3xl md:text-4xl text-black font-black">CÂU CHUYỆN KHỞI NGUYÊN & HÀNH TRÌNH 10 NĂM</h2>
        </div>
        <div className="text-xs font-bold text-gray-500">2014 — 2024 VƯƠN MÌNH MẠNH MẼ</div>
      </div>

      {/* Big Feature Image with Comic Ink Frame (City & HQ) */}
      <div className="relative border-4 border-black overflow-hidden bg-slate-900 h-64 md:h-80 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900 to-slate-800 opacity-90"></div>
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <span className="bg-comic-yellow text-black border-2 border-black font-black text-xs px-3 py-1 uppercase shadow-comic-sm font-comic tracking-wider">TRỤ SỞ & TRUNG TÂM PHÂN PHỐI TỔNG</span>
          <h3 className="font-comic text-3xl md:text-5xl text-white mt-3 font-black">TỪ GIAN HÀNG NHỎ ĐẾN CHUỖI CỬA HÀNG OTAKU TOÀN QUỐC</h3>
          <p className="text-gray-300 text-xs sm:text-sm font-bold mt-2">
            Khởi đầu từ 1 căn phòng trọ 15m² với vỏn vẹn 500 cuốn One Piece, ngày nay SWOO! tự hào sở hữu tổng kho tự động hóa tại TP.HCM & Hà Nội với khả năng xử lý hơn 10.000 đơn hàng mỗi ngày.
          </p>
        </div>
      </div>

      {/* Two-Column Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Left Column Timeline */}
        <div className="space-y-4">
          {leftCol.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className={`font-comic text-2xl font-black border-2 border-black px-2.5 py-1 flex-shrink-0 shadow-comic-sm ${item.bgClass}`}>
                {item.year}
              </div>
              <div>
                <h4 className="font-black text-sm uppercase">{item.title}</h4>
                <p className="text-xs text-gray-600 font-bold mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column Timeline */}
        <div className="space-y-4">
          {rightCol.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className={`font-comic text-2xl font-black border-2 border-black px-2.5 py-1 flex-shrink-0 shadow-comic-sm ${item.bgClass}`}>
                {item.year}
              </div>
              <div>
                <h4 className="font-black text-sm uppercase">{item.title}</h4>
                <p className="text-xs text-gray-600 font-bold mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
