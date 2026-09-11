import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Large Dark Hero Banner */}
        <div className="lg:col-span-8 halftone-dark rounded-2xl comic-border-thick shadow-comic-xl p-6 sm:p-10 relative flex flex-col justify-between text-white min-h-[420px] overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="relative z-10 max-w-md">
            <div className="inline-block bg-comic-yellow text-comic-ink font-comic text-sm tracking-widest px-3 py-1 rounded-md comic-border shadow-comic-sm mb-3 transform -rotate-2">
              ⭐ 100% MANGA BẢN QUYỀN CHÍNH HÃNG ⭐
            </div>
            
            <h2 className="font-comic text-4xl sm:text-6xl tracking-wide leading-none mb-3 text-white drop-shadow-[2px_2px_0px_#000]">
              <span className="text-comic-yellow underline decoration-wavy decoration-comic-orange">NÂNG CẤP</span> BỘ SƯU TẬP MANGA CỦA BẠN!
            </h2>
            
            <div className="bg-white/95 text-stone-900 comic-border-sm rounded-xl p-3 shadow-comic font-bubble text-xs sm:text-sm font-bold mb-6 leading-snug transform rotate-1">
              💬 "Kho tàng manga bản quyền cực chất! Từ One Piece, Jujutsu Kaisen đến Chainsaw Man & Spy x Family – Bọc màng co siêu chuẩn!"
            </div>
            
            <div className="flex items-center flex-wrap gap-4">
              <Link to="/products" className="bg-comic-yellow hover:bg-comic-gold text-comic-ink font-comic text-xl px-7 py-3 rounded-xl comic-border shadow-comic-md comic-btn-hover transition-transform flex items-center gap-2">
                <span>KHÁM PHÁ NGAY</span>
                <i className="fa-solid fa-bolt text-comic-red"></i>
              </Link>
              <span className="font-comic text-xl tracking-wider text-comic-yellow bg-stone-900/80 px-3 py-1.5 rounded-lg comic-border-sm shadow-comic-sm">💥 Chỉ từ 20.000₫</span>
            </div>
          </div>
          
          {/* Decorative Comic Mockups */}
          <div className="absolute right-4 bottom-4 sm:right-8 sm:bottom-6 flex items-end gap-3 z-10 hidden md:flex">
            <div className="w-32 h-48 sm:w-44 sm:h-64 bg-comic-orange comic-border-thick rounded-xl flex flex-col items-center justify-between p-3 text-center shadow-comic-lg transform rotate-3 hover:rotate-0 transition-transform">
              <div className="bg-comic-yellow text-black font-comic text-xs px-2 py-0.5 rounded comic-border-sm">SHONEN JUMP</div>
              <i className="fa-solid fa-skull-crossbones text-5xl text-white my-2 drop-shadow-[2px_2px_0px_#000]"></i>
              <div className="bg-stone-900 text-white p-1.5 rounded comic-border-sm w-full">
                <span className="font-comic text-sm uppercase text-comic-yellow block leading-tight">ONE PIECE #108</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Promo Cards */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="halftone-yellow rounded-2xl comic-border-thick p-5 shadow-comic-lg flex items-center justify-between relative overflow-hidden flex-1 group">
            <div className="z-10 max-w-[65%]">
              <span className="bg-comic-red text-white font-comic text-xs px-2 py-0.5 rounded comic-border-sm shadow-comic-sm tracking-wider uppercase inline-block -rotate-2">
                💥 SAVE UP TO 25%!
              </span>
              <h3 className="font-comic text-2xl text-stone-900 leading-tight mt-2">
                MANGA KINH ĐIỂN & BOXSET SƯU TẦM!
              </h3>
              <Link to="/products" className="inline-flex items-center gap-1 mt-3 font-comic text-base text-stone-900 bg-white px-3 py-1 rounded-lg comic-border-sm shadow-comic-sm hover:bg-comic-orange hover:text-white comic-btn-hover">
                SĂN DEAL NGAY ➔
              </Link>
            </div>
            <div className="w-24 h-28 bg-white comic-border rounded-xl flex flex-col items-center justify-center text-stone-900 p-2 shadow-comic transform group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-dragon text-4xl text-comic-orange mb-1"></i>
            </div>
          </div>

          <div className="bg-comic-cyan/30 rounded-2xl comic-border-thick p-5 shadow-comic-lg flex items-center justify-between relative overflow-hidden flex-1 group">
            <div className="z-10 max-w-[65%]">
              <span className="bg-comic-ink text-comic-yellow font-comic text-xs px-2 py-0.5 rounded comic-border-sm shadow-comic-sm tracking-wider uppercase inline-block rotate-1">
                ⚡ NEW ARRIVALS
              </span>
              <h3 className="font-comic text-2xl text-stone-900 leading-tight mt-2">
                LIGHT NOVEL & ARTBOOK MỚI NHẤT!
              </h3>
              <Link to="/products" className="inline-flex items-center gap-1 mt-3 font-comic text-base text-stone-900 bg-white px-3 py-1 rounded-lg comic-border-sm shadow-comic-sm hover:bg-comic-ink hover:text-comic-yellow comic-btn-hover">
                KHÁM PHÁ NGAY ➔
              </Link>
            </div>
            <div className="w-24 h-28 bg-white comic-border rounded-xl flex flex-col items-center justify-center text-stone-900 p-2 shadow-comic transform group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-wand-magic-sparkles text-4xl text-comic-red mb-1"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
