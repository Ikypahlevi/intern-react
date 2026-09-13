import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NotificationDropdown from "../../Components/NotificationDropdown";
import { useCartStore } from "../../Stores/cartStore";
import { formatCurrency } from "../../Utils/format";
import { useAuthStore } from "../../Stores/authStore";
import { useDebounce } from "../../Utils/useDebounce";
import { ROLES } from "../../Constants";
import { useGetCategories } from "../../Services/queries/useCategories";

export default function Header() {
  const items = useCartStore((state) => state.items);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Fetch real categories from DB
  const { data: categories = [] } = useGetCategories();

  useEffect(() => {
    // Only navigate if we are already on products page and typing
    if (window.location.pathname === "/products") {
      navigate(`/products?search=${encodeURIComponent(debouncedSearchTerm)}`, {
        replace: true,
      });
    }
  }, [debouncedSearchTerm, navigate]);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Announcement Banner */}
      <aside
        className="bg-comic-yellow comic-border-sm border-x-0 border-t-0 py-2 px-4 shadow-sm"
        data-purpose="top-announcement"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-comic text-xs sm:text-base tracking-wider bg-comic-red text-white comic-border-sm px-2.5 py-0.5 rounded shadow-comic-sm transform -rotate-2 whitespace-nowrap">
              🔥 FLASH DEAL!
            </span>
            <span className="font-bubble font-bold text-xs sm:text-sm text-stone-900 tracking-tight">
              Spring Manga Festival: Giảm tới{" "}
              <span className="bg-comic-orange text-white px-1.5 py-0.5 comic-border-sm shadow-comic-sm font-comic text-sm">
                50% OFF
              </span>
              <span className="hidden sm:inline"> cho Manga Shonen & Seinen!</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/products"
              className="font-comic text-sm tracking-wide bg-comic-ink text-comic-yellow hover:bg-comic-red hover:text-white px-4 py-1 rounded comic-border-sm shadow-comic-sm comic-btn-hover transition-transform"
            >
              MUA NGAY ➔
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Header */}
      <header className="bg-white comic-border-sm border-x-0 border-t-0 sticky top-0 z-40 shadow-comic-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl comic-border bg-comic-yellow shadow-comic comic-btn-hover shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>

          {/* Comic Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-comic-yellow comic-border flex items-center justify-center text-comic-ink text-xl sm:text-2xl shadow-comic transform group-hover:rotate-6 transition-transform">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="leading-none hidden sm:block">
              <span className="font-comic text-xl sm:text-3xl tracking-wide text-stone-900">
                SWOO<span className="text-comic-red">!</span>
              </span>
              <span className="block font-comic text-[9px] sm:text-xs tracking-widest text-comic-orange bg-black text-white px-1.5 py-0.2 rounded comic-border-sm -mt-1 shadow-comic-sm">
                MANGA HEROES ★
              </span>
            </div>
          </Link>

          {/* Search Bar - Realtime */}
          <div className="flex flex-1 max-w-2xl mx-1 sm:mx-4 relative group/search">
            <div className="flex w-full rounded-xl comic-border bg-white shadow-comic overflow-hidden">
              <input
                name="search"
                className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 font-bubble text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none border-none font-bold w-full min-w-0"
                placeholder="Tìm manga, light novel..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
                  }
                }}
              />
              <button
                className="bg-comic-red hover:bg-comic-ink text-white px-3 sm:px-5 font-comic transition flex items-center justify-center shrink-0"
                onClick={() => navigate(`/products?search=${encodeURIComponent(searchTerm)}`)}
              >
                <i className="fa-solid fa-search"></i>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
            {/* User Account */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 comic-border-sm flex items-center justify-center text-comic-red shadow-comic-sm">
                <i className="fa-solid fa-user-astronaut text-xl"></i>
              </div>
              <div className="hidden lg:block text-left">
                <span className="text-stone-500 block text-[10px] font-bold uppercase tracking-wider font-bubble">
                  THÀNH VIÊN
                </span>
                {isAuthenticated ? (
                  <div className="font-comic text-sm text-stone-900 tracking-wide mt-1">
                    <Link to="/profile" className="hover:text-comic-red">
                      {user?.name || "Khách"}
                    </Link>
                    <span className="mx-1">/</span>
                    <button
                      onClick={logout}
                      className="text-comic-red hover:underline"
                    >
                      Thoát
                    </button>
                  </div>
                ) : (
                  <div className="font-comic text-sm text-stone-900 tracking-wide mt-1">
                    <Link
                      to="/auth/login"
                      className="hover:underline hover:text-comic-red"
                    >
                      ĐĂNG NHẬP
                    </Link>
                    <span className="mx-1">/</span>
                    <Link
                      to="/auth/register"
                      className="text-comic-red hover:underline"
                    >
                      ĐĂNG KÝ
                    </Link>
                  </div>
                )}
              </div>
            </div>

                        <div className="flex items-center gap-3 shrink-0">
              {/* Notifications */}
              {isAuthenticated && <NotificationDropdown />}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-10 h-10 bg-comic-yellow hover:bg-comic-gold rounded-xl comic-border shadow-comic transition"
                title="Giỏ hàng"
              >
                <i className="fa-solid fa-basket-shopping text-stone-900 text-lg"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-comic-red text-white text-[10px] font-comic w-5 h-5 flex items-center justify-center rounded-full comic-border-sm shadow-comic-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Menu Bar */}
        <nav className="hidden lg:block border-t-2 border-stone-900 bg-comic-yellow/20 relative z-30">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm py-1 gap-2">
            <div className="flex items-center gap-6 w-auto">
              {/* All Departments Button */}
              <div className="relative py-1 shrink-0 group">
                <button className="bg-comic-ink text-comic-yellow group-hover:bg-comic-red group-hover:text-white px-4 py-1.5 rounded-lg comic-border shadow-comic font-comic text-sm tracking-wider flex items-center gap-2 comic-btn-hover transition-colors">
                  <i className="fa-solid fa-bars-staggered"></i>
                  <span>TẤT CẢ THỂ LOẠI</span>
                  <i className="fa-solid fa-chevron-down text-xs group-hover:rotate-180 transition-transform"></i>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-48 bg-white comic-border-sm shadow-comic rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <ul className="py-2 max-h-64 overflow-y-auto">
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            to={`/products?category=${encodeURIComponent(cat.name)}`}
                            className="block px-4 py-2 font-bubble text-sm font-bold text-stone-800 hover:bg-comic-yellow hover:text-stone-900 transition-colors"
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <span className="block px-4 py-2 font-bubble text-sm text-stone-500">
                          Đang tải...
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Main Nav Links */}
              <ul className="flex items-center gap-4 font-comic text-base tracking-wider text-stone-800 whitespace-nowrap">
                <li><Link className="text-comic-red underline decoration-2 underline-offset-4 font-comic hover:text-stone-900 transition" to="/">TRANG CHỦ</Link></li>
                <li><Link className="hover:text-comic-red transition" to="/products">KHO TRUYỆN</Link></li>
                <li><Link className="hover:text-comic-red transition" to="/about">VỀ CHÚNG TÔI</Link></li>
                <li><Link className="hover:text-comic-red transition" to="/contact">LIÊN HỆ</Link></li>
                <li><Link className="bg-comic-red text-white comic-border-sm px-2 py-0.5 rounded shadow-comic-sm hover:bg-black transition animate-bounce inline-block" to="#">SPECIAL DEALS!</Link></li>
              </ul>
            </div>
            
            {user?.role === "admin" && (
                <Link to="/admin" className="bg-comic-ink text-white hover:bg-comic-red px-3 py-1.5 rounded-lg comic-border-sm shadow-comic-sm font-comic text-xs tracking-wider flex items-center gap-1.5 comic-btn-hover transition-colors">
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                  <span>QUẢN TRỊ VIÊN</span>
                </Link>
            )}
          </div>
        </nav>
        
        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b-[3px] border-black shadow-comic-md z-50 animate-fade-in flex flex-col font-bubble font-bold">
            <div className="p-4 border-b-[3px] border-dashed border-gray-300">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-xs">Xin chào,</span>
                    <Link to="/profile" className="font-comic text-xl text-comic-red">{user?.name || "Khách"}</Link>
                    <button onClick={logout} className="bg-stone-200 py-1 px-3 rounded-lg border-2 border-black w-max text-sm mt-1">Đăng xuất</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/auth/login" className="flex-1 text-center bg-comic-yellow border-[2px] border-black py-2 rounded-xl shadow-[2px_2px_0px_#000]">Đăng nhập</Link>
                    <Link to="/auth/register" className="flex-1 text-center bg-comic-ink text-white border-[2px] border-black py-2 rounded-xl shadow-[2px_2px_0px_#000]">Đăng ký</Link>
                  </div>
                )}
            </div>
            <ul className="flex flex-col text-lg overflow-y-auto max-h-[60vh]">
                <li><Link to="/" className="block p-4 border-b border-gray-200 hover:bg-yellow-50"><i className="fa-solid fa-house w-6 text-center mr-2"></i> Trang Chủ</Link></li>
                <li><Link to="/products" className="block p-4 border-b border-gray-200 hover:bg-yellow-50"><i className="fa-solid fa-book w-6 text-center mr-2"></i> Kho Truyện</Link></li>
                
                                {/* Mobile Categories */}
                <li className="border-b border-gray-200">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-yellow-50 transition-colors"
                    onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                  >
                    <div className="flex items-center text-stone-900 font-comic tracking-widest text-lg">
                      <i className="fa-solid fa-bars-staggered w-6 text-center mr-2"></i> THỂ LOẠI
                    </div>
                    <i className={`fa-solid fa-chevron-down transition-transform ${isMobileCategoryOpen ? 'rotate-180' : ''}`}></i>
                  </div>
                  {isMobileCategoryOpen && (
                    <div className="pl-12 pr-4 pb-4 flex flex-col gap-3">
                      {categories.map((cat) => (
                        <Link 
                          key={cat.id} 
                          to={`/products?category=${encodeURIComponent(cat.name)}`} 
                          className="text-gray-700 text-base hover:text-comic-red hover:underline block py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          - {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>

                <li><Link to="/about" className="block p-4 border-b border-gray-200 hover:bg-yellow-50"><i className="fa-solid fa-circle-info w-6 text-center mr-2"></i> Về Chúng Tôi</Link></li>
                <li><Link to="/contact" className="block p-4 border-b border-gray-200 hover:bg-yellow-50"><i className="fa-solid fa-phone w-6 text-center mr-2"></i> Liên Hệ</Link></li>
                {user?.role === "admin" && (
                    <li><Link to="/admin" className="block p-4 bg-gray-100 text-comic-red border-t-4 border-black"><i className="fa-solid fa-screwdriver-wrench w-6 text-center mr-2"></i> Quản Trị Viên</Link></li>
                )}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}


