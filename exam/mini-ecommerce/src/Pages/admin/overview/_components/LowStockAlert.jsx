import React from "react";
import { formatCurrency } from "../../../../Utils/format";
import { useNavigate } from "react-router-dom";

export default function LowStockAlert({ products }) {
  const navigate = useNavigate();
  const lowStockProducts = products.filter(p => p.stock <= 15).sort((a, b) => a.stock - b.stock);

  if (lowStockProducts.length === 0) return null;

  return (
    <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col font-bubble mb-8 overflow-hidden">
      <div className="p-4 border-b-[3px] border-black bg-red-600 flex items-center justify-between">
        <h2 className="font-comic text-lg uppercase text-white font-black flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation text-comic-yellow animate-pulse"></i> CẢNH BÁO TỒN KHO THẤP
        </h2>
        <span className="bg-white text-red-600 font-comic text-[10px] px-2 py-0.5 border-[2px] border-black font-bold uppercase shadow-[2px_2px_0px_#000]">
          {lowStockProducts.length} SẢN PHẨM
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-50 border-b-[2px] border-black">
              <th className="p-3 font-comic font-black uppercase text-sm border-r-[2px] border-black whitespace-nowrap">Ảnh</th>
              <th className="p-3 font-comic font-black uppercase text-sm border-r-[2px] border-black">Sản Phẩm</th>
              <th className="p-3 font-comic font-black uppercase text-sm border-r-[2px] border-black">Phân Loại</th>
              <th className="p-3 font-comic font-black uppercase text-sm border-r-[2px] border-black text-center">Tồn Kho</th>
              <th className="p-3 font-comic font-black uppercase text-sm text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y-[2px] divide-black">
            {lowStockProducts.map(product => (
              <tr key={product.id} className="hover:bg-red-50 transition-colors bg-white group">
                <td className="p-3 border-r-[2px] border-black">
                  <div className="w-12 h-16 border-[2px] border-black shadow-[2px_2px_0px_#000] overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://placehold.co/100x150?text=No+Img"; }}
                    />
                  </div>
                </td>
                <td className="p-3 border-r-[2px] border-black">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-500 mb-0.5">#{product.sku || product.id}</span>
                    <span className="font-bold text-sm leading-tight text-red-700">{product.name}</span>
                    <span className="text-xs font-bold text-blue-600 mt-0.5">{formatCurrency(product.price)}</span>
                  </div>
                </td>
                <td className="p-3 border-r-[2px] border-black text-xs font-bold">
                  <div className="flex flex-col gap-1">
                    <span className="bg-gray-100 px-2 py-0.5 border border-black inline-block w-fit">{product.category}</span>
                    <span className="bg-purple-100 px-2 py-0.5 border border-black inline-block w-fit">{product.publisher}</span>
                  </div>
                </td>
                <td className="p-3 border-r-[2px] border-black text-center">
                  <span className={"font-comic font-black text-lg px-2 border-[2px] border-black shadow-[2px_2px_0px_#000] inline-block $({product.stock === 0 ? 'bg-red-500 text-white' : 'bg-comic-yellow text-red-600'})}"}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => navigate(`/admin/products?highlight=${product.id}`)}
                    className="px-3 py-1.5 bg-blue-500 text-white font-comic text-xs uppercase border-[2px] border-black shadow-[2px_2px_0px_#000] hover:bg-blue-600 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all"
                  >
                    Xử Lý Ngay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
