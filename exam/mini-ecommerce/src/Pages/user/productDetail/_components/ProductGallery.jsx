import React from "react";

export default function ProductGallery({ product }) {
  return (
    <div className="lg:col-span-5 flex flex-col md:flex-row gap-4">
      <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
        {/* Thumbnails (Tĩnh/Trang trí) */}
        <div className="flex md:flex-col gap-3 justify-center">
          <button className="w-16 h-20 rounded-lg comic-border-sm bg-comic-yellow/20 p-1 comic-shadow-sm ring-2 ring-comic-yellow overflow-hidden flex flex-col items-center justify-center text-center leading-none transition hover:scale-105">
            <span className="text-2xl">📦</span>
            <span className="text-[9px] font-black mt-1 text-stone-800">Bìa Chính</span>
          </button>
          <button className="w-16 h-20 rounded-lg comic-border-sm bg-stone-100 p-1 comic-shadow-sm hover:ring-2 hover:ring-black overflow-hidden flex flex-col items-center justify-center text-center leading-none transition hover:scale-105">
            <span className="text-2xl">📖</span>
            <span className="text-[9px] font-black mt-1 text-stone-800">Mở Phẳng</span>
          </button>
        </div>
        
        {/* Ảnh chính */}
        <div className="flex-1 relative bg-gradient-to-br from-stone-900 via-stone-800 to-black comic-border rounded-xl p-6 flex flex-col items-center justify-center min-h-[420px] overflow-hidden group">
          <div className="absolute inset-0 halftone-dots-white opacity-10 pointer-events-none"></div>
          
          {product.status && (
            <div className="absolute top-3 left-3 bg-comic-red text-white font-comic text-sm px-3 py-1 rounded comic-border-sm shadow-comic-sm -rotate-3 z-10 animate-pulse">
              💥 {product.status}
            </div>
          )}
          
          <div className="absolute top-3 right-3 bg-comic-yellow text-black font-black text-xs px-2.5 py-1 rounded comic-border-sm shadow-comic-sm z-10 font-bubble">
            HOT DEAL
          </div>

          <div className="relative w-64 h-80 bg-white rounded-2xl comic-border shadow-comic-lg p-2 flex flex-col justify-center z-10 transform group-hover:scale-105 transition duration-300">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                <i className="fa-solid fa-image text-5xl text-stone-300"></i>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-3 right-3 text-[10px] font-bold text-stone-300 flex items-center gap-1 z-10">
            <span className="bg-black/70 px-2.5 py-1 rounded comic-border-sm font-bubble">🔍 Hover để phóng to</span>
          </div>
        </div>
      </div>
    </div>
  );
}
