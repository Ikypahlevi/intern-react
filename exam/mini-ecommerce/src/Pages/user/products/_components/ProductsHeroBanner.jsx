import React from "react";
import Button from "../../../../Components/user/Button/Button";
import { Link } from "react-router-dom";

export default function ProductsHeroBanner() {
  return (
    <>
      {/* Top Hero Banner */}
      <section className="relative comic-border-thick bg-gradient-to-r from-zinc-800 via-zinc-900 to-black text-white p-6 md:p-8 mb-8 shadow-comic-lg overflow-hidden">
        <div className="absolute inset-0 halftone-dots-white pointer-events-none"></div>
        <div className="absolute top-8 md:top-6 left-4 md:left-6 z-10 bg-comic-yellow text-black font-comic text-sm tracking-wider px-3 py-1 comic-border shadow-comic -rotate-3">
          💥 ĐẠI HỘI MANGA SHONEN & SEINEN
        </div>
        <div className="absolute -bottom-4 right-12 z-10 bg-comic-red text-white font-comic text-xl tracking-wider px-5 py-2 comic-border shadow-comic rotate-3 hidden sm:block">
          GIẢM TỚI 50% TẤT CẢ!
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-3 mt-8 md:mt-4">
            <span className="text-comic-cyan font-bubble font-black tracking-widest text-xs uppercase bg-black/60 px-2 py-1 comic-border-sm">
              Bản Quyền Chính Hãng 100% Kim Đồng - Trẻ - IPM
            </span>
            <h1 className="font-comic text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-comic-yellow drop-shadow-[3px_3px_0px_#000000] leading-none">
              ĐẠI HỘI MANGA SHONEN & SEINEN 2026
            </h1>
            <p className="text-xs sm:text-sm font-medium text-gray-300 font-bubble">
              Siêu ưu đãi bùng nổ - Giảm tới 50% toàn bộ Boxset, ấn phẩm manga One Piece, Jujutsu Kaisen, Chainsaw Man, Berserk, Frieren và phụ kiện Obi, Artbook độc quyền!
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Button variant="primary" size="lg">
                SĂN TRUYỆN NGAY ⚡
              </Button>
              <span className="font-bubble font-black text-xl text-white">
                TRỌN BỘ TỪ 35.000₫
              </span>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl bg-comic-yellow/20 comic-border-thick border-white/40 flex items-center justify-center relative overflow-hidden shadow-comic-lg">
              <img 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80" 
                alt="Manga Festival Covers" 
              />
              <div className="absolute -top-2 right-2 bg-comic-orange text-black font-comic text-xs px-2 py-1 comic-border shadow-comic-sm rotate-12">
                HOT DEAL COMBO!
              </div>
              <div className="absolute bottom-2 -left-4 bg-white text-black font-bubble font-black text-[11px] px-2 py-1 comic-border shadow-comic-sm -rotate-6">
                TẶNG POSTER & OBI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip Bar */}
      <section className="mb-8 comic-border bg-white p-3 shadow-comic">
        <div className="flex items-center justify-between gap-4 overflow-x-auto text-xs font-bubble font-black tracking-wider uppercase py-1 scrollbar-hide">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-comic-yellow comic-border-sm whitespace-nowrap shadow-comic-sm">
            <span>⚡ ĐỐI TÁC CHÍNH HÃNG:</span>
          </div>
          <span className="px-3 py-1 hover:bg-gray-100 comic-border-sm border-transparent hover:border-black transition-all cursor-pointer">SHUEISHA</span>
          <span className="px-3 py-1 hover:bg-gray-100 comic-border-sm border-transparent hover:border-black transition-all cursor-pointer">KODANSHA</span>
          <span className="px-3 py-1 hover:bg-gray-100 comic-border-sm border-transparent hover:border-black transition-all cursor-pointer">KADOKAWA</span>
          <span className="px-3 py-1 hover:bg-gray-100 comic-border-sm border-transparent hover:border-black transition-all cursor-pointer">SONY AUDIO</span>
          <span className="px-3 py-1 hover:bg-gray-100 comic-border-sm border-transparent hover:border-black transition-all cursor-pointer">SQUARE ENIX</span>
          <span className="px-3 py-1 hover:bg-gray-100 comic-border-sm border-transparent hover:border-black transition-all cursor-pointer">NXB KIM ĐỒNG</span>
          <span className="px-3 py-1 hover:bg-gray-100 comic-border-sm border-transparent hover:border-black transition-all cursor-pointer">NXB TRẺ</span>
        </div>
      </section>
    </>
  );
}
