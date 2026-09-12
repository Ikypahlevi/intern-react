import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      {/* Nền tối */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Nội dung Modal (Comic Style) */}
      <div className="relative w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 lg:p-8 transform transition-all z-10">
        <div className="flex items-center justify-between mb-5 border-b-2 border-black pb-3">
          <h3 className="font-comic text-2xl text-black tracking-wide uppercase">{title}</h3>
        </div>
        <div className="font-bubble">
          {children}
        </div>
      </div>
    </div>
  );
}
