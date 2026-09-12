import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProducts } from "../../Services/queries/useProducts";
import { useGetOrders } from "../../Services/queries/useOrders";

export default function AdminHeader({ onMenuClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const notifRef = useRef(null);

  const { data: products = [] } = useGetProducts();
  const { data: orders = [] } = useGetOrders();

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Live search
  const searchProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);
  const searchOrders = orders
    .filter((o) => o.id.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);

  // Notification calculations
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const lowStockProductsCount = products.filter(p => p.stock <= 15).length;
  const totalNotifications = (pendingOrdersCount > 0 ? 1 : 0) + (lowStockProductsCount > 0 ? 1 : 0);

  return (
    <header className="sticky top-0 w-full h-16 bg-white border-b-[3px] border-black z-40 px-4 sm:px-6 flex items-center justify-between shadow-[0_3px_0px_#000] font-bubble transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu cho Mobile */}
        <button 
          className="lg:hidden flex items-center justify-center w-8 h-8 bg-comic-yellow border-[2px] border-black shadow-[2px_2px_0px_#000]"
          onClick={onMenuClick}
        >
          <i className="fa-solid fa-bars text-black"></i>
        </button>

        {/* Clean Logo */}
        <div className="hidden sm:flex items-center gap-2 font-comic text-lg lg:text-xl text-black uppercase font-black cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/admin/overview')}>
          <i className="fa-solid fa-bolt text-yellow-500 drop-shadow-[1px_1px_0px_#000]"></i>
          <span className="tracking-wider">Swoo Manga</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Real-time Search */}
        <div className="relative hidden sm:flex items-center">
          <div className="flex items-center border-[2px] border-black bg-white px-3 py-1.5 shadow-[2px_2px_0px_#000] rounded-sm">
            <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2 text-sm"></i>
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              onFocus={() => setShowResults(searchTerm.length > 0)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="bg-transparent border-none outline-none font-bold text-sm w-44 text-black placeholder:text-gray-400"
              placeholder="Tìm truyện, đơn..."
              type="text"
            />
            <kbd className="bg-gray-100 border border-black font-comic text-[10px] px-1.5 py-0.5 text-black font-bold rounded-sm">
              Ctrl+K
            </kbd>
          </div>

          {/* Dropdown Live Search Results */}
          {showResults && (
            <div className="absolute top-12 left-0 w-[300px] bg-white border-[3px] border-black shadow-comic z-50 overflow-hidden font-bubble">
              <div className="bg-comic-yellow border-b-[2px] border-black p-2 font-black text-xs font-comic">
                KẾT QUẢ TÌM KIẾM: {searchTerm}
              </div>

              {searchProducts.length > 0 && (
                <div className="p-2 border-b-2 border-dashed border-gray-300">
                  <div className="text-[10px] font-bold text-gray-500 mb-1">
                    SẢN PHẨM
                  </div>
                  {searchProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-2 hover:bg-yellow-50 p-1 cursor-pointer"
                      onClick={() => navigate(`/admin/products/${p.id}`)}
                    >
                      <img
                        src={p.image}
                        className="w-8 h-8 object-cover border border-black"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-red-600 font-bold">
                          Tồn: {p.stock} | Bán: {p.sold}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchOrders.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-bold text-gray-500 mb-1">
                    ĐƠN HÀNG
                  </div>
                  {searchOrders.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between hover:bg-yellow-50 p-1 cursor-pointer"
                    >
                      <div className="text-xs font-bold text-blue-600">
                        {o.id}
                      </div>
                      <div className="text-[10px] text-gray-600 font-bold">
                        {o.customerName}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchProducts.length === 0 && searchOrders.length === 0 && (
                <div className="p-4 text-center text-xs font-bold text-gray-500">
                  Không tìm thấy kết quả nào.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clean User View Button */}
        <button 
          onClick={() => navigate("/")}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-500 text-white border-[2px] border-black shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all"
          title="Chuyển sang Giao diện User"
        >
          <i className="fa-solid fa-store text-sm sm:text-base"></i>
        </button>

        {/* Smart Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white border-[2px] border-black shadow-[2px_2px_0px_#000] hover:bg-gray-100 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
          >
            <i className="fa-regular fa-bell text-black text-sm sm:text-base"></i>
            {totalNotifications > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-comic text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-[2px] border-black font-bold shadow-[1px_1px_0px_#000] animate-bounce">
                {totalNotifications}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-12 right-0 w-72 sm:w-80 bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] font-bubble z-50 overflow-hidden flex flex-col">
              <div className="bg-comic-yellow border-b-[2px] border-black p-3 flex items-center justify-between">
                <span className="font-black text-sm uppercase">Thông báo hệ thống</span>
                <span className="text-xs font-bold bg-white px-2 py-0.5 border border-black rounded-full">{totalNotifications} mới</span>
              </div>
              
              <div className="flex flex-col max-h-[300px] overflow-y-auto">
                {totalNotifications === 0 ? (
                  <div className="p-6 flex flex-col items-center justify-center gap-2 text-gray-500">
                    <i className="fa-regular fa-face-smile text-2xl"></i>
                    <span className="text-sm font-bold">Không có thông báo mới!</span>
                  </div>
                ) : (
                  <>
                    {pendingOrdersCount > 0 && (
                      <div 
                        onClick={() => { navigate('/admin/orders'); setShowNotifications(false); }} 
                        className="p-3 border-b-[2px] border-dashed border-gray-300 hover:bg-yellow-50 cursor-pointer flex gap-3 items-start transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 border-[2px] border-black flex items-center justify-center shrink-0">
                          <i className="fa-solid fa-box-open text-blue-600 text-xs"></i>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-black leading-tight">Đơn hàng chờ duyệt</div>
                          <div className="text-xs text-gray-600 font-comic mt-1 leading-snug">
                            Có <span className="text-red-600 font-bold">{pendingOrdersCount}</span> đơn hàng mới đang chờ bạn xử lý.
                          </div>
                        </div>
                      </div>
                    )}
                    {lowStockProductsCount > 0 && (
                      <div 
                        onClick={() => { navigate('/admin/products'); setShowNotifications(false); }} 
                        className="p-3 hover:bg-yellow-50 cursor-pointer flex gap-3 items-start transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-red-100 border-[2px] border-black flex items-center justify-center shrink-0">
                          <i className="fa-solid fa-triangle-exclamation text-red-600 text-xs"></i>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-black leading-tight">Cảnh báo kho hàng</div>
                          <div className="text-xs text-gray-600 font-comic mt-1 leading-snug">
                            Có <span className="text-red-600 font-bold">{lowStockProductsCount}</span> sản phẩm sắp hết hàng (Tồn dưới 15).
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
