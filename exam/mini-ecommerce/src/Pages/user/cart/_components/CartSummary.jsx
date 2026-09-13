import React from "react";
import Button from "../../../../Components/user/Button/Button";
import { formatCurrency } from "../../../../Utils/format";

export default function CartSummary({ 
  totalAmount, 
  totalItems,
  shippingFee = 0,
  onCheckout 
}) {
  const grandTotal = totalAmount + shippingFee;

  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Khối Tóm tắt đơn hàng */}
      <div className="comic-border shadow-comic-lg rounded-2xl p-6 bg-comic-yellow space-y-5 relative">
        <div className="absolute -top-3.5 right-4 bg-comic-red text-white comic-border-sm px-2.5 py-0.5 font-comic text-xs shadow-comic-sm rotate-[3deg]">
          GIAO SIÊU TỐC 2H!
        </div>
        
        <h2 className="text-2xl font-comic text-black border-b-2 border-black pb-2 tracking-wide uppercase">
          TÓM TẮT ĐƠN HÀNG
        </h2>
        
        <div className="space-y-3 font-bubble text-sm">
          <div className="flex justify-between items-center text-black font-bold">
            <span>Tạm tính Manga ({totalItems} cuốn)</span>
            <span className="font-black text-black text-base">{formatCurrency(totalAmount)}</span>
          </div>
          <div className="flex justify-between items-center text-black font-bold">
            <span>Bọc chống sốc & màng co</span>
            <span className="font-black text-green-700 text-xs uppercase bg-green-100 px-1.5 py-0.5 rounded border border-black">
              MIỄN PHÍ
            </span>
          </div>
          <div className="flex justify-between items-center text-black font-bold">
            <span>Phí Giao Hàng Tiêu Chuẩn</span>
            {shippingFee === 0 && totalItems > 0 ? (
              <span className="font-black text-green-700 text-xs uppercase bg-green-100 px-1.5 py-0.5 rounded border border-black">
                FREESHIP
              </span>
            ) : (
              <span className="font-black text-black text-base">+{formatCurrency(shippingFee)}</span>
            )}
          </div>
        </div>
        
        <div className="border-t-3 border-t-[3px] border-black pt-3 bg-white -mx-6 px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="font-comic text-xl text-black">TỔNG THANH TOÁN:</span>
            <span className="text-3xl font-comic text-comic-red">{formatCurrency(grandTotal)}</span>
          </div>
          <p className="text-[10px] text-stone-500 font-bold mt-1 text-right font-bubble">
            Đã bao gồm VAT & Quà tặng kèm theo từng tập
          </p>
        </div>
        
        <Button 
          variant="danger" 
          className="w-full !rounded-xl py-4 text-lg font-comic uppercase"
          onClick={onCheckout}
          disabled={totalItems === 0}
        >
          <span>👉 TIẾN HÀNH ĐẶT HÀNG</span>
        </Button>
        
        <div className="text-center text-[11px] font-black font-bubble uppercase text-stone-800 pt-1">
          <i className="fa-solid fa-shield-halved text-green-700 mr-1"></i> 100% Cam Kết Manga Bản Quyền NXB
        </div>
      </div>
    </div>
  );
}

