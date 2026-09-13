import React from "react";

export default function ContactMap() {
  return (
    <section className="bg-white border-[3.5px] border-black shadow-comic-lg rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <span className="bg-green-400 text-black border-2 border-black shadow-comic-sm text-[11px] font-black px-2 py-0.5 rounded font-comic tracking-wider">
            HERO RADAR 🛰️
          </span>
          <h2 className="text-base font-black tracking-tight text-gray-900 uppercase font-comic">
            TÌM CHÚNG TÔI TRÊN BẢN ĐỒ
          </h2>
        </div>
        <span className="text-xs font-bold bg-yellow-100 border border-black px-2.5 py-1 rounded font-bubble">
          Mở cửa từ: 08:00 - 22:00 Tất cả các ngày
        </span>
      </div>
      
      <div className="border-[3px] border-black shadow-comic rounded-xl h-[320px] relative overflow-hidden bg-[#e5e3df]">
        <iframe 
          className="absolute inset-0 w-full h-full border-0" 
          src="https://www.google.com/maps?q=79+Thanh+Đàm,+Hoàng+Mai,+Hà+Nội&output=embed" 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
        
        {/* Map Card */}
        <div className="bg-white border-[2.5px] border-black shadow-comic rounded-lg w-[280px] absolute top-4 left-4 p-3 text-xs z-10 font-bubble">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="bg-comic-yellow text-[9px] font-black border border-black px-1 rounded-sm font-comic">
                  HQ MANGA
                </span>
                <p className="font-black text-gray-900">SWOO! Trụ Sở Manga Heroes</p>
              </div>
              <p className="text-[11px] text-gray-700 font-bold mt-1">79 Thanh Đàm, Hoàng Mai, Hà Nội</p>
              <div className="flex items-center space-x-1 text-amber-500 text-[10px] mt-1 font-bold">
                <span>5.0</span>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <span className="text-gray-600 text-[9px] font-bold">(1,420 Đánh giá Otaku)</span>
              </div>
              <span className="text-green-600 text-[10px] font-black mt-1 block uppercase">⚡ Trạm trực tiếp: Mở cửa 24/7</span>
            </div>
            <a href="#" className="bg-green-400 border-2 border-black shadow-comic-sm rounded px-2 py-1 text-black text-center flex flex-col items-center hover:bg-comic-yellow transition">
              <i className="fa-solid fa-diamond-turn-right text-base text-black"></i>
              <span className="text-[9px] font-black mt-0.5 font-comic">RADAR</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
