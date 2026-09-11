import React from "react";

export default function SecuritySettings({ security, handleToggleSecurity }) {
  return (
    <div className="xl:col-span-5 flex flex-col bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] font-bubble">
      {/* Header panel */}
      <div className="bg-gray-100est px-6 py-3 border-b-[3px] border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-shield-halved text-red-600 text-xl"></i>
          <h2 className="font-comic text-xl font-bold uppercase tracking-tight text-black">
            AN NINH & SAO LƯU DỮ LIỆU
          </h2>
        </div>
        <span className="bg-red-600 text-white border border-black px-3 py-1 font-comic uppercase text-[12px] font-bold shadow-[2px_2px_0px_#000]">
          HIGH DEFENSE
        </span>
      </div>

      <div className="p-6 flex flex-col gap-6 flex-1 justify-between">
        <div className="flex flex-col gap-4">
          {/* 2FA Setting item */}
          <div className="p-4 bg-yellow-50 border-[2px] border-black shadow-[2px_2px_0px_#000] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-comic-yellow border-[2px] border-black flex items-center justify-center font-bold text-black shadow-[1px_1px_0px_#000]">
                <i className="fa-solid fa-mobile-screen-button text-[20px]"></i>
              </div>
              <div className="flex flex-col">
                <span className="font-comic text-[14px] font-bold text-black uppercase">
                  BẮT BUỘC 2FA QUẢN TRỊ VIÊN
                </span>
                <span className="font-bubble font-bold text-[12px] text-gray-600">
                  OTP qua Google Authenticator hoặc YubiKey.
                </span>
              </div>
            </div>
            {/* Comic Toggle Button */}
            <button
              onClick={() => handleToggleSecurity("require2FA")}
              className={`w-12 h-6 border-[2px] border-black rounded-full p-1 flex items-center cursor-pointer shadow-[2px_2px_0px_#000] transition-colors ${
                security?.require2FA ? "bg-comic-yellow" : "bg-gray-100"
              }`}
              type="button"
            >
              <span
                className={`w-4 h-4 bg-on-background rounded-full transform transition-transform ${
                  security?.require2FA ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </button>
          </div>

          {/* Auto Backup info card */}
          <div className="p-4 bg-yellow-50 border-[2px] border-black shadow-[2px_2px_0px_#000] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-comic text-[14px] font-bold uppercase text-black flex items-center gap-2">
                <i className="fa-solid fa-cloud-arrow-up text-blue-600"></i>
                <span>Tự Động Sao Lưu (Cloud Auto-Dump)</span>
              </span>
              <span className="font-comic uppercase text-[10px] bg-white px-3 py-1 border border-black font-bold">
                {security?.backupTime || "02:00 AM MỖI NGÀY"}
              </span>
            </div>
            <p className="font-bubble font-bold text-[14px] text-gray-600">
              Bản sao lưu gần nhất:{" "}
              <strong className="text-black">
                Hôm nay lúc 02:00:14 AM (Dung lượng: 1.48 GB)
              </strong>{" "}
              trên máy chủ S3 Tokyo.
            </p>
            <div className="w-full bg-gray-100est border border-black h-3 relative overflow-hidden mt-1">
              <div className="bg-comic-yellow h-full w-[84%] border-r border-black"></div>
            </div>
            <div className="flex justify-between font-comic uppercase text-[10px] text-gray-600">
              <span>ĐÃ DÙNG 84% BỘ NHỚ LƯU TRỮ LOG (42/50 GB)</span>
              <span className="text-red-600 font-bold">
                KHUYÊN DÙNG TẢI VỀ NGOẠI TUYẾN
              </span>
            </div>
          </div>

          {/* Warning callout Manga Speech style */}
          <div className="relative p-4 bg-comic-yellow border-[2px] border-black shadow-[3px_3px_0px_#000] flex items-start gap-3 mt-2">
            <i className="fa-solid fa-triangle-exclamation text-red-600 text-[24px]"></i>
            <div className="flex flex-col">
              <span className="font-comic text-[14px] font-bold uppercase text-black">
                CẢNH BÁO TỪ HỆ THỐNG AN NINH HQ
              </span>
              <p className="font-bubble font-bold text-[12px] text-gray-800 mt-1">
                Khi ấn xóa bộ nhớ đệm (Cache), toàn bộ phiên đăng nhập người
                dùng trên ứng dụng Mobile đọc truyện sẽ được làm mới trong 30
                giây.
              </p>
            </div>
          </div>
        </div>

        {/* Nút tác vụ an ninh tức thì */}
        <div className="flex flex-col sm:flex-row gap-4 pt-3 border-t-[2px] border-black mt-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black border-[2px] border-black py-3 px-4 font-comic text-[14px] font-bold uppercase shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
            <i className="fa-solid fa-cloud-arrow-down text-[18px] text-blue-600"></i>
            <span>SAO LƯU NGAY (FORCE DUMP)</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 border-[2px] border-black py-3 px-4 font-comic text-[14px] font-bold uppercase shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all">
            <i className="fa-solid fa-broom text-[18px]"></i>
            <span>XÓA CACHE TOÀN SÀN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
