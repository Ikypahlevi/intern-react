import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../Stores/cartStore";
import CartItem from "./_components/CartItem";
import CartSummary from "./_components/CartSummary";
import CartSuggestions from "./_components/CartSuggestions";

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  // State lưu trữ các ID sản phẩm được tick chọn
  const [selectedIds, setSelectedIds] = useState(
    items.map(item => item.id) // Mặc định chọn tất cả
  );

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map(item => item.id));
    }
  };

  const handleRemoveSelected = () => {
    selectedIds.forEach(id => removeItem(id));
    setSelectedIds([]);
  };

  // Tính toán tổng tiền dựa trên các item ĐƯỢC CHỌN
  const { totalAmount, totalItems } = useMemo(() => {
    const selectedItems = items.filter(item => selectedIds.includes(item.id));
    return {
      totalAmount: selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      totalItems: selectedItems.reduce((total, item) => total + item.quantity, 0)
    };
  }, [items, selectedIds]);

  const handleCheckout = () => {
    if (selectedIds.length === 0) return;
    // Tạm thời giả lập chuyển hướng, sẽ gọi API đặt hàng sau
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="bg-white rounded-2xl comic-border shadow-comic-lg p-10 text-center max-w-lg w-full">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-comic text-3xl text-stone-900 mb-3">GIỎ HÀNG TRỐNG TRƠN!</h2>
          <p className="font-bubble text-stone-600 font-bold mb-6">
            Có vẻ như bạn chưa chọn được ấn phẩm nào. Hãy dạo quanh Kho Truyện để tìm kiếm Manga yêu thích nhé!
          </p>
          <Link to="/products" className="inline-block bg-comic-yellow text-stone-900 font-comic text-xl px-8 py-3 comic-border shadow-comic hover:bg-stone-900 hover:text-white transition-colors">
            ĐI SĂN TRUYỆN NGAY ⚡
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 w-full text-xs">
        <nav className="inline-flex items-center space-x-2 bg-white comic-border shadow-comic-sm px-4 py-1.5 rounded-lg font-bubble font-bold text-sm">
          <Link to="/" className="hover:text-comic-red text-stone-800">TRANG CHỦ</Link>
          <span className="text-comic-red font-black">&gt;</span>
          <Link to="/products" className="hover:text-comic-red text-stone-800">KHO TRUYỆN</Link>
          <span className="text-comic-red font-black">&gt;</span>
          <span className="text-comic-red uppercase bg-yellow-200 px-1.5 py-0.5 rounded border border-black">GIỎ HÀNG OTAKU 💥</span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 mb-16 w-full flex-grow">
        <div className="bg-white rounded-2xl comic-border shadow-comic-lg p-6 lg:p-8 relative">
          <div className="absolute -top-5 left-8 bg-black text-comic-yellow px-4 py-1 font-comic text-xl comic-border shadow-comic-sm rotate-[-2deg]">
            ⚡ KHO MANGA ({items.length} TỰA TRUYỆN TRONG GIỎ)
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            {/* Cột trái: Danh sách sản phẩm */}
            <div className="lg:col-span-8 space-y-5">
              {/* Thanh Header Chọn tất cả */}
              <div className="flex items-center justify-between bg-yellow-100 comic-border shadow-comic-sm px-4 py-3 rounded-xl">
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === items.length && items.length > 0}
                    onChange={handleToggleSelectAll}
                    className="w-5 h-5 rounded border-2 border-black text-comic-red focus:ring-0 cursor-pointer"
                  />
                  <span className="font-black font-comic text-sm uppercase tracking-wide">
                    CHỌN TẤT CẢ ({items.length} SẢN PHẨM)
                  </span>
                </div>
                {selectedIds.length > 0 && (
                  <button 
                    onClick={handleRemoveSelected}
                    className="text-xs font-black text-comic-red hover:underline uppercase font-bubble tracking-wide"
                  >
                    <i className="fa-solid fa-trash mr-1"></i> XOÁ ĐÃ CHỌN
                  </button>
                )}
              </div>

              {/* Danh sách Item */}
              <div className="space-y-4">
                {items.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item}
                    isSelected={selectedIds.includes(item.id)}
                    onToggleSelect={handleToggleSelect}
                    onIncrease={(id, q) => updateQuantity(id, q + 1)}
                    onDecrease={(id, q) => updateQuantity(id, q - 1)}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Cột phải: Summary */}
            <CartSummary 
              totalAmount={totalAmount} 
              totalItems={totalItems} 
              onCheckout={handleCheckout} 
            />
          </div>
          
          {/* Gợi ý mua thêm */}
          {items.length > 0 && <CartSuggestions cartItems={items} />}
        </div>
      </main>
    </>
  );
}
