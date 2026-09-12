import React, { useEffect } from "react";

const STATUS_MAP = {
  active: { label: "Đang Bán", color: "bg-green-500 text-white" },
  preorder: { label: "Pre-order", color: "bg-purple-500 text-white" },
  new: { label: "Hàng Mới", color: "bg-blue-500 text-white" },
  paused: { label: "Tạm Dừng", color: "bg-yellow-500 text-black" },
  out_of_stock: { label: "Hết Hàng", color: "bg-red-500 text-white" },
};

export default function ProductDetailModal({ isOpen, onClose, product }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const statusConfig = STATUS_MAP[product.status] || { label: "Không rõ", color: "bg-gray-200 text-gray-800" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#fffdf0] w-full max-w-3xl max-h-[90vh] flex flex-col border-[3px] border-black shadow-[8px_8px_0px_#000] font-bubble animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (NO CLOSE BUTTON) */}
        <div className="bg-comic-yellow p-4 border-b-[3px] border-black flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-white border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
            <i className="fa-solid fa-circle-info text-xl text-blue-600"></i>
          </div>
          <h2 className="font-comic font-black text-2xl uppercase tracking-wide mt-1">
            Chi tiết Sản phẩm
          </h2>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6">
          
          {/* Cột trái: Ảnh */}
          <div className="w-full md:w-1/3 flex flex-col gap-3 shrink-0">
            <div className="relative w-full aspect-[3/4] border-[3px] border-black shadow-[4px_4px_0px_#000] overflow-hidden bg-white">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://placehold.co/400x600?text=No+Image"; }}
              />
              <span className={`absolute top-2 left-2 text-[10px] font-comic font-black px-2 py-1 border-[2px] border-black shadow-[2px_2px_0px_#000] uppercase ${statusConfig.color}`} >
                {statusConfig.label}
              </span>
            </div>
            
            <div className="bg-white border-[2px] border-black p-3 shadow-[3px_3px_0px_#000] flex flex-col items-center justify-center">
               <span className="text-xs font-bold text-gray-500 uppercase">Mã SKU</span>
               <span className="font-comic font-black text-lg">{product.sku}</span>
            </div>
          </div>

          {/* Cột phải: Thông tin */}
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            
            <div>
              <h3 className="font-comic font-black text-2xl md:text-3xl uppercase leading-tight mb-2 text-black">{product.name}</h3>
              <div className="flex flex-wrap gap-2 text-xs font-bold mb-4">
                <span className="bg-blue-100 text-blue-800 border-[2px] border-black px-2 py-1 shadow-[2px_2px_0px_#000]">
                  <i className="fa-solid fa-pen-nib mr-1"></i> {product.author}
                </span>
                <span className="bg-orange-100 text-orange-800 border-[2px] border-black px-2 py-1 shadow-[2px_2px_0px_#000]">
                  <i className="fa-solid fa-building mr-1"></i> {product.publisher}
                </span>
                <span className="bg-purple-100 text-purple-800 border-[2px] border-black px-2 py-1 shadow-[2px_2px_0px_#000]">
                  <i className="fa-solid fa-layer-group mr-1"></i> {product.category}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-[2px] border-black p-3 shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Giá Bán</div>
                <div className="font-comic text-xl text-red-600 font-black">{product.price.toLocaleString()}đ</div>
              </div>
              <div className="bg-white border-[2px] border-black p-3 shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Giá Gốc</div>
                <div className="font-comic text-lg text-gray-400 font-black line-through">{product.originalPrice?.toLocaleString()}đ</div>
              </div>
              <div className="bg-white border-[2px] border-black p-3 shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Tồn Kho</div>
                <div className="font-comic text-xl text-blue-600 font-black">{product.stock} <span className="text-sm font-bold text-gray-600">cuốn</span></div>
              </div>
              <div className="bg-white border-[2px] border-black p-3 shadow-[2px_2px_0px_#000]">
                <div className="text-[10px] text-gray-500 font-bold uppercase">Đã Bán</div>
                <div className="font-comic text-xl text-green-600 font-black">{product.sold} <span className="text-sm font-bold text-gray-600">cuốn</span></div>
              </div>
            </div>

            <div className="mt-2 bg-white border-[2px] border-black p-4 shadow-[3px_3px_0px_#000]">
              <h4 className="font-bold text-sm uppercase mb-2 border-b-[2px] border-black pb-1">Định Dạng</h4>
              <p className="text-sm font-bold text-gray-700">{product.format || "Bản Tiêu Chuẩn"}</p>
            </div>

            <div className="mt-2 bg-white border-[2px] border-black p-4 shadow-[3px_3px_0px_#000]">
              <h4 className="font-bold text-sm uppercase mb-2 border-b-[2px] border-black pb-1">Mô tả</h4>
              <p className="text-sm font-bold text-gray-700 whitespace-pre-line leading-relaxed">
                {product.description || "Chưa có thông tin mô tả cho sản phẩm này."}
              </p>
            </div>
            
          </div>
        </div>

        {/* Footer (ONLY CLOSE BUTTON) */}
        <div className="bg-gray-100 p-4 border-t-[3px] border-black flex items-center justify-end shrink-0">
          <button 
            onClick={onClose}
            className="bg-white text-black font-comic font-black uppercase border-[2px] border-black px-6 py-2 shadow-[3px_3px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#000] transition-all"
          >
            ĐÓNG LẠI
          </button>
        </div>
      </div>
    </div>
  );
}
