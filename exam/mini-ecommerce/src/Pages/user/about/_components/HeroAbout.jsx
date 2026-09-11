import React from "react";

export default function HeroAbout() {
  return (
    <section className="relative comic-border border-4 bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-100 p-6 md:p-10 shadow-comic-lg overflow-hidden">
      {/* Background Halftone Motif */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5" 
        style={{ backgroundImage: "radial-gradient(#000000 15%, transparent 16%)", backgroundSize: "8px 8px" }}
      ></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Hero Text Left */}
        <div className="lg:col-span-6 space-y-4 font-bubble">
          <div className="inline-block bg-black text-comic-yellow text-xs font-black px-3 py-1 uppercase tracking-widest border border-black shadow-comic-sm font-comic">
            ★ HÀNH TRÌNH SWOO! MANGA HEROES ★
          </div>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-black leading-none font-black">
            BEST EXPERIENCE <br />
            <span className="text-red-600 underline decoration-black decoration-wavy">ALWAYS, MINE.</span>
          </h1>
          <p className="text-base font-bold text-slate-800 leading-relaxed max-w-xl">
            Sứ mệnh mang lại trải nghiệm đọc manga bản quyền chất lượng Nhật Bản đỉnh cao nhất cho cộng đồng Otaku & Comic Readers tại Việt Nam. Không truyện lậu, không rách góc, bảo bọc trọn vẹn từng trang giấy!
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a 
              className="bg-comic-yellow hover:bg-yellow-400 text-black border-2 border-black font-black text-sm px-6 py-3 shadow-comic uppercase tracking-wider inline-flex items-center gap-2 font-comic transition" 
              href="#leadership"
            >
              <span>ĐỘI NGŨ CỦA CHÚNG TÔI</span> ⚡
            </a>
            <a 
              className="bg-white hover:bg-slate-100 text-black border-2 border-black font-black text-sm px-6 py-3 shadow-comic uppercase tracking-wider inline-flex items-center gap-2 font-comic transition" 
              href="#milestones"
            >
              <span>CỘT MỐC LỊCH SỬ</span> 📖
            </a>
          </div>
        </div>

        {/* Hero Graphic Right (Stacked Manga Delivery / Warehouse Comic Artwork) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg bg-white border-4 border-black p-4 shadow-comic rotate-1">
            <div className="bg-amber-200 border-2 border-black p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 border-2 border-black font-comic tracking-wider">
                100% GENUINE
              </div>
              
              {/* Comic Warehouse & Delivery Stack Graphic */}
              <div className="w-full flex justify-center items-end gap-2 my-4">
                <div className="w-20 h-28 bg-yellow-400 border-2 border-black flex flex-col items-center justify-center shadow-comic-sm">
                  <span className="text-2xl">📦</span>
                  <span className="text-[10px] font-black font-bubble">BOXSET</span>
                </div>
                <div className="w-24 h-36 bg-orange-400 border-2 border-black flex flex-col items-center justify-center shadow-comic-sm">
                  <span className="text-3xl">📚</span>
                  <span className="text-[10px] font-black text-white font-bubble">SHONEN JUMP</span>
                </div>
                <div className="w-28 h-44 bg-green-500 border-2 border-black flex flex-col items-center justify-center shadow-comic-sm">
                  <span className="text-4xl">🚚</span>
                  <span className="text-[10px] font-black text-white font-bubble text-center px-1">SWOO! EXPRESS</span>
                </div>
                <div className="w-16 h-24 bg-red-400 border-2 border-black flex flex-col items-center justify-center shadow-comic-sm">
                  <span className="text-2xl">🎁</span>
                  <span className="text-[9px] font-black text-white font-bubble">POSTER</span>
                </div>
              </div>
              
              <div className="font-comic text-2xl text-black font-black">
                HƠN 1.000.000 CUỐN MANGA ĐÃ TỚI TẬN TAY CÁC ĐỘC GIẢ!
              </div>
              <p className="text-xs font-bold text-gray-700 mt-1 font-bubble">
                Đóng gói bọc bóng khí 4 lớp + Hộp Carton bảo vệ sống lưng tuyệt đối
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
