import React from "react";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";

export default function SettingsActionBar({ isDirty, onSave, onCancel, isSaving }) {
  if (!isDirty) return null;

  return (
    <div className="sticky bottom-0 z-30 -mx-6 px-6 py-4 bg-white border-t-[3px] border-black shadow-[0_-4px_0px_#000] flex flex-wrap items-center justify-between gap-6 font-bubble animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-none border-[2px] border-black bg-red-600 text-white flex items-center justify-center font-bold animate-bounce shadow-[2px_2px_0px_#000]">
          !
        </div>
        <div className="flex flex-col">
          <span className="font-comic text-[16px] font-bold text-black uppercase">
            Có thay đổi cấu hình chưa được ghi vào Database!
          </span>
          <span className="font-bubble font-bold text-[14px] text-gray-600">
            Các cổng thanh toán và phí vận chuyển mới sẽ kích hoạt tức thì sau
            khi bấm lưu.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-white hover:bg-gray-100 text-black border-[2px] border-black font-comic text-[16px] font-bold uppercase shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] transition-all"
        >
          Hủy Thay Đổi
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-comic-yellow text-black border-[3px] border-black font-comic text-[16px] font-bold uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <i className="fa-solid fa-spinner animate-spin text-[22px]"></i>
          ) : (
            <i className="fa-solid fa-floppy-disk text-[22px] text-red-600"></i>
          )}
          <span>{isSaving ? "ĐANG LƯU..." : "LƯU CẤU HÌNH HỆ THỐNG ⚡"}</span>
        </button>
      </div>
    </div>
  );
}
