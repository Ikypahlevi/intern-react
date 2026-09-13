import React from "react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "../../../../Stores/wishlistStore";
import ProductCard from "../../../../Components/user/ProductCard/ProductCard";

export default function WishlistTab() {
  const { items } = useWishlistStore();

  return (
    <div className="bg-white border-[3px] border-black shadow-comic-lg p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-4">
        <i className="fa-solid fa-heart text-comic-red text-3xl"></i>
        <h2 className="text-3xl font-comic text-black uppercase tracking-wide">
          SẢN PHẨM YÊU THÍCH ({items.length})
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <i className="fa-regular fa-face-frown-open text-6xl text-gray-300 mb-4"></i>
          <h3 className="font-comic text-2xl text-stone-800 mb-2">CHƯA CÓ TRUYỆN NÀO!</h3>
          <p className="font-bubble text-stone-600 mb-6">
            Bạn chưa lưu bất kỳ tựa truyện nào vào danh sách yêu thích cả.
          </p>
          <Link to="/products" className="inline-block bg-comic-yellow font-comic text-stone-900 border-2 border-black px-6 py-2 shadow-comic hover:bg-stone-900 hover:text-white transition-colors">
            ĐI KHÁM PHÁ NGAY!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
