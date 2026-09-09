import React from "react";

export default function AdminDrawer({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  icon = "fa-layer-group",
  children,
  footerActions
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-white border-l-[3px] border-black shadow-[-10px_0_0_#000] z-50 flex flex-col transform transition-transform duration-300">
        
        {/* Drawer Header */}
        <div className="bg-comic-yellow border-b-[3px] border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <i className={`fa-solid ${icon} text-xl`}></i>
            </div>
            <div>
              <h2 className="font-comic text-xl text-black uppercase font-black">
                {title}
              </h2>
              {subtitle && <p className="font-bubble text-sm font-bold text-gray-800">{subtitle}</p>}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white text-black border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] hover:bg-red-500 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-gray-50">
          {children}
        </div>

        {/* Drawer Footer Actions */}
        {footerActions && (
          <div className="bg-white border-t-[3px] border-black p-4 flex items-center justify-end gap-4">
            {footerActions}
          </div>
        )}

      </div>
    </>
  );
}
