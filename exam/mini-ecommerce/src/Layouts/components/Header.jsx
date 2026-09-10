import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch real categories from DB
  const { data: categories = [] } = useGetCategories();

  React.useEffect(() => {
    // Only navigate if we are already on products page and typing
    if (window.location.pathname === "/products") {
      navigate(`/products?search=${encodeURIComponent(debouncedSearchTerm)}`, {
        replace: true,
      });
    }
  }, [debouncedSearchTerm, navigate]);

  return (
    <>
      {/* Top Announcement Banner */}
      <aside
        className="bg-comic-yellow comic-border-sm border-x-0 border-t-0 py-2 px-4 shadow-sm"
        data-purpose="top-announcement"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-comic text-base tracking-wider bg-comic-red text-white comic-border-sm px-2.5 py-0.5 rounded shadow-comic-sm transform -rotate-2">
              💥 FLASH DEAL!
            </span>
            <span className="font-bubble font-bold text-xs sm:text-sm text-stone-900 tracking-tight">
              Spring Manga Festival: Giảm tới{" "}
              <span className="bg-comic-orange text-white px-1.5 py-0.5 comic-border-sm shadow-comic-sm font-comic text-sm">
                50% OFF
              </span>{" "}
              cho Manga Shonen & Seinen!
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="font-comic text-sm tracking-wide bg-comic-ink text-comic-yellow hover:bg-comic-red hover:text-white px-4 py-1 rounded comic-border-sm shadow-comic-sm comic-btn-hover transition-transform"
            >
              MUA NGAY ⚡
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Header */}
      <header className="bg-white comic-border-sm border-x-0 border-t-0 sticky top-0 z-40 shadow-comic-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Comic Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-comic-yellow comic-border flex items-center justify-center text-comic-ink text-2xl shadow-comic transform group-hover:rotate-6 transition-transform">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="leading-none">
              <span className="font-comic text-3xl tracking-wide text-stone-900">
                SWOO<span className="text-comic-red">!</span>
              </span>
              <span className="block font-comic text-xs tracking-widest text-comic-orange bg-black text-white px-1.5 py-0.2 rounded comic-border-sm -mt-1 shadow-comic-sm">
                MANGA HEROES ⚡
              </span>
            </div>
          </Link>

          {/* Search Bar - Realtime */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4 relative group/search">
            <div className="flex w-full rounded-xl comic-border bg-white shadow-comic overflow-hidden">
              <input
                name="search"
                className="flex-1 px-4 py-2 font-bubble text-sm text-stone-900 placeholder-stone-400 focus:outline-none border-none font-bold"
                placeholder="Tìm manga, light novel, artbook..."
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    navigate(
                      `/products?search=${encodeURIComponent(searchTerm)}`,
                    );
                  }
                }}
              />
              <button
                className="bg-comic-yellow hover:bg-comic-gold text-stone-900 px-6 font-comic text-lg flex items-center justify-center border-l-2 border-stone-900 transition-colors"
                type="button"
                onClick={() => {
                  navigate(
                    `/products?search=${encodeURIComponent(searchTerm)}`,
                  );
                }}
              >
                <i className="fa-solid fa-magnifying-glass mr-1 text-sm"></i>{" "}
                TÌM KIẾM!
              </button>
            </div>
          </div>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Account */}
            <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-xl comic-border-sm shadow-comic-sm transition">
              <div className="w-8 h-8 rounded-lg bg-white comic-border-sm flex items-center justify-center text-stone-900">
                <i className="fa-solid fa-user-ninja text-sm"></i>
              </div>
              <div className="hidden lg:block text-left pr-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider font-bubble text-stone-500 leading-none">
                  THÀNH VIÊN
                </span>
                {isAuthenticated ? (
                  <div className="font-comic text-sm text-stone-900 tracking-wide mt-1">
                    <Link to="/profile" className="hover:text-comic-red">
                      {user?.name || "Khách"}
                    </Link>
                    {user?.role === ROLES.ADMIN && (
                      <>
                        <span className="mx-1">/</span>
                        <Link
                          to="/admin"
                          className="text-blue-600 hover:underline"
                        >
                          QUẢN TRỊ
                        </Link>
                      </>
                    )}
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

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-comic-yellow hover:bg-comic-gold px-3.5 py-1.5 rounded-xl comic-border shadow-comic comic-btn-hover transition"
            >
              <div className="relative">
                <i className="fa-solid fa-basket-shopping text-stone-900 text-lg"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-comic-red text-white text-[11px] font-comic px-1 min-w-[18px] h-4 rounded-full comic-border-sm flex items-center justify-center shadow-comic-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left leading-none pr-1">
                <span className="text-stone-700 block text-[10px] font-bold uppercase tracking-wider font-bubble">
                  Giỏ hàng POW!
                </span>
                <span className="font-comic text-base text-stone-900 tracking-wider">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation Menu Bar */}
        <nav className="border-t-2 border-stone-900 bg-comic-yellow/20 relative z-30">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap lg:flex-nowrap items-center justify-between text-sm py-1 gap-2">
            <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto">
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
                <li>
                  <Link
                    className="text-comic-red underline decoration-2 underline-offset-4 font-comic hover:text-stone-900 transition"
                    to="/"
                  >
                    TRANG CHỦ
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-comic-red transition"
                    to="/products"
                  >
                    KHO TRUYỆN
                  </Link>
                </li>

                <li>
                  <Link className="hover:text-comic-red transition" to="/about">
                    VỀ CHÚNG TÔI
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-comic-red transition"
                    to="/contact"
                  >
                    LIÊN HỆ
                  </Link>
                </li>
                {/* <li>
                  <Link className="hover:text-comic-red transition" to="#">
                    MANGA BLOG
                  </Link>
                </li> */}
                <li>
                  <Link
                    className="bg-comic-red text-white comic-border-sm px-2 py-0.5 rounded shadow-comic-sm hover:bg-black transition animate-bounce inline-block"
                    to="#"
                  >
                    SPECIAL DEALS!
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-3 shrink-0 hidden xl:flex">
              {/* Vừa Xem */}
              <div className="font-bubble text-xs font-bold text-stone-700 flex items-center gap-1 bg-white px-3 py-1 rounded-md comic-border-sm shadow-comic-sm cursor-pointer hover:bg-yellow-50 transition">
                <i className="fa-regular fa-eye text-comic-orange"></i>
                <span>Vừa Xem</span>
                <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </div>

              {/* Admin Switch */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-comic-ink text-white hover:bg-comic-red px-3 py-1.5 rounded-lg comic-border-sm shadow-comic-sm font-comic text-xs tracking-wider flex items-center gap-1.5 comic-btn-hover transition-colors"
                >
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                  <span>QUẢN TRỊ VIÊN</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
