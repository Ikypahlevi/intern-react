import React from "react";

export default function SettingsHeader() {
  return (
    <>
      <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-black bg-yellow-50 px-6 mb-8 shadow-[0_3px_0px_#000]">
        <div className="flex items-center gap-3 font-comic uppercase text-[12px] uppercase tracking-wider text-gray-800">
          <span className="font-bold text-red-600">KHO TỔNG HQ</span>
          <i className="fa-solid fa-chevron-right text-[12px]"></i>
          <span className="bg-gray-100est px-3 py-1 border border-black font-bold shadow-[1px_1px_0px_#000]">
            THIẾT LẬP HỆ THỐNG & CẤU HÌNH ADMIN v2.4
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border-[2px] border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-black animate-ping"></span>
            <span className="font-comic uppercase text-[12px] font-bold text-gray-800 uppercase">
              🟢 HỆ THỐNG: BÌNH THƯỜNG
            </span>
          </div>
          <div className="flex items-center gap-2 bg-green-200 text-black border-[2px] border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
            <i className="fa-solid fa-database text-[14px]"></i>
            <span className="font-comic uppercase text-[12px] font-bold uppercase">
              ⚡ DATABASE V2: ONLINE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-red-500 text-white border-[2px] border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
            <i className="fa-solid fa-lock text-[14px]"></i>
            <span className="font-comic uppercase text-[12px] font-bold uppercase">
              SSL: ENCRYPTED 256-BIT
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 self-start bg-comic-yellow text-black border-[2px] border-black px-3 py-1 font-comic uppercase text-[12px] font-bold shadow-[2px_2px_0px_#000] uppercase">
            <i className="fa-solid fa-gear text-[14px]"></i>
            <span>TRUNG TÂM CẤU HÌNH HỆ THỐNG</span>
          </div>
          <h1 className="font-headline-xl text-4xl font-bold text-black uppercase tracking-tight flex items-center gap-3">
            <span>CÀI ĐẶT HỆ THỐNG & CHÍNH SÁCH CỬA HÀNG</span>
            <span className="text-red-600">⚡</span>
          </h1>
          <p className="font-body-md text-[16px] text-gray-600 max-w-3xl">
            Quản lý thông tin thương hiệu Swoo Manga, cấu hình cổng thanh toán
            trực tuyến, đối tác vận chuyển hỏa tốc, tiêu chuẩn màng co bọc
            truyện chống va đập và bảo mật 2 lớp API.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start lg:self-auto">
          <div className="bg-white border-[2px] border-black p-3 shadow-[3px_3px_0px_#000] flex items-center gap-3">
            <i className="fa-solid fa-certificate text-red-600 text-[24px]"></i>
            <div className="flex flex-col">
              <span className="font-comic uppercase text-[12px] text-gray-600 uppercase">
                Phiên bản Config
              </span>
              <span className="font-comic tracking-wider text-[14px] font-bold text-black">
                BUILD #2024.11-STABLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
