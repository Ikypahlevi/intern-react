import React from "react";

export default function GeneralSettings({ settings, handleChange }) {
  return (
    <div className="xl:col-span-7 flex flex-col bg-surface-container-lowest border-[3px] border-on-background shadow-[4px_4px_0px_#1c1b1b] font-bubble">
      {/* Header panel */}
      <div className="bg-primary-container px-space-md py-space-xs border-b-[3px] border-on-background flex items-center justify-between">
        <div className="flex items-center gap-space-2xs">
          <i className="fa-solid fa-building text-secondary text-xl"></i>
          <h2 className="font-headline-md text-xl font-bold uppercase tracking-tight text-on-background">
            THÔNG TIN THƯƠNG HIỆU & PHÁP NHÂN
          </h2>
        </div>
        <span className="bg-surface-container-lowest text-on-background border border-on-background px-space-xs py-space-3xs font-label-caps text-[12px] font-bold shadow-[2px_2px_0px_#1c1b1b]">
          PUBLIC PROFILE
        </span>
      </div>

      {/* Nội dung form */}
      <div className="p-space-md flex flex-col gap-space-md">
        {/* Logo & Branding Image uploader */}
        <div className="flex flex-col sm:flex-row items-center gap-space-md p-space-sm bg-surface-container-low border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b]">
          <div className="relative w-28 h-28 shrink-0 bg-primary-container border-[2px] border-on-background shadow-[3px_3px_0px_#1c1b1b] flex flex-col items-center justify-center p-space-2xs text-center overflow-hidden">
            <img
              className="w-full h-full object-contain"
              alt="Logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3nIKC3-T3mFrJ760LSJbtKom6rM2_M_jGtZGRYqqOGEBZvZBHMHlZHNh8LCUUhOutbqswFUGyA9V9Hc7d8EkKya9oXmrz1J-VFO8cfjy3r5DtgbAmgOPR-wAHnyWIozVdDgbpOnNpEATfOZv88mXpc-qxgaQ0-XlnKuSHcDBIjEpYW1NIIVtRq42xCrNitkkIbIAlAe_BuaUC5_EhyJEIzbn7k-LFhqjy69WmK61Up9QASxUp_3HP_g"
            />
            <div className="absolute bottom-0 inset-x-0 bg-on-background text-primary-container font-label-caps text-[9px] uppercase font-bold py-space-3xs text-center">
              LOGO CHÍNH
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-space-2xs w-full">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-lg font-bold uppercase text-on-background">
                Ảnh đại diện & Logo Manga
              </span>
              <span className="font-label-caps text-[12px] text-on-surface-variant">
                PNG, SVG, WEBP ≤ 2MB
              </span>
            </div>
            <p className="font-body-sm text-[14px] text-on-surface-variant">
              Logo hiển thị trực tiếp trên hóa đơn xuất kho, tem vận chuyển dán
              ngoài thùng hàng và trang chủ độc giả.
            </p>
            <div className="flex flex-wrap gap-space-xs mt-space-2xs">
              <button className="flex items-center gap-space-2xs bg-primary-container text-on-background border-[2px] border-on-background font-headline-sm text-[14px] font-bold px-space-sm py-space-3xs shadow-[2px_2px_0px_#1c1b1b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none uppercase">
                <i className="fa-solid fa-upload"></i>
                <span>Tải Logo Mới</span>
              </button>
              <button className="flex items-center gap-space-2xs bg-surface-container-lowest text-secondary border-[2px] border-on-background font-headline-sm text-[14px] font-bold px-space-sm py-space-3xs shadow-[2px_2px_0px_#1c1b1b] hover:bg-error-container uppercase">
                <i className="fa-solid fa-trash"></i>
                <span>Đặt lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-space-3xs md:col-span-2">
            <label className="font-headline-sm text-[14px] font-bold uppercase text-on-background flex items-center justify-between">
              <span>Tên Sàn / Thương Hiệu Phát Hành</span>
              <span className="text-secondary font-label-caps text-[12px] font-bold">
                * BẮT BUỘC
              </span>
            </label>
            <input
              className="w-full bg-surface-container-lowest border-[2px] border-on-background px-space-sm py-space-xs font-title-md text-[16px] font-bold text-on-background shadow-[2px_2px_0px_#1c1b1b] focus:outline-none focus:border-[3px] focus:bg-[#fffff0]"
              type="text"
              name="brandName"
              value={settings.brandName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-space-3xs">
            <label className="font-headline-sm text-[14px] font-bold uppercase text-on-background flex items-center gap-space-2xs">
              <i className="fa-solid fa-headset text-[16px] text-secondary"></i>
              <span>Hotline CSKH (24/7)</span>
            </label>
            <input
              className="w-full bg-surface-container-lowest border-[2px] border-on-background px-space-sm py-space-xs font-label-numeric text-[16px] font-bold text-on-background shadow-[2px_2px_0px_#1c1b1b] focus:outline-none focus:border-[3px]"
              type="text"
              name="hotline"
              value={settings.hotline || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-space-3xs">
            <label className="font-headline-sm text-[14px] font-bold uppercase text-on-background flex items-center gap-space-2xs">
              <i className="fa-solid fa-envelope text-[16px] text-primary"></i>
              <span>Email Điều Hành Quản Trị</span>
            </label>
            <input
              className="w-full bg-surface-container-lowest border-[2px] border-on-background px-space-sm py-space-xs font-title-md text-[16px] font-bold text-on-background shadow-[2px_2px_0px_#1c1b1b] focus:outline-none focus:border-[3px]"
              type="email"
              name="email"
              value={settings.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-space-3xs md:col-span-2">
            <label className="font-headline-sm text-[14px] font-bold uppercase text-on-background flex items-center gap-space-2xs">
              <i className="fa-solid fa-warehouse text-[16px] text-secondary"></i>
              <span>Địa Chỉ Kho Tổng Vận Hành & Trả Hàng</span>
            </label>
            <div className="flex items-center gap-space-2xs">
              <input
                className="w-full bg-surface-container-lowest border-[2px] border-on-background px-space-sm py-space-xs font-title-md text-[16px] font-bold text-on-background shadow-[2px_2px_0px_#1c1b1b] focus:outline-none focus:border-[3px]"
                type="text"
                name="address"
                value={settings.address || ""}
                onChange={handleChange}
              />
              <button
                className="bg-surface-container-high border-[2px] border-on-background p-space-xs shadow-[2px_2px_0px_#1c1b1b] hover:bg-primary-container"
                title="Ghim định vị bản đồ"
              >
                <i className="fa-solid fa-location-dot text-[20px]"></i>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-space-3xs">
            <label className="font-headline-sm text-[14px] font-bold uppercase text-on-background">
              Đơn Vị Tiền Tệ & Tỷ Giá
            </label>
            <div className="flex items-center justify-between bg-surface-container-high border-[2px] border-on-background px-space-sm py-space-xs shadow-[2px_2px_0px_#1c1b1b]">
              <span className="font-label-numeric text-[16px] font-bold text-on-background">
                {settings.currency === "VND" ? "VND (₫) - VIỆT NAM ĐỒNG" : settings.currency}
              </span>
              <i className="fa-solid fa-lock text-on-surface-variant text-[16px]"></i>
            </div>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              Định dạng số thập phân: 0,000₫ (Chuẩn ISO-VN)
            </span>
          </div>

          <div className="flex flex-col gap-space-3xs">
            <label className="font-headline-sm text-[14px] font-bold uppercase text-on-background">
              Múi Giờ Máy Chủ Kho
            </label>
            <div className="flex items-center justify-between bg-surface-container-lowest border-[2px] border-on-background px-space-sm py-space-xs shadow-[2px_2px_0px_#1c1b1b]">
              <span className="font-title-md text-[16px] font-bold text-on-background">
                GMT+07:00 ({settings.timezone})
              </span>
              <span className="font-label-caps text-[10px] font-bold bg-primary-container px-space-2xs py-space-3xs border border-on-background">
                DEFAULT
              </span>
            </div>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              Áp dụng cho báo cáo doanh số & tự động cập nhật tồn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
