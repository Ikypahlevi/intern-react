import React from "react";
import Button from "../../../../Components/user/Button/Button";
import { formatCurrency } from "../../../../Utils/format";

export default function CheckoutSummary({ items, totalAmount, shippingFee, paymentMethod, setPaymentMethod, isSubmitting }) {
  const grandTotal = totalAmount + shippingFee;

  return (
    <div className="comic-border bg-white rounded-xl p-6 shadow-comic-lg relative overflow-hidden h-full flex flex-col">
      {/* Manga style sticker badge */}
      <div className="absolute -top-3 -right-3 bg-comic-yellow comic-border px-3 py-1 font-comic text-xs rotate-12 shadow-md">
        OFFICIAL LOOT!
      </div>

      {/* Section Title Header */}
      <div className="border-b-4 border-black pb-3 mb-4">
        <h2 className="font-comic text-2xl text-black tracking-wide flex items-center gap-2">
          <span>📦</span> ĐƠN HÀNG CỦA BẠN
        </h2>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-bubble">Your Order Summary</p>
      </div>

      {/* Product Table / Items List */}
      <div className="bg-slate-50 comic-border rounded-lg p-3 mb-4 flex-grow overflow-y-auto max-h-[400px]">
        <div className="flex justify-between text-[11px] font-black uppercase text-gray-500 border-b border-black pb-2 mb-3">
          <span>SẢN PHẨM (PRODUCT)</span>
          <span>TẠM TÍNH (SUBTOTAL)</span>
        </div>
        
        <div className="space-y-3 pb-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-3 border-b-2 border-dashed border-gray-300 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 comic-border rounded bg-yellow-200 flex-shrink-0 flex items-center justify-center font-comic text-2xl text-black relative">
                  📖
                  <span className="absolute -bottom-1 -right-1 bg-black text-white text-[9px] font-black px-1 rounded">x{item.quantity}</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-black leading-tight line-clamp-2">{item.name}</h3>
                  <span className="inline-block bg-comic-yellow comic-border-sm text-[9px] font-black px-1 rounded mt-0.5 uppercase">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-extrabold text-sm text-black">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Fee */}
      <div className="py-3 border-b-2 border-gray-200 mb-4">
        <span className="block text-xs font-black uppercase text-gray-700 mb-2">Phí Vận Chuyển:</span>
        <div className="flex items-center justify-between p-2 rounded comic-border-2 bg-yellow-50">
          <span className="font-bold text-xs">Giao Hàng Tiêu Chuẩn (2-3 ngày)</span>
          <span className="font-extrabold text-comic-red">+{formatCurrency(shippingFee)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="comic-border rounded-lg bg-slate-100 p-4 mb-4">
        <h3 className="text-xs font-black uppercase tracking-wider mb-3 text-gray-800 flex items-center gap-1.5 font-bubble">
          <span>💳</span> HÌNH THỨC THANH TOÁN
        </h3>
        <div className="space-y-2.5 text-xs font-bubble">
          {/* COD */}
          <div className="comic-border-2 bg-white p-3 rounded">
            <label className="flex items-center justify-between font-black cursor-pointer text-black">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="COD" 
                  checked={paymentMethod === "COD"} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-black border-2 border-black accent-black" 
                />
                <span>COD - Thanh toán khi nhận hàng</span>
              </div>
              <span className="bg-gray-200 text-[10px] px-1.5 py-0.5 rounded font-bold">Tiền mặt</span>
            </label>
          </div>
          {/* VNPAY / Momo */}
          <div className="comic-border-2 bg-white p-3 rounded">
            <label className="flex items-center justify-between font-black cursor-pointer text-black">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="ONLINE" 
                  checked={paymentMethod === "ONLINE"} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-black border-2 border-black accent-black" 
                />
                <span>Ví Điện Tử Momo / VNPAY</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-[10px]">
                <span className="bg-pink-100 text-pink-700 px-1 rounded">MoMo</span>
                <span className="bg-blue-100 text-blue-700 px-1 rounded">VNPAY</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Price Breakdown Calculation */}
      <div className="pt-3 space-y-1.5 text-xs font-bold font-bubble mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Tiền hàng (Subtotal):</span>
          <span className="text-black font-extrabold">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Phí vận chuyển (Shipping):</span>
          <span className="text-black font-extrabold">{formatCurrency(shippingFee)}</span>
        </div>
        <div className="flex justify-between items-center bg-black text-white p-3 rounded comic-border-2 mt-3 shadow-comic-sm">
          <div>
            <span className="font-comic text-lg uppercase tracking-wider block leading-tight text-comic-yellow">TỔNG CỘNG</span>
          </div>
          <div className="text-right">
            <span className="font-comic text-3xl text-comic-yellow tracking-wider">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Final Place Order Button */}
      <Button 
        type="submit" 
        disabled={isSubmitting || items.length === 0}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-comic text-2xl py-4 rounded-lg tracking-wider flex items-center justify-center gap-2 mt-auto text-shadow"
      >
        <span>⚡</span> {isSubmitting ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG NGAY (PLACE ORDER)"} <span>→</span>
      </Button>

      {/* Safe Badges */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-bold text-center font-bubble">
        <div className="comic-border-2 bg-white p-1.5 rounded flex items-center justify-center gap-1">
          <span>🛡️</span> 100% Bản Quyền NXB
        </div>
        <div className="comic-border-2 bg-white p-1.5 rounded flex items-center justify-center gap-1">
          <span>📦</span> Bọc Chống Sốc 3 Lớp
        </div>
      </div>
    </div>
  );
}
