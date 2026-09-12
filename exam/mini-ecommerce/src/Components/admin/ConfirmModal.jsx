import React, { useEffect } from "react";
import AdminPopButton from "./AdminPopButton";

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "XÁC NHẬN", 
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "ĐỒNG Ý",
  cancelText = "HỦY BỎ",
  isDanger = true // If true, confirm button is red, else it might be blue/green
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md border-[3px] border-black shadow-[8px_8px_0px_#000] flex flex-col font-bubble animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        <div className={`p-4 border-b-[3px] border-black ${isDanger ? 'bg-comic-red text-white' : 'bg-comic-yellow text-black'} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <i className={`fa-solid ${isDanger ? 'fa-triangle-exclamation animate-pulse' : 'fa-circle-question'} text-xl`}></i>
            <h3 className="font-comic font-black text-xl tracking-wider uppercase mt-1">{title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#fffdf0]">
          <p className="text-base font-bold text-gray-800 leading-relaxed text-center">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t-[3px] border-black bg-gray-50 flex items-center justify-end gap-3">
          <AdminPopButton variant="secondary" onClick={onClose}>
            {cancelText}
          </AdminPopButton>
          <AdminPopButton 
            variant={isDanger ? "danger" : "primary"} 
            icon={isDanger ? "fa-solid fa-trash" : "fa-solid fa-check"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </AdminPopButton>
        </div>
      </div>
    </div>
  );
}
