import React, { useMemo } from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useGetProducts } from "../../../Services/queries/useProducts";
import { Link } from "react-router-dom";

export default function CartSuggestions({ cartItems }) {
  const { data: allProducts = [] } = useGetProducts();

  const suggestedProducts = useMemo(() => {
    if (allProducts.length === 0) return [];
    
    // Tìm các ID đang có trong giỏ để không gợi ý trùng lặp
    const cartItemIds = cartItems.map(item => item.id);
    
    // Lấy category của sản phẩm đầu tiên trong giỏ làm cơ sở (nếu có)
    const targetCategory = cartItems.length > 0 ? cartItems[0].category : null;

    let suggestions = [];
    if (targetCategory) {
      // Ưu tiên gợi ý truyện cùng thể loại
      suggestions = allProducts.filter(p => 
        p.category === targetCategory && !cartItemIds.includes(p.id)
      );
    }

    // Nếu không đủ 5 cuốn cùng thể loại, lấy thêm các truyện ngẫu nhiên khác bù vào
    if (suggestions.length < 5) {
      const moreProducts = allProducts.filter(p => 
        !cartItemIds.includes(p.id) && !suggestions.find(s => s.id === p.id)
      );
      // Lấy ngẫu nhiên
      const shuffled = [...moreProducts].sort(() => 0.5 - Math.random());
      suggestions = [...suggestions, ...shuffled].slice(0, 5);
    }

    return suggestions.slice(0, 5);
  }, [allProducts, cartItems]);

  if (suggestedProducts.length === 0) return null;

  return (
    <section className="bg-white rounded-xl comic-border shadow-comic-lg p-5 mt-8 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h2 className="text-xl font-comic tracking-wide text-stone-900 uppercase">
            CÓ THỂ BẠN SẼ THÍCH (THƯỜNG MUA CÙNG MÓN NÀY)
          </h2>
        </div>
        <Link 
          to="/products" 
          className="font-bubble text-xs font-bold bg-comic-yellow px-3 py-1 comic-border-sm hover:bg-stone-900 hover:text-white transition"
        >
          XEM KHO TRUYỆN ❯
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {suggestedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
