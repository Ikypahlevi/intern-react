import React from "react";

export default function GeneralSettings({ settings, handleChange }) {
  return (
    <div className="xl:col-span-7 flex flex-col bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] font-bubble">
      {/* Header panel */}
      <div className="bg-comic-yellow px-6 py-3 border-b-[3px] border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-building text-red-600 text-xl"></i>
          <h2 className="font-comic text-xl font-bold uppercase tracking-tight text-black">
            THÔNG TIN THƯƠNG HIỆU & PHÁP NHÂN
          </h2>
        </div>
        <span className="bg-white text-black border border-black px-3 py-1 font-comic uppercase text-[12px] font-bold shadow-[2px_2px_0px_#000]">
          PUBLIC PROFILE
        </span>
      </div>

      {/* Nội dung form */}
      <div className="p-6 flex flex-col gap-6">
        {/* Logo & Branding Image uploader */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-yellow-50 border-[2px] border-black shadow-[2px_2px_0px_#000]">
          <div className="relative w-28 h-28 shrink-0 bg-comic-yellow border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col items-center justify-center p-2 text-center overflow-hidden">
            <img
              className="w-full h-full object-contain"
              alt="Logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3nIKC3-T3mFrJ760LSJbtKom6rM2_M_jGtZGRYqqOGEBZvZBHMHlZHNh8LCUUhOutbqswFUGyA9V9Hc7d8EkKya9oXmrz1J-VFO8cfjy3r5DtgbAmgOPR-wAHnyWIozVdDgbpOnNpEATfOZv88mXpc-qxgaQ0-XlnKuSHcDBIjEpYW1NIIVtRq42xCrNitkkIbIAlAe_BuaUC5_EhyJEIzbn7k-LFhqjy69WmK61Up9QASxUp_3HP_g"
            />
            <div className="absolute bottom-0 inset-x-0 bg-on-background text-blue-600-container font-comic uppercase text-[9px] uppercase font-bold py-1 text-center">
              LOGO CHÍNH
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <span className="font-comic text-lg font-bold uppercase text-black">
                Ảnh đại diện & Logo Manga
              </span>
              <span className="font-comic uppercase text-[12px] text-gray-600">
                PNG, SVG, WEBP ≤ 2MB
              </span>
            </div>
            <p className="font-bubble font-bold text-[14px] text-gray-600">
              Logo hiển thị trực tiếp trên hóa đơn xuất kho, tem vận chuyển dán
              ngoài thùng hàng và trang chủ độc giả.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <button className="flex items-center gap-2 bg-comic-yellow text-black border-[2px] border-black font-comic text-[14px] font-bold px-4 py-1 shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none uppercase">
                <i className="fa-solid fa-upload"></i>
                <span>Tải Logo Mới</span>
              </button>
              <button className="flex items-center gap-2 bg-white text-red-600 border-[2px] border-black font-comic text-[14px] font-bold px-4 py-1 shadow-[2px_2px_0px_#000] hover:bg-red-200 uppercase">
                <i className="fa-solid fa-trash"></i>
                <span>Đặt lại</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="font-comic text-[14px] font-bold uppercase text-black flex items-center justify-between">
              <span>Tên Sàn / Thương Hiệu Phát Hành</span>
              <span className="text-red-600 font-comic uppercase text-[12px] font-bold">
                * BẮT BUỘC
              </span>
            </label>
            <input
              className="w-full bg-white border-[2px] border-black px-4 py-3 font-bubble font-bold text-[16px] font-bold text-black shadow-[2px_2px_0px_#000] focus:outline-none focus:border-[3px] focus:bg-[#fffff0]"
              type="text"
              name="brandName"
              value={settings.brandName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-comic text-[14px] font-bold uppercase text-black flex items-center gap-2">
              <i className="fa-solid fa-headset text-[16px] text-red-600"></i>
              <span>Hotline CSKH (24/7)</span>
            </label>
            <input
              className="w-full bg-white border-[2px] border-black px-4 py-3 font-comic tracking-wider text-[16px] font-bold text-black shadow-[2px_2px_0px_#000] focus:outline-none focus:border-[3px]"
              type="text"
              name="hotline"
              value={settings.hotline || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-comic text-[14px] font-bold uppercase text-black flex items-center gap-2">
              <i className="fa-solid fa-envelope text-[16px] text-blue-600"></i>
              <span>Email Điều Hành Quản Trị</span>
            </label>
            <input
              className="w-full bg-white border-[2px] border-black px-4 py-3 font-bubble font-bold text-[16px] font-bold text-black shadow-[2px_2px_0px_#000] focus:outline-none focus:border-[3px]"
              type="email"
              name="email"
              value={settings.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="font-comic text-[14px] font-bold uppercase text-black flex items-center gap-2">
              <i className="fa-solid fa-warehouse text-[16px] text-red-600"></i>
              <span>Địa Chỉ Kho Tổng Vận Hành & Trả Hàng</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                className="w-full bg-white border-[2px] border-black px-4 py-3 font-bubble font-bold text-[16px] font-bold text-black shadow-[2px_2px_0px_#000] focus:outline-none focus:border-[3px]"
                type="text"
                name="address"
                value={settings.address || ""}
                onChange={handleChange}
              />
              <button
                className="bg-gray-100 border-[2px] border-black p-3 shadow-[2px_2px_0px_#000] hover:bg-comic-yellow"
                title="Ghim định vị bản đồ"
              >
                <i className="fa-solid fa-location-dot text-[20px]"></i>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-comic text-[14px] font-bold uppercase text-black">
              Đơn Vị Tiền Tệ & Tỷ Giá
            </label>
            <div className="flex items-center justify-between bg-gray-100 border-[2px] border-black px-4 py-3 shadow-[2px_2px_0px_#000]">
              <span className="font-comic tracking-wider text-[16px] font-bold text-black">
                {settings.currency === "VND" ? "VND (₫) - VIỆT NAM ĐỒNG" : settings.currency}
              </span>
              <i className="fa-solid fa-lock text-gray-600 text-[16px]"></i>
            </div>
            <span className="font-bubble font-bold text-[12px] text-gray-600">
              Định dạng số thập phân: 0,000₫ (Chuẩn ISO-VN)
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-comic text-[14px] font-bold uppercase text-black">
              Múi Giờ Máy Chủ Kho
            </label>
            <div className="flex items-center justify-between bg-white border-[2px] border-black px-4 py-3 shadow-[2px_2px_0px_#000]">
              <span className="font-bubble font-bold text-[16px] font-bold text-black">
                GMT+07:00 ({settings.timezone})
              </span>
              <span className="font-comic uppercase text-[10px] font-bold bg-comic-yellow px-2 py-1 border border-black">
                DEFAULT
              </span>
            </div>
            <span className="font-bubble font-bold text-[12px] text-gray-600">
              Áp dụng cho báo cáo doanh số & tự động cập nhật tồn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
