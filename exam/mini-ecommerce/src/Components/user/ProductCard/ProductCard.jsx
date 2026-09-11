import React from "react";
import { useCartStore } from "../../Stores/cartStore";
import { formatCurrency } from "../../Utils/format";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng! 💥`);
  };

  const renderStars = (rating) => {
    const num = rating || 5; 
    return "★".repeat(num) + "☆".repeat(5 - num);
  };

  const originalPrice = product.price * 1.15;

  return (
    <div className="bg-white comic-border shadow-comic hover:shadow-comic-lg hover:-translate-y-1 transition-all flex flex-col justify-between p-3 relative group h-full">
      <div className="absolute top-2 left-2 z-10 bg-comic-red text-white font-comic text-xs px-2 py-0.5 comic-border-sm shadow-comic-sm">
        {product.status ? product.status.split(' ')[0].toUpperCase() : 'HOT! 🔥'}
      </div>
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-48 bg-zinc-100 comic-border-sm mb-3 relative overflow-hidden group-hover:bg-comic-yellow/30 transition-colors">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="fa-solid fa-book-open text-4xl text-stone-300"></i>
            </div>
          )}
          
          <span className="absolute bottom-1 left-1 text-[10px] bg-comic-yellow text-stone-900 px-1.5 font-bold comic-border-sm">
            {product.publisher || 'NXB CHÍNH HÃNG'}
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-500">
          <span>{renderStars(product.rating)}</span>
          <span className="text-stone-500 font-bubble">(99+)</span>
        </div>
        
        <h4 className="font-bubble font-black text-xs mt-1 leading-snug line-clamp-2 group-hover:text-comic-red transition-colors" title={product.name}>
          {product.name}
        </h4>
        
        <div className={`text-[11px] font-bold mt-1 font-comic ${product.stock > 0 ? "text-green-700" : "text-red-500"}`}>
          {product.stock > 0 ? "✓ CÒN HÀNG" : "✗ HẾT HÀNG"}
        </div>
      </Link>
      
      <div className="pt-3 border-t-2 border-dashed border-stone-300 mt-2">
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-comic text-lg text-comic-red font-black">{formatCurrency(product.price)}</span>
          <span className="text-xs text-stone-400 line-through font-bubble">{formatCurrency(originalPrice)}</span>
        </div>
        <Button 
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="w-full !rounded flex items-center justify-center gap-1"
        >
          <span>{product.stock > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}</span> ⚡
        </Button>
      </div>
    </div>
  );
}
