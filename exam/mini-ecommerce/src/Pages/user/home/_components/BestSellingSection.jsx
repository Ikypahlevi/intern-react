import React from "react";
import ProductCard from "../../../../Components/user/ProductCard/ProductCard";
import { useGetProducts } from "../../../../Services/queries/useProducts";

export default function BestSellingSection() {
  const { data: products = [], isLoading } = useGetProducts();

  // Giả lập lấy 5 sản phẩm random hoặc từ index 5 đến 10
  const bestSellers = products.slice(5, 10);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b-4 border-stone-900 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h3 className="font-comic text-3xl text-stone-900 tracking-wide">MANGA BÁN CHẠY NHẤT</h3>
        </div>
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-comic text-sm">
          <button className="bg-comic-ink text-comic-yellow px-4 py-1.5 rounded-lg comic-border-sm shadow-comic-sm">TẤT CẢ</button>
          <button className="bg-white hover:bg-comic-yellow text-stone-800 px-4 py-1.5 rounded-lg comic-border-sm shadow-comic-sm comic-btn-hover transition">SHONEN</button>
          <button className="bg-white hover:bg-comic-yellow text-stone-800 px-4 py-1.5 rounded-lg comic-border-sm shadow-comic-sm comic-btn-hover transition">SEINEN</button>
        </div>
      </div>

      {isLoading ? (
        <div className="font-comic text-2xl text-center py-10">ĐANG TẢI TRUYỆN TRANH... 💥</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
