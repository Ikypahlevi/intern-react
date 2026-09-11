import React from "react";

export default function SettingsHeader() {
  return (
    <>
      <div className="py-space-md flex flex-wrap items-center justify-between gap-space-sm border-b-[3px] border-on-background bg-surface-container-low px-space-md mb-space-lg shadow-[0_3px_0px_#1c1b1b]">
        <div className="flex items-center gap-space-xs font-label-caps text-[12px] uppercase tracking-wider text-on-surface">
          <span className="font-bold text-secondary">KHO TỔNG HQ</span>
          <i className="fa-solid fa-chevron-right text-[12px]"></i>
          <span className="bg-surface-container-highest px-space-xs py-space-3xs border border-on-background font-bold shadow-[1px_1px_0px_#1c1b1b]">
            THIẾT LẬP HỆ THỐNG & CẤU HÌNH ADMIN v2.4
          </span>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-space-2xs bg-surface-container-lowest border-[2px] border-on-background px-space-xs py-space-3xs shadow-[2px_2px_0px_#1c1b1b]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-on-background animate-ping"></span>
            <span className="font-label-caps text-[12px] font-bold text-on-surface uppercase">
              🟢 HỆ THỐNG: BÌNH THƯỜNG
            </span>
          </div>
          <div className="flex items-center gap-space-2xs bg-tertiary-container text-on-tertiary-container border-[2px] border-on-background px-space-xs py-space-3xs shadow-[2px_2px_0px_#1c1b1b]">
            <i className="fa-solid fa-database text-[14px]"></i>
            <span className="font-label-caps text-[12px] font-bold uppercase">
              ⚡ DATABASE V2: ONLINE
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-space-2xs bg-secondary-container text-on-secondary border-[2px] border-on-background px-space-xs py-space-3xs shadow-[2px_2px_0px_#1c1b1b]">
            <i className="fa-solid fa-lock text-[14px]"></i>
            <span className="font-label-caps text-[12px] font-bold uppercase">
              SSL: ENCRYPTED 256-BIT
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col gap-space-2xs">
          <div className="inline-flex items-center gap-space-2xs self-start bg-primary-container text-on-background border-[2px] border-on-background px-space-xs py-space-3xs font-label-caps text-[12px] font-bold shadow-[2px_2px_0px_#1c1b1b] uppercase">
            <i className="fa-solid fa-gear text-[14px]"></i>
            <span>TRUNG TÂM CẤU HÌNH HỆ THỐNG</span>
          </div>
          <h1 className="font-headline-xl text-4xl font-bold text-on-background uppercase tracking-tight flex items-center gap-space-xs">
            <span>CÀI ĐẶT HỆ THỐNG & CHÍNH SÁCH CỬA HÀNG</span>
            <span className="text-secondary">⚡</span>
          </h1>
          <p className="font-body-md text-[16px] text-on-surface-variant max-w-3xl">
            Quản lý thông tin thương hiệu Swoo Manga, cấu hình cổng thanh toán
            trực tuyến, đối tác vận chuyển hỏa tốc, tiêu chuẩn màng co bọc
            truyện chống va đập và bảo mật 2 lớp API.
          </p>
        </div>
        <div className="flex items-center gap-space-xs self-start lg:self-auto">
          <div className="bg-surface-container-lowest border-[2px] border-on-background p-space-xs shadow-[3px_3px_0px_#1c1b1b] flex items-center gap-space-xs">
            <i className="fa-solid fa-certificate text-secondary text-[24px]"></i>
            <div className="flex flex-col">
              <span className="font-label-caps text-[12px] text-on-surface-variant uppercase">
                Phiên bản Config
              </span>
              <span className="font-label-numeric text-[14px] font-bold text-on-background">
                BUILD #2024.11-STABLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
