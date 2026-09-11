import React from "react";

export default function ShippingSettings({ shipping, handleChangeShipping, handleToggleShipping }) {
  return (
    <div className="xl:col-span-7 flex flex-col bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] font-bubble">
      {/* Header panel */}
      <div className="bg-green-200 text-black px-6 py-3 border-b-[3px] border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-box-open text-xl"></i>
          <h2 className="font-comic text-xl font-bold uppercase tracking-tight text-black">
            VẬN CHUYỂN & QUY TRÌNH ĐÓNG GÓI BẢO VỆ SÁCH
          </h2>
        </div>
        <span className="bg-white text-black border border-black px-3 py-1 font-comic uppercase text-[12px] font-bold shadow-[2px_2px_0px_#000]">
          CHUẨN SƯU TẦM ★★★★★
        </span>
      </div>
      <div className="p-6 flex flex-col gap-6">
        {/* Đối tác giao vận tích hợp */}
        <div className="flex flex-col gap-2">
          <span className="font-comic text-[16px] font-bold uppercase text-black">
            ĐỐI TÁC GIAO VẬN ĐANG LIÊN KẾT API
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border-[2px] border-black bg-[#ffd028]/15 shadow-[2px_2px_0px_#000] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-comic text-[14px] text-red-600 font-bold">
                  GHTK PRO
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-black"></span>
              </div>
              <p className="font-bubble font-bold text-[12px] text-gray-600">
                Lấy hàng tại kho 3 ca/ngày. Ưu tiên hàng dễ móp.
              </p>
              <span className="font-comic uppercase text-[10px] text-gray-800 font-bold uppercase mt-auto">
                MÃ KHÁCH: SWOO_GHTK_99
              </span>
            </div>
            <div className="p-4 border-[2px] border-black bg-white shadow-[2px_2px_0px_#000] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-comic text-[14px] text-black font-bold">
                  VIETTEL POST
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-black"></span>
              </div>
              <p className="font-bubble font-bold text-[12px] text-gray-600">
                Giao tuyến huyện đảo, vùng xa toàn quốc 48h.
              </p>
              <span className="font-comic uppercase text-[10px] text-gray-800 font-bold uppercase mt-auto">
                MÃ KHÁCH: VT_HQ_025
              </span>
            </div>
            <div className="p-4 border-[2px] border-black bg-white shadow-[2px_2px_0px_#000] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-comic text-[14px] text-green-600 font-bold">
                  AHAMOVE / GRAB
                </span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-black"></span>
              </div>
              <p className="font-bubble font-bold text-[12px] text-gray-600">
                Hỏa tốc nội thành Hà Nội & TP.HCM 2 giờ.
              </p>
              <span className="font-comic uppercase text-[10px] text-gray-800 font-bold uppercase mt-auto">
                MÃ KHÁCH: SWOO_EXPRESS_2H
              </span>
            </div>
          </div>
        </div>

        {/* Cấu hình ngưỡng Freeship */}
        <div className="p-4 bg-yellow-50 border-[2px] border-black shadow-[2px_2px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-comic text-[14px] font-bold uppercase text-black flex items-center gap-2">
              <i className="fa-solid fa-ticket text-red-600"></i>
              <span>Ngưỡng Miễn Phí Vận Chuyển (Freeship Toàn Quốc)</span>
            </span>
            <span className="font-bubble font-bold text-[12px] text-gray-600">
              Đơn hàng sách có giá trị thanh toán thực tế vượt ngưỡng này sẽ
              được trợ giá ship 100%.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <input
              className="w-36 bg-white border-[2px] border-black px-4 py-3 font-comic tracking-wider text-[16px] font-bold text-right text-black shadow-[2px_2px_0px_#000] focus:outline-none focus:border-[3px]"
              type="number"
              name="freeshipThreshold"
              value={shipping?.freeshipThreshold || 0}
              onChange={handleChangeShipping}
            />
            <span className="font-comic text-[16px] font-bold text-black bg-comic-yellow px-3 py-3 border-[2px] border-black shadow-[2px_2px_0px_#000]">
              VNĐ
            </span>
          </div>
        </div>

        {/* Checkbox Quy định đóng gói truyện sưu tầm */}
        <div className="flex flex-col gap-3">
          <span className="font-comic text-[14px] font-bold uppercase text-black flex items-center gap-2">
            <i className="fa-solid fa-shield text-blue-600"></i>
            <span>TIÊU CHUẨN ĐÓNG GÓI BẮT BUỘC TẠI KHO (OTA-CARE™)</span>
          </span>
          <div className="flex flex-col gap-2">
            {/* Checkbox 1 */}
            <label className="flex items-start gap-4 p-4 bg-white border-[2px] border-black shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                checked={shipping?.wrapRequired || false}
                onChange={(e) => handleToggleShipping("wrapRequired", e.target.checked)}
                className="mt-1 w-5 h-5 rounded-none accent-[#735c00] border-[2px] border-black cursor-pointer"
                type="checkbox"
              />
              <div className="flex flex-col">
                <span className="font-comic text-[14px] font-bold text-black uppercase">
                  Bọc màng co nhiệt bảo vệ bìa 100% sách xuất kho
                </span>
                <span className="font-bubble font-bold text-[12px] text-gray-600">
                  Ngăn chặn hoàn toàn ẩm mốc, trầy xước góc cạnh bìa áo Manga &
                  Light Novel trong quá trình lưu chuyển.
                </span>
              </div>
            </label>
            {/* Checkbox 2 */}
            <label className="flex items-start gap-4 p-4 bg-white border-[2px] border-black shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                checked={shipping?.bubbleWrap || false}
                onChange={(e) => handleToggleShipping("bubbleWrap", e.target.checked)}
                className="mt-1 w-5 h-5 rounded-none accent-[#735c00] border-[2px] border-black cursor-pointer"
                type="checkbox"
              />
              <div className="flex flex-col">
                <span className="font-comic text-[14px] font-bold text-black uppercase">
                  Đệm xốp bóng khí 4 lớp + Ke góc carton cứng chống móp
                </span>
                <span className="font-bubble font-bold text-[12px] text-gray-600">
                  Đảm bảo hộp carton chịu được lực rơi đập từ độ cao 1.5 mét
                  không ảnh hưởng đến gáy sách.
                </span>
              </div>
            </label>
            {/* Checkbox 3 */}
            <label className="flex items-start gap-4 p-4 bg-white border-[2px] border-black shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                checked={shipping?.freeBookmark || false}
                onChange={(e) => handleToggleShipping("freeBookmark", e.target.checked)}
                className="mt-1 w-5 h-5 rounded-none accent-[#735c00] border-[2px] border-black cursor-pointer"
                type="checkbox"
              />
              <div className="flex flex-col">
                <span className="font-comic text-[14px] font-bold text-black uppercase">
                  Tặng kèm Bookmark độc quyền Swoo Manga & Thư cảm ơn
                </span>
                <span className="font-bubble font-bold text-[12px] text-gray-600">
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
