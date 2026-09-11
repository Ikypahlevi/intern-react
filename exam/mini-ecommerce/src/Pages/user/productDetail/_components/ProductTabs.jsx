import React, { useState } from "react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("desc");

  return (
    <section className="bg-white rounded-xl comic-border shadow-comic-lg p-6 mb-8">
      <div className="flex border-b-2 border-stone-900 gap-2 pb-0 mb-6 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab("desc")}
          className={`${activeTab === "desc" ? "bg-comic-yellow text-black border-b-0 -mb-[2px] z-10" : "bg-stone-100 hover:bg-stone-200 text-stone-700 comic-border-sm border-b-0 opacity-80"} font-comic tracking-wide text-lg px-6 py-2 rounded-t-lg transition-colors border-3 border-black`}
        >
          📖 MÔ TẢ CHI TIẾT
        </button>
        <button 
          onClick={() => setActiveTab("specs")}
          className={`${activeTab === "specs" ? "bg-comic-yellow text-black border-b-0 -mb-[2px] z-10" : "bg-stone-100 hover:bg-stone-200 text-stone-700 comic-border-sm border-b-0 opacity-80"} font-comic tracking-wide text-lg px-6 py-2 rounded-t-lg transition-colors border-3 border-black`}
        >
          ⚙️ THÔNG SỐ CƠ BẢN
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === "desc" && (
          <div className="prose max-w-none text-stone-700 text-sm leading-relaxed font-bubble">
            <p className="font-bold text-base text-stone-900 mb-2">
              {product.name}
            </p>
            <p className="whitespace-pre-line">
              {product.description || "Chưa có bài viết mô tả cho ấn phẩm này."}
            </p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-stone-50 rounded-xl comic-border font-bubble">
            <div className="space-y-2 text-xs font-bold text-stone-700">
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span>Tên ấn phẩm:</span>
                <span className="text-stone-900 font-extrabold text-right max-w-[60%]">{product.name}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span>Nhà xuất bản:</span>
                <span className="text-stone-900 font-extrabold">{product.publisher || "NXB Liên Kết"}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span>Thể loại:</span>
                <span className="text-stone-900 font-extrabold">{product.category}</span>
              </div>
            </div>
            <div className="space-y-2 text-xs font-bold text-stone-700">
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span>Trạng thái kho:</span>
                <span className="text-stone-900 font-extrabold">{product.stock > 0 ? "Còn hàng" : "Hết hàng"}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span>Hình thức bìa:</span>
                <span className="text-stone-900 font-extrabold">Bìa mềm áo rời (Chuẩn Tankobon)</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span>Đánh giá:</span>
                <span className="text-stone-900 font-extrabold">{product.rating || 5} / 5 Sao</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
