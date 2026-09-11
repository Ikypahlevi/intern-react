import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProducts } from "../../../Services/queries/useProducts";
import ProductCard from "../../../Components/user/ProductCard/ProductCard";
import ProductsHeroBanner from "./_components/ProductsHeroBanner";
import ProductsFilterSidebar from "./_components/ProductsFilterSidebar";
import Pagination from "./_components/Pagination";

export default function ProductsList() {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const { data: products = [], isLoading } = useGetProducts();

  // State Quản lý bộ lọc
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: categoryQuery ? [categoryQuery] : [],
    publishers: [],
    statuses: [],
    priceRange: [0, 2500000],
    minRating: 0,
  });

  // State Sắp xếp
  const [sortBy, setSortBy] = useState("hot");

  // State Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Cập nhật filter khi URL thay đổi (Bấm từ menu xuống)
  useEffect(() => {
    if (categoryQuery) {
      setFilters(prev => ({ ...prev, categories: [categoryQuery] }));
    }
  }, [categoryQuery]);

  // Trích xuất các option duy nhất từ mảng API cho menu động
  const availableCategories = useMemo(() => [...new Set(products.map(p => p.category).filter(Boolean))], [products]);
  const availablePublishers = useMemo(() => [...new Set(products.map(p => p.publisher).filter(Boolean))], [products]);
  const availableStatuses = useMemo(() => [...new Set(products.map(p => p.status).filter(Boolean))], [products]);

  // Xử lý Lọc dữ liệu
  const filteredProducts = useMemo(() => {
    let result = products;

    // Lọc theo thanh tìm kiếm Header
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(lowerQuery) || (p.description && p.description.toLowerCase().includes(lowerQuery))
      );
    }

    // Lọc Categories
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }
    // Lọc Publishers
    if (filters.publishers.length > 0) {
      result = result.filter(p => filters.publishers.includes(p.publisher));
    }
    // Lọc Statuses
    if (filters.statuses.length > 0) {
      result = result.filter(p => filters.statuses.includes(p.status));
    }
    // Lọc Price
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    
    // Lọc Rating
    if (filters.minRating > 0) {
      result = result.filter(p => (p.rating || 5) >= filters.minRating);
    }

    // Sắp xếp
    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, searchQuery, filters, sortBy]);

  // Reset trang về 1 nếu filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

  // Xử lý Phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <ProductsHeroBanner />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Cột trái: Bộ Lọc */}
        <ProductsFilterSidebar 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters} 
          setFilters={setFilters}
          availableCategories={availableCategories}
          availablePublishers={availablePublishers}
          availableStatuses={availableStatuses}
        />

        {/* Cột phải: Danh sách sản phẩm */}
        <section className="lg:col-span-3 space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white comic-border p-3 shadow-comic flex flex-wrap items-center justify-between gap-3 font-bubble">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden bg-comic-yellow text-black comic-border-sm px-3 py-1 font-comic text-sm flex items-center gap-2 shadow-comic-sm hover:bg-comic-gold"
              >
                <i className="fa-solid fa-filter"></i>
                <span>Lọc</span>
              </button>
              <span className="font-comic text-xl text-stone-900 ml-2">DANH SÁCH ẤN PHẨM</span>
              <span className="bg-stone-100 comic-border-sm px-2 py-0.5 text-xs font-bold text-stone-700">
                {filteredProducts.length} Sản Phẩm
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="text-stone-500 uppercase">Sắp xếp:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="comic-border-sm bg-white text-xs font-bold py-1 px-2.5 focus:ring-0 focus:border-stone-900 cursor-pointer"
                >
                  <option value="hot">🔥 Nổi Bật & Bán Chạy</option>
                  <option value="price_asc">Giá Thấp Đến Cao</option>
                  <option value="price_desc">Giá Cao Đến Thấp</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid Sản Phẩm */}
          {isLoading ? (
            <div className="font-comic text-2xl text-center py-20 animate-pulse text-stone-500">
              ĐANG TẢI TRUYỆN TRANH... 💥
            </div>
          ) : currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white comic-border shadow-comic p-10 text-center">
              <i className="fa-regular fa-face-frown text-5xl text-stone-300 mb-4 block"></i>
              <h3 className="font-comic text-2xl text-stone-800 mb-2">KHÔNG TÌM THẤY TRUYỆN NÀO!</h3>
              <p className="font-bubble text-stone-600 font-bold">Thử điều chỉnh lại bộ lọc xem sao nhé.</p>
            </div>
          )}

          {/* Phân Trang */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </section>
      </div>
    </main>
  );
}
