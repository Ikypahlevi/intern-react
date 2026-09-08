import React from "react";
import { Link } from "react-router-dom";

export default function TopBestsellers({ products }) {
  // Sort products by sold descending, take top 4
  const topProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 4);

  return (
    <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col h-full font-bubble">
      <div className="p-4 border-b-[3px] border-black bg-blue-300 flex items-center justify-between">
        <h2 className="font-comic text-lg uppercase text-black font-black flex items-center gap-2">
          <i className="fa-solid fa-crown text-comic-yellow drop-shadow-[1px_1px_0_#000]"></i> TOP MANGA
        </h2>
        <Link to="/admin/products" className="font-bold text-xs uppercase underline hover:text-red-600">Kho</Link>
      </div>
      <div className="p-4 flex flex-col gap-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-3 p-2 border-[2px] border-black hover:bg-yellow-50 transition-colors shadow-[2px_2px_0px_#000]">
            <div className={`w-8 h-8 flex items-center justify-center font-comic font-black text-white border-[2px] border-black shadow-[2px_2px_0px_#000] ${
              index === 0 ? 'bg-comic-yellow text-black' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-orange-400' : 'bg-gray-800'
            }`}>
              #{index + 1}
            </div>
            <img src={product.image} alt={product.name} className="w-10 h-14 object-cover border-[2px] border-black" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate" title={product.name}>{product.name}</h3>
              <p className="font-comic text-xs text-red-600 font-bold">{product.price.toLocaleString()}₫</p>
            </div>
            <div className="text-right">
              <div className="font-black text-lg">{product.sold}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase">Đã Bán</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
