import React from "react";
import HeroSection from "./_components/HeroSection";
import FeaturedProducts from "./_components/FeaturedProducts";
import BestSellingSection from "./_components/BestSellingSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* Brands Banner */}
      <section className="max-w-7xl mx-auto px-4 py-2">
        <div className="bg-white rounded-2xl py-3 px-6 comic-border shadow-comic flex flex-wrap items-center justify-between gap-4">
          <span className="font-comic text-sm bg-comic-yellow text-stone-900 px-2.5 py-1 rounded comic-border-sm shadow-comic-sm uppercase">NXB ĐỐI TÁC:</span>
          <span className="font-comic text-xl text-stone-800 hover:text-comic-red hover:scale-110 transition-transform cursor-pointer">★ SHUEISHA</span>
          <span className="font-comic text-xl text-stone-800 hover:text-comic-red hover:scale-110 transition-transform cursor-pointer">★ KODANSHA</span>
          <span className="font-comic text-xl text-stone-800 hover:text-comic-red hover:scale-110 transition-transform cursor-pointer">★ NXB KIM ĐỒNG</span>
          <span className="font-comic text-xl text-stone-800 hover:text-comic-red hover:scale-110 transition-transform cursor-pointer">★ NXB TRẺ</span>
        </div>
      </section>

      <FeaturedProducts />

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 my-6">
        <div className="bg-comic-yellow comic-border-thick rounded-2xl p-4 shadow-comic-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-stone-900">
            <div className="bg-white rounded-xl comic-border-sm p-3 flex items-center gap-2.5 justify-center shadow-comic-sm transform hover:-rotate-1 transition-transform">
              <i className="fa-solid fa-certificate text-2xl text-comic-red"></i>
              <div className="font-comic text-sm sm:text-base leading-tight">100% BẢN QUYỀN<br/><span className="text-xs font-bubble font-bold text-stone-600">CHÍNH HÃNG TỪ NHẬT</span></div>
            </div>
            <div className="bg-white rounded-xl comic-border-sm p-3 flex items-center gap-2.5 justify-center shadow-comic-sm transform hover:rotate-1 transition-transform">
              <i className="fa-solid fa-shield-halved text-2xl text-comic-orange"></i>
              <div className="font-comic text-sm sm:text-base leading-tight">BỌC MÀNG CO<br/><span className="text-xs font-bubble font-bold text-stone-600">CHUẨN TỪNG CUỐN SÁCH</span></div>
            </div>
            <div className="bg-white rounded-xl comic-border-sm p-3 flex items-center gap-2.5 justify-center shadow-comic-sm transform hover:-rotate-1 transition-transform">
              <i className="fa-solid fa-bolt text-2xl text-comic-gold"></i>
              <div className="font-comic text-sm sm:text-base leading-tight">GIAO SIÊU TỐC 2H<br/><span className="text-xs font-bubble font-bold text-stone-600">NỘI THÀNH HỎA TỐC</span></div>
            </div>
            <div className="bg-white rounded-xl comic-border-sm p-3 flex items-center gap-2.5 justify-center shadow-comic-sm transform hover:rotate-1 transition-transform">
              <i className="fa-solid fa-rotate-left text-2xl text-comic-blue"></i>
              <div className="font-comic text-sm sm:text-base leading-tight">ĐỔI TRẢ 7 NGÀY<br/><span className="text-xs font-bubble font-bold text-stone-600">LỖI IN ẤN MIỄN PHÍ</span></div>
            </div>
          </div>
        </div>
      </section>

      <BestSellingSection />
      
    </div>
  );
}
