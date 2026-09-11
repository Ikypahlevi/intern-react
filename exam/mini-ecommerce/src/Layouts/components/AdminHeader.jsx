import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProducts } from "../../Services/queries/useProducts";
import { useGetOrders } from "../../Services/queries/useOrders";

export default function AdminHeader({ onMenuClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const { data: products = [] } = useGetProducts();
  const { data: orders = [] } = useGetOrders();

  // Lọc kết quả real-time
  const searchProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);
  const searchOrders = orders
    .filter((o) => o.id.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);

  // Focus effect for shortcut Ctrl+K could be added here

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b-[3px] border-black z-30 px-4 sm:px-6 flex items-center justify-between shadow-[0_3px_0px_#000] font-bubble transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu cho Mobile */}
        <button 
          className="lg:hidden flex items-center justify-center w-8 h-8 bg-comic-yellow border-[2px] border-black shadow-[2px_2px_0px_#000]"
          onClick={onMenuClick}
        >
          <i className="fa-solid fa-bars text-black"></i>
        </button>

        <div className="hidden sm:flex items-center gap-2 font-comic text-sm sm:text-lg text-black uppercase">
          <i className="fa-solid fa-terminal text-green-600 font-bold"></i>
          <span>Swoo Manga</span>
          <i className="fa-solid fa-arrow-right text-red-600 text-sm"></i>
          <span className="bg-comic-yellow px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] text-xs sm:text-sm">
            HQ Panel
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-2 bg-gray-100 px-3 py-1 border-[2px] border-black shadow-[2px_2px_0px_#000]">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black animate-pulse"></span>
          <span className="font-comic text-[10px] uppercase text-black font-bold">
            Server Otaku-HQ: Ổn định
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Real-time Search */}
        <div className="relative hidden sm:flex items-center">
          <div className="flex items-center border-[2px] border-black bg-white px-3 py-1 shadow-[2px_2px_0px_#000]">
            <i className="fa-solid fa-magnifying-glass text-gray-500 mr-2"></i>
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(e.target.value.length > 0);
              }}
              onFocus={() => setShowResults(searchTerm.length > 0)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="bg-transparent border-none outline-none font-bold text-sm w-44 text-black placeholder:text-gray-400"
              placeholder="Tìm truyện, đơn, mã..."
              type="text"
            />
            <kbd className="bg-gray-100 border border-black font-comic text-[10px] px-1.5 py-0.5 text-black font-bold">
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

        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-blue-500 text-white border-[2px] border-black font-comic text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] transition-all uppercase font-black"
          title="Trải nghiệm như User"
        >
          <i className="fa-solid fa-store"></i>
          <span className="hidden sm:inline">GIAO DIỆN USER</span>
        </button>

        <div className="relative flex items-center justify-center p-2 border-[2px] border-black bg-white shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-gray-100">
          <i className="fa-solid fa-bell text-black"></i>
          <span className="absolute -top-2 -right-2 bg-red-600 text-white font-comic text-[10px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000] font-bold">
            9+
          </span>
        </div>
      </div>
    </header>
  );
}
