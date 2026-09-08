import React from "react";

export default function ContactInfo() {
  return (
    <div className="col-span-1 md:col-span-5 flex flex-col justify-between space-y-4 font-bubble">
      <div className="bg-yellow-200 border-[3px] border-black shadow-comic rounded-xl p-5 space-y-4 text-xs font-bold">
        {/* HQ Address */}
        <div>
          <div className="bg-black text-comic-yellow inline-block px-2 py-0.5 rounded font-black text-[10px] mb-1.5 font-comic tracking-wider">
            🏢 TRỤ SỞ TỔNG BỘ MANGA (HQ)
          </div>
          <p className="text-gray-900 font-extrabold leading-relaxed">
            88 Phố Manga, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
          </p>
          <p className="text-red-600 font-black text-sm mt-1">Hotline Otaku: 1900-888-MANGA</p>
          <p className="text-blue-700 font-black underline cursor-pointer hover:text-blue-500">support@swoomanga.vn</p>
        </div>
        
        <hr className="border-t-2 border-dashed border-black" />
        
        {/* Warehouse Address */}
        <div>
          <div className="bg-red-500 text-white inline-block px-2 py-0.5 border-[1.5px] border-black rounded font-black text-[10px] mb-1.5 font-comic tracking-wider">
            📦 KHO BẢO QUẢN & ĐÓNG GÓI MÀNG CO
          </div>
          <p className="text-gray-900 font-extrabold leading-relaxed">
            Khu Công Nghệ Cao, TP. Thủ Đức, TP. Hồ Chí Minh
          </p>
          <p className="text-gray-700 font-black text-xs mt-1">⚡ Tiêu chuẩn bọc bóng khí 3 lớp chống quăn góc 100%</p>
          <p className="text-blue-700 font-black underline cursor-pointer hover:text-blue-500">khohang@swoomanga.vn</p>
        </div>
        
        <hr className="border-t-2 border-dashed border-black" />
        
        {/* Socials */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="bg-green-400 border-[1.5px] border-black px-1.5 py-0.5 rounded font-black font-comic">24/7</span>
            <span className="font-black uppercase text-[11px] font-comic tracking-wider">TRỰC TỔNG ĐÀI</span>
          </div>
          <div className="flex items-center space-x-2">
            <a href="#" className="w-7 h-7 bg-white border-2 border-black shadow-comic-sm rounded flex items-center justify-center text-black hover:bg-comic-yellow transition">
              <i className="fa-brands fa-facebook-f text-xs"></i>
            </a>
            <a href="#" className="w-7 h-7 bg-white border-2 border-black shadow-comic-sm rounded flex items-center justify-center text-black hover:bg-comic-yellow transition">
              <i className="fa-brands fa-tiktok text-xs"></i>
            </a>
            <a href="#" className="w-7 h-7 bg-white border-2 border-black shadow-comic-sm rounded flex items-center justify-center text-black hover:bg-comic-yellow transition">
              <i className="fa-brands fa-discord text-xs"></i>
            </a>
          </div>
        </div>
      </div>
      
      {/* Studio Image Placeholder */}
      <div className="border-[3.5px] border-black shadow-comic rounded-xl overflow-hidden h-[180px] relative">
        <img 
          alt="HQ Manga Studio Workspace" 
          className="w-full h-full object-cover" 
          src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80" 
        />
        <div className="absolute bottom-2 right-2 bg-comic-yellow border-2 border-black shadow-comic-sm px-2 py-0.5 rounded font-black text-[10px] font-comic">
          📍 STUDIO & SHOWROOM CHÍNH
        </div>
      </div>
    </div>
  );
}
