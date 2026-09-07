import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProducts } from "../../Services/queries/useProducts";
import ProductGallery from "./_components/ProductGallery";
import ProductInfo from "./_components/ProductInfo";
import ProductCartAction from "./_components/ProductCartAction";
import ProductTabs from "./_components/ProductTabs";
import RelatedProducts from "./_components/RelatedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: products = [], isLoading } = useGetProducts();
  
  const product = products.find(p => p.id === id);

  // Scroll to top khi mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-comic text-2xl text-stone-500 animate-pulse">
        ĐANG TẢI THÔNG TIN ẤN PHẨM... 💥
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <i className="fa-regular fa-face-frown text-5xl text-stone-400 mb-4"></i>
        <h2 className="font-comic text-3xl text-stone-900 mb-3">KHÔNG TÌM THẤY ẤN PHẨM!</h2>
        <p className="font-bubble text-stone-600 mb-6 font-bold">Cuốn truyện này có thể đã bị Gomu Gomu no Mi xóa sổ khỏi Database...</p>
        <Link to="/products" className="bg-comic-yellow text-stone-900 font-comic px-6 py-2 comic-border shadow-comic hover:bg-stone-900 hover:text-white transition">
          QUAY LẠI KHO TRUYỆN ❯
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Announcement Bar giả lập cho đẹp giống HTML */}
      <aside className="bg-comic-red text-white comic-border-sm border-t-0 border-x-0 py-1.5 px-4 font-bold text-xs uppercase tracking-wider font-bubble">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-comic-yellow text-black px-2 py-0.5 rounded font-black comic-border-sm shadow-comic-sm animate-pulse text-[11px]">⚡ FLASH DEAL!</span>
            <span>Mừng Ra Mắt Siêu Phẩm: Tặng Ngay Bao Da Manga Độc Quyền!</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <div className="flex items-center gap-1 hidden md:flex">
              <span>KẾT THÚC TRONG:</span>
              <span className="bg-black text-comic-yellow px-1.5 py-0.5 rounded comic-border-sm font-mono">02D</span>:
              <span className="bg-black text-comic-yellow px-1.5 py-0.5 rounded comic-border-sm font-mono">14H</span>
            </div>
            <Link to="/products" className="bg-black text-white hover:bg-comic-yellow hover:text-black transition px-2.5 py-0.5 comic-border-sm rounded text-[10px]">SHOP NOW ➔</Link>
          </div>
        </div>
      </aside>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-xs font-bold text-stone-600 flex flex-wrap items-center gap-2 font-bubble">
        <Link to="/" className="hover:underline hover:text-stone-900">Trang Chủ</Link>
        <span>/</span>
        <Link to="/products" className="hover:underline hover:text-stone-900">Kho Truyện</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:underline hover:text-stone-900">{product.category}</Link>
        <span>/</span>
        <span className="text-black bg-yellow-300 px-2 py-0.5 rounded comic-border-sm font-black truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-2">
        {/* Khối Thông Tin Chính */}
        <section className="bg-white rounded-xl comic-border shadow-comic-lg p-4 lg:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
            <ProductCartAction product={product} />
          </div>
        </section>

        {/* Khối Tabs (Mô tả & Thông số) */}
        <ProductTabs product={product} />

        {/* Khối Sản phẩm liên quan */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </main>
    </div>
  );
}
