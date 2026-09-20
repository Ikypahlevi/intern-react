import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useGetProducts, useGetProductsPaginated } from "../../../Services/queries/useProducts";
import ProductCard from "../../../Components/user/ProductCard/ProductCard";
import ProductsHeroBanner from "./_components/ProductsHeroBanner";
import ProductsFilterSidebar from "./_components/ProductsFilterSidebar";
import Pagination from "./_components/Pagination";
import Breadcrumb from "../../../Components/user/Breadcrumb/Breadcrumb";
import ProductSkeleton from "../../../Components/user/ProductSkeleton";

export default function ProductsList() {
  const location = useLocation();
  const highlightProductId = location.state?.highlightProductId;
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  // Fetch all for metadata (sidebar options)
  const { data: allProducts = [] } = useGetProducts();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: categoryQuery ? [categoryQuery] : [],
    publishers: [],
    statuses: [],
    priceRange: [0, 2500000],
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState("hot");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleClearAllFilters = () => {
    setSearchParams({}); // Xóa sạch URL params
    setFilters({
      categories: [],
      publishers: [],
      statuses: [],
      priceRange: [0, 2500000],
      minRating: 0,
    });
    setSortBy("hot");
  };

  useEffect(() => {
    if (categoryQuery) {
      setFilters(prev => ({ ...prev, categories: [categoryQuery] }));
    }
  }, [categoryQuery]);

  const availableCategories = useMemo(() => [...new Set(allProducts.map(p => p.category).filter(Boolean))], [allProducts]);
  const availablePublishers = useMemo(() => [...new Set(allProducts.map(p => p.publisher).filter(Boolean))], [allProducts]);
  const availableStatuses = useMemo(() => [...new Set(allProducts.map(p => p.status).filter(Boolean))], [allProducts]);

  // Construct query params for JSON-Server
  const queryParams = useMemo(() => {
    const params = {
      _page: currentPage,
      _limit: itemsPerPage,
    };
    
    if (searchQuery) params.q = searchQuery;
    if (filters.categories.length > 0) params.category = filters.categories;
    if (filters.publishers.length > 0) params.publisher = filters.publishers;
    if (filters.statuses.length > 0) params.status = filters.statuses;
    if (filters.priceRange[0] > 0) params.price_gte = filters.priceRange[0];
    if (filters.priceRange[1] < 2500000) params.price_lte = filters.priceRange[1];

    if (sortBy === "price_asc") {
      params._sort = "price";
      params._order = "asc";
    } else if (sortBy === "price_desc") {
      params._sort = "price";
      params._order = "desc";
    } else if (sortBy === "hot") {
      params._sort = "sold";
      params._order = "desc";
    }

    return params;
  }, [currentPage, itemsPerPage, searchQuery, filters, sortBy]);

  // Use the paginated API
  const { data: paginatedData, isLoading, isError, refetch } = useGetProductsPaginated(queryParams);
  const currentProducts = paginatedData?.data || [];
  const totalItems = paginatedData?.totalCount || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters, sortBy, searchQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Breadcrumb 
        items={[
          { label: 'TRANG CHỦ', link: '/' },
          { label: 'KHO TRUYỆN', icon: '📚' }
        ]} 
      />
      <main className="max-w-7xl mx-auto px-4 pb-8 pt-2 min-h-screen">
      <ProductsHeroBanner />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <ProductsFilterSidebar 
          isOpen={isFilterOpen}
          onClearAll={handleClearAllFilters}
          onClose={() => setIsFilterOpen(false)}
          filters={filters} 
          setFilters={setFilters}
          availableCategories={availableCategories}
          availablePublishers={availablePublishers}
          availableStatuses={availableStatuses}
        />

        <section className="lg:col-span-3 space-y-6">
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
                {totalItems} Sản Phẩm
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

          {/* Error State */}
          {isError ? (
            <div className="bg-white comic-border shadow-comic-lg p-10 text-center flex flex-col items-center justify-center">
              <i className="fa-solid fa-plug-circle-xmark text-6xl text-comic-red mb-4 animate-bounce"></i>
              <h3 className="font-comic text-3xl text-stone-900 mb-2 uppercase">Ối! Mất Kết Nối Căn Cứ!</h3>
              <p className="font-bubble text-stone-600 font-bold mb-6">Đường truyền tới server bị nhiễu. Vui lòng thử lại sau.</p>
              <button 
                onClick={() => refetch()} 
                className="bg-comic-yellow text-stone-900 border-2 border-black font-comic text-lg px-8 py-3 shadow-comic hover:bg-stone-900 hover:text-white transition-colors uppercase"
              >
                KẾT NỐI LẠI
              </button>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} isHighlighted={highlightProductId === product.id} />
              ))}
            </div>
          ) : (
            <div className="bg-white comic-border shadow-comic p-10 text-center">
              <i className="fa-regular fa-face-frown-open text-6xl text-stone-300 mb-4 block"></i>
              <h3 className="font-comic text-3xl text-stone-800 mb-2 uppercase">KHÔNG TÌM THẤY TRUYỆN NÀO!</h3>
              <p className="font-bubble text-stone-600 font-bold">Thử điều chỉnh lại bộ lọc hoặc từ khóa xem sao nhé.</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </div>
    </main>
    </>
  );
}

