import React from "react";

export default function OrdersBottomWidgets() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-bubble">
      {/* Quy chuẩn đóng gói */}
      <div className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b]">
        <div className="flex items-center justify-between border-b-[2px] border-black pb-2 mb-3">
          <span className="font-comic text-sm uppercase text-black flex items-center gap-2">
            <i className="fa-solid fa-box text-red-600"></i> QUY CHUẨN ĐÓNG BỌC
          </span>
          <span className="font-comic text-[10px] bg-yellow-200 border border-black px-1.5 py-0.5">SOP-2026</span>
        </div>
        <ul className="space-y-2 text-sm text-black">
          <li className="flex items-start gap-2">
            <i className="fa-solid fa-check-circle text-green-600 mt-0.5"></i>
            <span><strong>Màng co nhiệt:</strong> Ép góc 4 cạnh chuẩn 100% không làm móp mép bìa.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fa-solid fa-check-circle text-green-600 mt-0.5"></i>
            <span><strong>Chống sốc:</strong> Tối thiểu 3 vòng Bubble Wrap hạt bóng khí dày.</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fa-solid fa-check-circle text-green-600 mt-0.5"></i>
            <span><strong>Quà tặng kèm:</strong> Bọc kèm bìa carton sóng đôi chống bẻ cong.</span>
          </li>
        </ul>
      </div>

      {/* Đối tác vận chuyển */}
      <div className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b]">
        <div className="flex items-center justify-between border-b-[2px] border-black pb-2 mb-3">
          <span className="font-comic text-sm uppercase text-black flex items-center gap-2">
            <i className="fa-solid fa-truck-fast text-blue-600"></i> ĐỐI TÁC VẬN CHUYỂN
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black animate-pulse"></span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-100 border-[2px] border-black">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-motorcycle text-green-600"></i>
              <span className="font-bold text-black text-sm">GrabExpress 2H</span>
            </div>
            <span className="font-comic text-[10px] bg-yellow-300 px-2 border border-black">LIVE</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 border-[2px] border-black">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-truck text-green-600"></i>
              <span className="font-bold text-black text-sm">Giao Hàng Tiết Kiệm</span>
            </div>
            <span className="font-comic text-[10px] bg-white px-2 border border-black">SẴN SÀNG</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 border-[2px] border-black">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-van-shuttle text-red-600"></i>
              <span className="font-bold text-black text-sm">Viettel Post</span>
            </div>
            <span className="font-comic text-[10px] bg-white px-2 border border-black">SẴN SÀNG</span>
          </div>
        </div>
      </div>

      {/* Thao tác nhanh */}
      <div className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#1c1b1b] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b-[2px] border-black pb-2 mb-3">
            <span className="font-comic text-sm uppercase text-black flex items-center gap-2">
              <i className="fa-solid fa-bolt text-yellow-500"></i> THAO TÁC NHANH KHỐI HQ
            </span>
            <span className="font-comic text-[10px] bg-red-600 text-white px-1.5 py-0.5 border border-black">HOTKEY</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 border-[2px] border-black bg-gray-50 hover:bg-yellow-100 text-left shadow-[2px_2px_0px_#1c1b1b] transition-all">
              <span className="font-comic text-[10px] text-gray-500 block">ALT + P</span>
              <span className="font-bold text-black text-xs block">In bill đã chọn</span>
            </button>
            <button className="p-2 border-[2px] border-black bg-gray-50 hover:bg-yellow-100 text-left shadow-[2px_2px_0px_#1c1b1b] transition-all">
              <span className="font-comic text-[10px] text-gray-500 block">ALT + A</span>
              <span className="font-bold text-black text-xs block">Duyệt gói hàng</span>
            </button>
            <button className="p-2 border-[2px] border-black bg-gray-50 hover:bg-yellow-100 text-left shadow-[2px_2px_0px_#1c1b1b] transition-all">
              <span className="font-comic text-[10px] text-gray-500 block">ALT + F</span>
              <span className="font-bold text-black text-xs block">Tìm mã vận đơn</span>
            </button>
            <button className="p-2 border-[2px] border-black bg-gray-50 hover:bg-yellow-100 text-left shadow-[2px_2px_0px_#1c1b1b] transition-all">
              <span className="font-comic text-[10px] text-gray-500 block">ALT + R</span>
              <span className="font-bold text-black text-xs block">Đồng bộ Viettel</span>
            </button>
          </div>
        </div>
        <div className="mt-4 pt-2 border-t-[2px] border-black flex items-center justify-between text-gray-600 text-xs">
          <span>Máy in tem mã vạch Xprinter:</span>
          <span className="text-green-600 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> SẴN SÀNG IN
          </span>
        </div>
      </div>
    </section>
  );
}
