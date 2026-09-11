import React from "react";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";

export default function SettingsActionBar({ isDirty, onSave, onCancel, isSaving }) {
  if (!isDirty) return null;

  return (
    <div className="sticky bottom-0 z-30 -mx-gutter-desktop px-gutter-desktop py-space-sm bg-surface-container-lowest border-t-[3px] border-on-background shadow-[0_-4px_0px_#1c1b1b] flex flex-wrap items-center justify-between gap-space-md font-bubble animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-space-sm">
        <div className="w-8 h-8 rounded-none border-[2px] border-on-background bg-secondary text-white flex items-center justify-center font-bold animate-bounce shadow-[2px_2px_0px_#1c1b1b]">
          !
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-[16px] font-bold text-on-background uppercase">
            Có thay đổi cấu hình chưa được ghi vào Database!
          </span>
          <span className="font-body-sm text-[14px] text-on-surface-variant">
            Các cổng thanh toán và phí vận chuyển mới sẽ kích hoạt tức thì sau
            khi bấm lưu.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-space-sm">
        <button
          onClick={onCancel}
          className="px-space-md py-space-xs bg-surface-container-lowest hover:bg-surface-container-high text-on-background border-[2px] border-on-background font-headline-sm text-[16px] font-bold uppercase shadow-[3px_3px_0px_#1c1b1b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1c1b1b] transition-all"
        >
          Hủy Thay Đổi
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-space-2xs px-space-lg py-space-xs bg-primary-container text-on-background border-[3px] border-on-background font-headline-sm text-[16px] font-bold uppercase tracking-wider shadow-[4px_4px_0px_#1c1b1b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1c1b1b] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <i className="fa-solid fa-spinner animate-spin text-[22px]"></i>
          ) : (
            <i className="fa-solid fa-floppy-disk text-[22px] text-secondary"></i>
          )}
          <span>{isSaving ? "ĐANG LƯU..." : "LƯU CẤU HÌNH HỆ THỐNG ⚡"}</span>
        </button>
      </div>
    </div>
  );
}
