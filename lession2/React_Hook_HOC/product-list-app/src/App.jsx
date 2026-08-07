import { useMemo, useState } from "react";
import "./App.css";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Laptop Dell XPS 15",
    price: 35000000,
    category: "Điện tử",
    image: "💻",
  },
  {
    id: 2,
    name: "Macbook Air M2",
    price: 28000000,
    category: "Điện tử",
    image: "🍎",
  },
  {
    id: 3,
    name: "Áo thun Polo Nam",
    price: 250000,
    category: "Thời trang",
    image: "👕",
  },
  {
    id: 4,
    name: "Quần Jean ống rộng",
    price: 400000,
    category: "Thời trang",
    image: "👖",
  },
  {
    id: 5,
    name: "Sách Đắc Nhân Tâm",
    price: 85000,
    category: "Sách",
    image: "📚",
  },
  {
    id: 6,
    name: "Bàn phím cơ Logitech",
    price: 1500000,
    category: "Điện tử",
    image: "⌨️",
  },
];

const CATEGORIES = ["Tất cả", ...new Set(MOCK_PRODUCTS.map((p) => p.category))];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cart, setCart] = useState([]);

  const filterProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const isMatchName = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const isMatchCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;

      return isMatchName && isMatchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, product) => total + product.price, 0);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-200">
      {/* Dynamic Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300 opacity-20 blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-300 opacity-20 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto p-6 md:p-10 relative z-10">
        
        {/* ================= HEADER ================= */}
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              <span className="text-gradient">Tech</span>Market
              <span className="text-2xl ml-2 inline-block animate-bounce">🛍️</span>
            </h1>
            <p className="text-slate-500 font-medium">Khám phá sản phẩm chất lượng cao</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ================= PHẦN TRÁI: DANH SÁCH SẢN PHẨM ================= */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Thanh công cụ: Tìm kiếm & Lọc */}
            <div className="glass-panel p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center sticky top-6 z-20">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-11 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative w-full sm:w-48">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-white/50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 cursor-pointer font-medium text-slate-700"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Lưới sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterProducts.length === 0 ? (
                <div className="col-span-full glass-panel py-16 px-6 rounded-3xl text-center">
                  <div className="text-6xl mb-4 opacity-50">🔍</div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-slate-500">Hãy thử thay đổi từ khóa hoặc danh mục nhé!</p>
                </div>
              ) : (
                filterProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-indigo-100 transition-all duration-300 flex flex-col"
                  >
                    <div className="w-full aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                      <span className="text-7xl drop-shadow-md">{product.image}</span>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full w-fit mb-3">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-lg text-slate-800 mb-4 line-clamp-2">{product.name}</h3>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl font-extrabold text-indigo-600">
                          {product.price.toLocaleString("vi-VN")} <span className="text-sm">đ</span>
                        </span>
                        
                        <button
                          onClick={() => addToCart(product)}
                          className="h-10 w-10 rounded-full bg-slate-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 active:scale-90"
                          title="Thêm vào giỏ"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ================= PHẦN PHẢI: GIỎ HÀNG (CART) ================= */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="glass-panel rounded-3xl shadow-xl p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span>🛒</span> Giỏ hàng
                </h2>
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {cart.length} món
                </span>
              </div>

              {/* Danh sách các món trong giỏ */}
              <ul className="space-y-4 mb-8 min-h-[150px] max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-50 py-10">
                    <span className="text-4xl mb-3">🛍️</span>
                    <p className="text-slate-500 font-medium text-sm text-center">Chưa có sản phẩm nào<br/>trong giỏ hàng</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <li
                      key={index}
                      className="group flex gap-4 p-3 rounded-2xl hover:bg-white/60 transition-colors duration-200 border border-transparent hover:border-slate-200/60"
                    >
                      <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="font-semibold text-sm text-slate-800 line-clamp-1">{item.name}</p>
                        <p className="text-indigo-600 font-bold text-sm mt-1">
                          {item.price.toLocaleString("vi-VN")} đ
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-slate-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Xóa"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </li>
                  ))
                )}
              </ul>

              {/* In ra Tổng tiền */}
              <div className="pt-4 border-t border-slate-200/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium">Tổng thanh toán</span>
                  <span className="text-2xl font-black text-slate-800">
                    {cartTotal.toLocaleString("vi-VN")} <span className="text-lg text-indigo-600">đ</span>
                  </span>
                </div>
                
                <button
                  className="w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                  disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed
                  bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-200 active:scale-[0.98]"
                  disabled={cart.length === 0}
                >
                  <span>Thanh Toán Ngay</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
