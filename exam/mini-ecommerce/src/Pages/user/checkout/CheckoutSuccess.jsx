import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  // Nếu truy cập trực tiếp không qua trang checkout, đá về trang chủ
  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 flex-grow flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl comic-border shadow-comic-lg p-10 text-center max-w-2xl w-full relative overflow-hidden">
        {/* Banner chéo */}
        <div className="absolute -top-5 -left-10 bg-comic-red text-white px-12 py-2 font-comic text-xl rotate-[-15deg] comic-border-sm shadow-comic-sm">
          MISSION ACCOMPLISHED!
        </div>

        <div className="text-8xl mb-6 animate-bounce mt-4">🎉</div>
        
        <h1 className="font-comic text-4xl text-stone-900 mb-2 uppercase">
          CHÚC MỪNG OTAKU HERO!
        </h1>
        <h2 className="font-comic text-2xl text-comic-red mb-6">
          ĐƠN HÀNG ĐÃ ĐƯỢC TIẾP NHẬN THÀNH CÔNG ⚡
        </h2>

        <div className="bg-yellow-50 comic-border-2 rounded-xl p-4 mb-8 inline-block shadow-comic-sm">
          <p className="font-bubble text-sm font-bold text-gray-600 mb-1">MÃ ĐƠN HÀNG CỦA BẠN LÀ</p>
          <p className="font-comic text-3xl tracking-wider text-black bg-white comic-border-sm px-4 py-2 inline-block shadow-sm">
            {orderId}
          </p>
        </div>

        <p className="font-bubble text-stone-600 font-bold mb-10 max-w-md mx-auto">
          Manga của bạn đang được đóng gói với màng co 3 lớp siêu an toàn và sẽ sớm được dịch chuyển tức thời đến tận tay bạn!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/profile" 
            className="w-full sm:w-auto inline-block bg-white text-stone-900 font-comic text-xl px-8 py-3 comic-border shadow-comic hover:bg-yellow-100 hover:-translate-y-1 transition-all"
          >
            👀 THEO DÕI ĐƠN HÀNG
          </Link>
          <Link 
            to="/products" 
            className="w-full sm:w-auto inline-block bg-comic-yellow text-stone-900 font-comic text-xl px-8 py-3 comic-border shadow-comic hover:bg-stone-900 hover:text-white hover:-translate-y-1 transition-all"
          >
            TIẾP TỤC SĂN TRUYỆN ⚡
          </Link>
        </div>
      </div>
    </main>
  );
}
