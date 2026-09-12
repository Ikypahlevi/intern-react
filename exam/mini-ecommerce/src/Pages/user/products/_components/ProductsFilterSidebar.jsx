import React from "react";

export default function ProductsFilterSidebar({ 
  isOpen,
  onClose,
  filters, 
  setFilters, 
  availableCategories, 
  availablePublishers, 
  availableStatuses 
}) {

  const handleCheckboxChange = (filterGroup, value) => {
    setFilters(prev => {
      const currentArr = prev[filterGroup] || [];
      const isSelected = currentArr.includes(value);
      
      const newArr = isSelected 
        ? currentArr.filter(item => item !== value)
        : [...currentArr, value];
        
      return { ...prev, [filterGroup]: newArr };
    });
  };

  const handleRatingChange = (minRating) => {
    setFilters(prev => ({ ...prev, minRating }));
  };

  const handlePriceChange = (e) => {
    // Để đơn giản, chỉ kéo maxPrice (từ 30,000 đến giá trị slider)
    setFilters(prev => ({ ...prev, priceRange: [30000, Number(e.target.value)] }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      publishers: [],
      statuses: [],
      priceRange: [30000, 2500000],
      minRating: 0
    });
  };

  return (
    <>
      {/* Nền mờ cho Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`fixed lg:relative top-0 lg:top-0 left-0 h-screen lg:h-auto w-72 lg:w-full bg-[#FFFCEB] lg:bg-transparent p-4 lg:p-0 z-50 lg:z-0 overflow-y-auto lg:overflow-visible transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} lg:col-span-1 space-y-6`}>
        
        {/* Nút đóng cho Mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 px-2 py-1 flex items-center justify-center bg-comic-red comic-border-sm text-white shadow-comic-sm font-comic text-xs uppercase"
        >
          Hủy bỏ
        </button>

        <div className="bg-white comic-border shadow-comic p-5">
        {/* Sidebar Title */}
        <div className="flex items-center justify-between border-b-4 border-stone-900 pb-3 mb-4">
          <h2 className="font-comic text-2xl uppercase tracking-wider flex items-center gap-1.5">
            <span>BỘ LỌC TÌM KIẾM</span>
            <span className="text-comic-red text-xl">🔍</span>
          </h2>
          <button 
            onClick={clearAllFilters}
            className="text-[11px] font-bubble font-bold uppercase underline hover:text-comic-red"
          >
            Xóa Hết
          </button>
        </div>

        {/* Filter Group: Categories */}
        <div className="mb-6">
          <h3 className="font-bubble font-black text-xs uppercase tracking-wider mb-3 bg-comic-yellow px-2 py-1 comic-border-sm inline-block shadow-comic-sm">
            1. DANH MỤC ẤN PHẨM
          </h3>
          <div className="space-y-2 text-xs font-bubble font-bold">
            {availableCategories.map((cat) => (
              <label key={cat} className="flex items-center justify-between p-1.5 hover:bg-yellow-50 cursor-pointer comic-border-sm border-transparent hover:border-black transition-all">
                <span className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleCheckboxChange('categories', cat)}
                    className="w-4 h-4 text-stone-900 rounded-none border-2 border-stone-900 focus:ring-0" 
                  />
                  <span>{cat}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Group: Price Range */}
        <div className="mb-6 pt-4 border-t-2 border-stone-900">
          <h3 className="font-bubble font-black text-xs uppercase tracking-wider mb-3 bg-comic-cyan px-2 py-1 comic-border-sm inline-block shadow-comic-sm">
            2. KHOẢNG GIÁ TỐI ĐA
          </h3>
          <div className="space-y-3">
            <input 
              type="range" 
              min="30000" 
              max="2500000" 
              step="10000"
              value={filters.priceRange[1]}
              onChange={handlePriceChange}
              className="w-full accent-stone-900 cursor-pointer" 
            />
            <div className="flex items-center justify-between gap-2 text-xs font-bubble font-bold">
              <div className="comic-border-sm px-2 py-1 bg-gray-50">30.000₫</div>
              <span>-</span>
              <div className="comic-border-sm px-2 py-1 bg-comic-yellow">{filters.priceRange[1].toLocaleString()}₫</div>
            </div>
          </div>
        </div>

        {/* Filter Group: Brands/Publishers */}
        <div className="mb-6 pt-4 border-t-2 border-stone-900">
          <h3 className="font-bubble font-black text-xs uppercase tracking-wider mb-3 bg-comic-orange text-white px-2 py-1 comic-border-sm inline-block shadow-comic-sm">
            3. NHÀ XUẤT BẢN & PHÁT HÀNH
          </h3>
          <div className="space-y-2 text-xs font-bubble font-semibold">
            {availablePublishers.map((pub) => (
              <label key={pub} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.publishers.includes(pub)}
                  onChange={() => handleCheckboxChange('publishers', pub)}
                  className="w-4 h-4 text-stone-900 rounded-none border-2 border-stone-900 focus:ring-0" 
                />
                <span>{pub}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Group: Status */}
        <div className="mb-6 pt-4 border-t-2 border-stone-900">
          <h3 className="font-bubble font-black text-xs uppercase tracking-wider mb-3 bg-comic-purple text-white px-2 py-1 comic-border-sm inline-block shadow-comic-sm">
            4. TÌNH TRẠNG PHÁT HÀNH
          </h3>
          <div className="space-y-2 text-xs font-bubble font-semibold">
            {availableStatuses.map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.statuses.includes(status)}
                  onChange={() => handleCheckboxChange('statuses', status)}
                  className="w-4 h-4 text-stone-900 rounded-none border-2 border-stone-900 focus:ring-0" 
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Group: Rating */}
        <div className="pt-4 border-t-2 border-stone-900">
          <h3 className="font-bubble font-black text-xs uppercase tracking-wider mb-3 bg-comic-green text-stone-900 px-2 py-1 comic-border-sm inline-block shadow-comic-sm">
            5. ĐÁNH GIÁ ĐỘC GIẢ
          </h3>
          <div className="space-y-1.5 text-xs font-bubble font-bold">
            <label className="flex items-center gap-2 cursor-pointer hover:text-comic-red">
              <input 
                type="radio" 
                name="filter-star" 
                checked={filters.minRating === 5}
                onChange={() => handleRatingChange(5)}
                className="text-stone-900 focus:ring-0" 
              />
              <span className="text-yellow-500">★★★★★</span>
              <span>(5 sao tuyệt đối)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-comic-red">
              <input 
                type="radio" 
                name="filter-star" 
                checked={filters.minRating === 4}
                onChange={() => handleRatingChange(4)}
                className="text-stone-900 focus:ring-0" 
              />
              <span className="text-yellow-500">★★★★☆</span>
              <span>(Từ 4 sao trở lên)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-comic-red">
              <input 
                type="radio" 
                name="filter-star" 
                checked={filters.minRating === 3}
                onChange={() => handleRatingChange(3)}
                className="text-stone-900 focus:ring-0" 
              />
              <span className="text-yellow-500">★★★☆☆</span>
              <span>(Từ 3 sao trở lên)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:text-comic-red">
              <input 
                type="radio" 
                name="filter-star" 
                checked={filters.minRating === 0}
                onChange={() => handleRatingChange(0)}
                className="text-stone-900 focus:ring-0" 
              />
              <span className="text-stone-500">Tất cả đánh giá</span>
            </label>
          </div>
        </div>
      </div>

      {/* Mini Promo Card */}
      <div className="bg-stone-900 text-white p-5 comic-border shadow-comic relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-7xl select-none opacity-20">⚡</div>
        <span className="bg-comic-red text-white text-[10px] font-comic px-2 py-0.5 comic-border-sm inline-block mb-2 -rotate-2">
          HOT DEAL THÁNG
        </span>
        <h4 className="font-comic text-2xl uppercase tracking-wider text-comic-yellow leading-tight">
          COMBO OTAKU VIP PASS
        </h4>
        <p className="text-xs text-gray-300 mt-2 mb-4 font-bubble">
          Tặng túi Canvas One Piece + Móc chìa khóa kiếm Zoro cho đơn trên 500k!
        </p>
        <button className="w-full bg-comic-yellow hover:bg-comic-gold text-stone-900 font-comic text-base py-2 comic-border shadow-comic-sm">
          NHẬN QUÀ NGAY!
        </button>
      </div>
    </aside>
    </>
  );
}
