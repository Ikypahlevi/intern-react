import React from "react";
import { formatCurrency } from "../../../../Utils/format";

export default function ProductInfo({ product }) {
  const originalPrice = product.price * 1.15;
  const renderStars = (rating) => "★".repeat(rating || 5) + "☆".repeat(5 - (rating || 5));

  return (
    <div className="lg:col-span-4 flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2 font-bubble">
          <span className="bg-purple-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded comic-border-sm">
            BẢN SƯU TẦM
          </span>
          <span className="bg-comic-yellow text-black text-[11px] font-black px-2 py-0.5 rounded comic-border-sm">
            {product.publisher || "NXB CHÍNH HÃNG"}
          </span>
          <span className="text-xs font-bold text-stone-500">
            SKU: {product.id ? `SWOO-VOL${product.id}` : "SWOO-COMIC"}
          </span>
        </div>
        
        <h1 className="font-comic text-3xl tracking-wide text-stone-900 leading-tight uppercase mb-3">
          {product.name}
        </h1>
        
        <div className="text-xs font-bold text-stone-600 flex flex-wrap gap-x-4 gap-y-2 font-bubble">
          <span>Thể loại: <strong className="text-stone-900 font-extrabold">{product.category}</strong></span>
          <span>Nhà xuất bản: <strong className="text-stone-900 font-extrabold">{product.publisher || "Đang cập nhật"}</strong></span>
          <span>Tình trạng: <strong className={product.stock > 0 ? "text-green-700 font-black" : "text-red-600 font-black"}>
            ● {product.stock > 0 ? "Còn hàng (Sẵn sàng giao)" : "Hết hàng"}
          </strong></span>
        </div>
        
        <div className="flex items-center gap-2 mt-3 font-bubble">
          <div className="flex text-yellow-500 text-sm">{renderStars(product.rating)}</div>
          <span className="font-black text-xs text-stone-900">{product.rating || 5}.0 / 5.0</span>
          <span className="text-xs text-stone-500 font-semibold">(99+ đánh giá từ Otaku Club)</span>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg comic-border flex items-baseline gap-3">
          <span className="font-comic text-4xl text-comic-red">{formatCurrency(product.price)}</span>
          <span className="text-sm font-bold text-stone-400 line-through font-bubble">{formatCurrency(originalPrice)}</span>
          <span className="bg-comic-red text-white text-[11px] font-black px-2 py-0.5 rounded comic-border-sm font-bubble">
            TIẾT KIỆM 15%
          </span>
        </div>
        
        <ul className="text-xs space-y-2 mt-4 font-semibold text-stone-700 font-bubble">
          <li className="flex items-center gap-1.5">
            <span className="text-green-600 font-black text-lg">✔</span> <strong>Quà đính kèm:</strong> Bookmark & Poster độc quyền (Nếu có)
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-green-600 font-black text-lg">✔</span> <strong>Công nghệ in:</strong> Eco Soy-Ink mực đậu nành sắc nét cực đại
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-green-600 font-black text-lg">✔</span> <strong>Bản quyền:</strong> Nhập khẩu và phát hành chính hãng 100%
          </li>
        </ul>
      </div>

      <div className="mt-6 p-3 bg-green-50 rounded-lg comic-border border-dashed flex items-center gap-3">
        <div className="text-3xl">🎁</div>
        <div className="text-xs leading-snug font-bubble">
          <strong className="text-green-800 font-black uppercase block">Đặc Quyền Hội Viên Manga Club:</strong>
          <span>Tích lũy điểm Hero Points, đổi huy hiệu Shonen độc quyền và freeship đơn từ 200.000₫!</span>
        </div>
      </div>
    </div>
  );
}
