import React from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useGetProducts } from "../../../Services/queries/useProducts";

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = useGetProducts();

  // Lấy 5 sản phẩm đầu tiên giả lập "Nổi bật"
  const featured = products.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5 border-b-4 border-stone-900 pb-2">
        <div className="flex items-center gap-2">
          <span className="bg-comic-orange text-white font-comic text-sm px-2 py-0.5 rounded comic-border-sm shadow-comic-sm">TOP PICKS</span>
          <h3 className="font-comic text-3xl text-stone-900 tracking-wide">MANGA NỔI BẬT ĐƯỢC SĂN ĐÓN</h3>
        </div>
      </div>

      {isLoading ? (
        <div className="font-comic text-2xl text-center py-10">ĐANG TẢI TRUYỆN TRANH... 💥</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
