import React from "react";

export default function ShippingSettings({ shipping, handleChangeShipping, handleToggleShipping }) {
  return (
    <div className="xl:col-span-7 flex flex-col bg-surface-container-lowest border-[3px] border-on-background shadow-[4px_4px_0px_#1c1b1b] font-bubble">
      {/* Header panel */}
      <div className="bg-tertiary-container text-on-tertiary-container px-space-md py-space-xs border-b-[3px] border-on-background flex items-center justify-between">
        <div className="flex items-center gap-space-2xs">
          <i className="fa-solid fa-box-open text-xl"></i>
          <h2 className="font-headline-md text-xl font-bold uppercase tracking-tight text-on-tertiary-container">
            VẬN CHUYỂN & QUY TRÌNH ĐÓNG GÓI BẢO VỆ SÁCH
          </h2>
        </div>
        <span className="bg-surface-container-lowest text-on-background border border-on-background px-space-xs py-space-3xs font-label-caps text-[12px] font-bold shadow-[2px_2px_0px_#1c1b1b]">
          CHUẨN SƯU TẦM ★★★★★
        </span>
      </div>
      <div className="p-space-md flex flex-col gap-space-md">
        {/* Đối tác giao vận tích hợp */}
        <div className="flex flex-col gap-space-2xs">
          <span className="font-headline-sm text-[16px] font-bold uppercase text-on-background">
            ĐỐI TÁC GIAO VẬN ĐANG LIÊN KẾT API
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div className="p-space-sm border-[2px] border-on-background bg-[#ffd028]/15 shadow-[2px_2px_0px_#1c1b1b] flex flex-col gap-space-3xs">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-[14px] text-secondary font-bold">
                  GHTK PRO
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-on-background"></span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                Lấy hàng tại kho 3 ca/ngày. Ưu tiên hàng dễ móp.
              </p>
              <span className="font-label-caps text-[10px] text-on-surface font-bold uppercase mt-auto">
                MÃ KHÁCH: SWOO_GHTK_99
              </span>
            </div>
            <div className="p-space-sm border-[2px] border-on-background bg-surface-container-lowest shadow-[2px_2px_0px_#1c1b1b] flex flex-col gap-space-3xs">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-[14px] text-on-background font-bold">
                  VIETTEL POST
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-on-background"></span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                Giao tuyến huyện đảo, vùng xa toàn quốc 48h.
              </p>
              <span className="font-label-caps text-[10px] text-on-surface font-bold uppercase mt-auto">
                MÃ KHÁCH: VT_HQ_025
              </span>
            </div>
            <div className="p-space-sm border-[2px] border-on-background bg-surface-container-lowest shadow-[2px_2px_0px_#1c1b1b] flex flex-col gap-space-3xs">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-[14px] text-tertiary font-bold">
                  AHAMOVE / GRAB
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-on-background"></span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                Hỏa tốc nội thành Hà Nội & TP.HCM 2 giờ.
              </p>
              <span className="font-label-caps text-[10px] text-on-surface font-bold uppercase mt-auto">
                MÃ KHÁCH: SWOO_EXPRESS_2H
              </span>
            </div>
          </div>
        </div>

        {/* Cấu hình ngưỡng Freeship */}
        <div className="p-space-sm bg-surface-container-low border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b] flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex flex-col">
            <span className="font-headline-sm text-[14px] font-bold uppercase text-on-background flex items-center gap-space-2xs">
              <i className="fa-solid fa-ticket text-secondary"></i>
              <span>Ngưỡng Miễn Phí Vận Chuyển (Freeship Toàn Quốc)</span>
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              Đơn hàng sách có giá trị thanh toán thực tế vượt ngưỡng này sẽ
              được trợ giá ship 100%.
            </span>
          </div>
          <div className="flex items-center gap-space-2xs shrink-0">
            <input
              className="w-36 bg-surface-container-lowest border-[2px] border-on-background px-space-sm py-space-xs font-label-numeric text-[16px] font-bold text-right text-on-background shadow-[2px_2px_0px_#1c1b1b] focus:outline-none focus:border-[3px]"
              type="number"
              name="freeshipThreshold"
              value={shipping?.freeshipThreshold || 0}
              onChange={handleChangeShipping}
            />
            <span className="font-headline-sm text-[16px] font-bold text-on-background bg-primary-container px-space-xs py-space-xs border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b]">
              VNĐ
            </span>
          </div>
        </div>

        {/* Checkbox Quy định đóng gói truyện sưu tầm */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-headline-sm text-[14px] font-bold uppercase text-on-background flex items-center gap-space-2xs">
            <i className="fa-solid fa-shield text-primary"></i>
            <span>TIÊU CHUẨN ĐÓNG GÓI BẮT BUỘC TẠI KHO (OTA-CARE™)</span>
          </span>
          <div className="flex flex-col gap-space-2xs">
            {/* Checkbox 1 */}
            <label className="flex items-start gap-space-sm p-space-sm bg-surface-container-lowest border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b] cursor-pointer hover:bg-surface-container-high transition-colors">
              <input
                checked={shipping?.wrapRequired || false}
                onChange={(e) => handleToggleShipping("wrapRequired", e.target.checked)}
                className="mt-1 w-5 h-5 rounded-none accent-[#735c00] border-[2px] border-on-background cursor-pointer"
                type="checkbox"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-background uppercase">
                  Bọc màng co nhiệt bảo vệ bìa 100% sách xuất kho
                </span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  Ngăn chặn hoàn toàn ẩm mốc, trầy xước góc cạnh bìa áo Manga &
                  Light Novel trong quá trình lưu chuyển.
                </span>
              </div>
            </label>
            {/* Checkbox 2 */}
            <label className="flex items-start gap-space-sm p-space-sm bg-surface-container-lowest border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b] cursor-pointer hover:bg-surface-container-high transition-colors">
              <input
                checked={shipping?.bubbleWrap || false}
                onChange={(e) => handleToggleShipping("bubbleWrap", e.target.checked)}
                className="mt-1 w-5 h-5 rounded-none accent-[#735c00] border-[2px] border-on-background cursor-pointer"
                type="checkbox"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-background uppercase">
                  Đệm xốp bóng khí 4 lớp + Ke góc carton cứng chống móp
                </span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  Đảm bảo hộp carton chịu được lực rơi đập từ độ cao 1.5 mét
                  không ảnh hưởng đến gáy sách.
                </span>
              </div>
            </label>
            {/* Checkbox 3 */}
            <label className="flex items-start gap-space-sm p-space-sm bg-surface-container-lowest border-[2px] border-on-background shadow-[2px_2px_0px_#1c1b1b] cursor-pointer hover:bg-surface-container-high transition-colors">
              <input
                checked={shipping?.freeBookmark || false}
                onChange={(e) => handleToggleShipping("freeBookmark", e.target.checked)}
                className="mt-1 w-5 h-5 rounded-none accent-[#735c00] border-[2px] border-on-background cursor-pointer"
                type="checkbox"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-background uppercase">
                  Tặng kèm Bookmark độc quyền Swoo Manga & Thư cảm ơn
                </span>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  Tự động trừ tồn kho ấn phẩm khuyến mãi khi nhân viên quét mã
                  đóng thùng.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
