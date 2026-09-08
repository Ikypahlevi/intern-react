import React from "react";

export default function LowStockAlert({ products }) {
  const lowStockProducts = products.filter(p => p.stock <= 15).sort((a, b) => a.stock - b.stock);

  if (lowStockProducts.length === 0) return null;

  return (
    <div className="bg-red-50 border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col font-bubble mb-8">
      <div className="p-4 border-b-[3px] border-black bg-red-600 flex items-center justify-between">
        <h2 className="font-comic text-lg uppercase text-white font-black flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation text-comic-yellow animate-pulse"></i> CẢNH BÁO TỒN KHO THẤP
        </h2>
        <span className="bg-white text-red-600 font-comic text-[10px] px-2 py-0.5 border-[2px] border-black font-bold uppercase shadow-[2px_2px_0px_#000]">
          SẮP HẾT HÀNG
        </span>
      </div>
      <div className="p-4 overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {lowStockProducts.map(product => (
            <div key={product.id} className="min-w-[200px] max-w-[250px] bg-white border-[2px] border-black p-3 shadow-[3px_3px_0px_#000] flex items-center gap-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all">
              <img src={product.image} className="w-12 h-16 object-cover border-[2px] border-black" alt={product.name} />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold truncate" title={product.name}>{product.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-comic text-sm font-black text-red-600 border border-red-600 px-1">
                    Còn {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
