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
            TÌM CHÚNG TÔI TRÊN BẢN ĐỒ (GOOGLE MAP HERO LOCATOR)
          </h2>
        </div>
        <span className="text-xs font-bold bg-yellow-100 border border-black px-2.5 py-1 rounded font-bubble">
          Mở cửa từ: 08:00 - 22:00 Tất cả các ngày
        </span>
      </div>
      
      <div className="border-[3px] border-black shadow-comic rounded-xl h-[320px] relative overflow-hidden bg-[#e5e3df]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=80')" }}
        >
          {/* Mock Map Lines */}
          <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <line stroke="#FFD000" strokeWidth="8" x1="0" x2="1200" y1="50" y2="280"></line>
            <line stroke="#000000" strokeWidth="4" x1="200" x2="600" y1="0" y2="350"></line>
            <line stroke="#FF3838" strokeWidth="5" x1="800" x2="900" y1="0" y2="350"></line>
            <line stroke="#000000" strokeWidth="6" x1="0" x2="1200" y1="180" y2="120"></line>
          </svg>
        </div>
        
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
              <p className="text-[11px] text-gray-700 font-bold mt-1">88 Phố Manga, Bến Nghé, Quận 1, TP.HCM</p>
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
        
        {/* Center Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none">
          <div className="bg-red-500 border-[3px] border-black shadow-comic text-white p-2.5 rounded-full flex items-center justify-center animate-bounce">
            <i className="fa-solid fa-location-dot text-2xl text-yellow-300"></i>
          </div>
          <span className="bg-comic-yellow text-black border-2 border-black shadow-comic-sm font-black text-[11px] px-3 py-1 rounded font-comic mt-1">
            ⚡ TỔNG BỘ 88 PHỐ MANGA - QUẬN 1 (TP.HCM)
          </span>
        </div>
        
        {/* Zoom Controls */}
        <div className="border-[2.5px] border-black shadow-comic absolute bottom-4 right-4 flex flex-col bg-white rounded-lg overflow-hidden text-black font-bubble">
          <button className="w-8 h-8 flex items-center justify-center border-b-2 border-black hover:bg-comic-yellow text-sm font-black transition">+</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-comic-yellow text-sm font-black transition">-</button>
        </div>
      </div>
    </section>
  );
}
