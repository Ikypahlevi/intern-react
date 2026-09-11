import React, { useMemo } from "react";
import ProductCard from "../../../../Components/user/ProductCard/ProductCard";
import { useGetProducts } from "../../../../Services/queries/useProducts";
import { Link } from "react-router-dom";

export default function RelatedProducts({ currentProductId, category }) {
  const { data: allProducts = [] } = useGetProducts();

  const related = useMemo(() => {
    return allProducts
      .filter(p => p.category === category && p.id !== currentProductId)
      .slice(0, 5); // Lấy 5 cuốn cùng loại
  }, [allProducts, category, currentProductId]);

  if (related.length === 0) return null;

  return (
    <section className="bg-white rounded-xl comic-border shadow-comic-lg p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h2 className="text-xl font-comic tracking-wide text-stone-900 uppercase">
            MANGA CÙNG THỂ LOẠI BẠN SẼ THÍCH
          </h2>
        </div>
        <Link 
          to={`/products?category=${category}`} 
          className="font-bubble text-xs font-bold bg-comic-yellow px-3 py-1 comic-border-sm hover:bg-stone-900 hover:text-white transition"
        >
          XEM THÊM ❯
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
