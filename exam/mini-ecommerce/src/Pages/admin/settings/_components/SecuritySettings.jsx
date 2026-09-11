import React from "react";

export default function SecuritySettings({ security, handleToggleSecurity }) {
  return (
    <div className="xl:col-span-5 flex flex-col bg-surface-container-lowest border-[3px] border-on-background shadow-[4px_4px_0px_#1c1b1b] font-bubble">
      {/* Header panel */}
      <div className="bg-surface-container-highest px-space-md py-space-xs border-b-[3px] border-on-background flex items-center justify-between">
        <div className="flex items-center gap-space-2xs">
          <i className="fa-solid fa-shield-halved text-secondary text-xl"></i>
          <h2 className="font-headline-md text-xl font-bold uppercase tracking-tight text-on-background">
            AN NINH & SAO LƯU DỮ LIỆU
          </h2>
        </div>
        <span className="bg-secondary text-white border border-on-background px-space-xs py-space-3xs font-label-caps text-[12px] font-bold shadow-[2px_2px_0px_#1c1b1b]">
          HIGH DEFENSE
        </span>
      </div>

      <div className="p-space-md flex flex-col gap-space-md flex-1 justify-between">
        <div className="flex flex-col gap-space-sm">
          {/* 2FA Setting item */}
          <div className="p-space-sm bg-surface-container-low border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b] flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 bg-primary-container border-[2px] border-on-background flex items-center justify-center font-bold text-on-background shadow-[1px_1px_0px_#1c1b1b]">
                <i className="fa-solid fa-mobile-screen-button text-[20px]"></i>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-background uppercase">
                  BẮT BUỘC 2FA QUẢN TRỊ VIÊN
                </span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  OTP qua Google Authenticator hoặc YubiKey.
                </span>
              </div>
            </div>
            {/* Comic Toggle Button */}
            <button
              onClick={() => handleToggleSecurity("require2FA")}
              className={`w-12 h-6 border-[2px] border-on-background rounded-full p-space-3xs flex items-center cursor-pointer shadow-[2px_2px_0px_#1c1b1b] transition-colors ${
                security?.require2FA ? "bg-primary-container" : "bg-surface-container-high"
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
          <div className="p-space-sm bg-surface-container-low border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b] flex flex-col gap-space-2xs">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-[14px] font-bold uppercase text-on-background flex items-center gap-space-2xs">
                <i className="fa-solid fa-cloud-arrow-up text-primary"></i>
                <span>Tự Động Sao Lưu (Cloud Auto-Dump)</span>
              </span>
              <span className="font-label-caps text-[10px] bg-surface-container-lowest px-space-xs py-space-3xs border border-on-background font-bold">
                {security?.backupTime || "02:00 AM MỖI NGÀY"}
              </span>
            </div>
            <p className="font-body-sm text-[14px] text-on-surface-variant">
              Bản sao lưu gần nhất:{" "}
              <strong className="text-on-background">
                Hôm nay lúc 02:00:14 AM (Dung lượng: 1.48 GB)
              </strong>{" "}
              trên máy chủ S3 Tokyo.
            </p>
            <div className="w-full bg-surface-container-highest border border-on-background h-3 relative overflow-hidden mt-space-3xs">
              <div className="bg-primary-container h-full w-[84%] border-r border-on-background"></div>
            </div>
            <div className="flex justify-between font-label-caps text-[10px] text-on-surface-variant">
              <span>ĐÃ DÙNG 84% BỘ NHỚ LƯU TRỮ LOG (42/50 GB)</span>
              <span className="text-secondary font-bold">
                KHUYÊN DÙNG TẢI VỀ NGOẠI TUYẾN
              </span>
            </div>
          </div>

          {/* Warning callout Manga Speech style */}
          <div className="relative p-space-sm bg-primary-container border-[2px] border-on-background shadow-[3px_3px_0px_#1c1b1b] flex items-start gap-space-xs mt-2">
            <i className="fa-solid fa-triangle-exclamation text-secondary text-[24px]"></i>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[14px] font-bold uppercase text-on-background">
                CẢNH BÁO TỪ HỆ THỐNG AN NINH HQ
              </span>
              <p className="font-body-sm text-[12px] text-on-surface mt-1">
                Khi ấn xóa bộ nhớ đệm (Cache), toàn bộ phiên đăng nhập người
                dùng trên ứng dụng Mobile đọc truyện sẽ được làm mới trong 30
                giây.
              </p>
            </div>
          </div>
        </div>

        {/* Nút tác vụ an ninh tức thì */}
        <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs border-t-[2px] border-on-background mt-4">
          <button className="flex-1 flex items-center justify-center gap-space-2xs bg-surface-container-lowest hover:bg-surface-container-high text-on-background border-[2px] border-on-background py-space-xs px-space-sm font-headline-sm text-[14px] font-bold uppercase shadow-[3px_3px_0px_#1c1b1b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1c1b1b] transition-all">
            <i className="fa-solid fa-cloud-arrow-down text-[18px] text-primary"></i>
            <span>SAO LƯU NGAY (FORCE DUMP)</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-space-2xs bg-secondary text-white hover:bg-red-700 border-[2px] border-on-background py-space-xs px-space-sm font-headline-sm text-[14px] font-bold uppercase shadow-[3px_3px_0px_#1c1b1b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1c1b1b] transition-all">
            <i className="fa-solid fa-broom text-[18px]"></i>
            <span>XÓA CACHE TOÀN SÀN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
