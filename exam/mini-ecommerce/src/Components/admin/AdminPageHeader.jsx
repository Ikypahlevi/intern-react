import React from "react";

/**
 * Shared Admin Page Header Component
 * @param {string} title - The main title
 * @param {string} description - Description text under title
 * @param {string} iconClass - FontAwesome icon class (e.g., 'fa-users')
 * @param {string} versionTag - Top-left small tag (e.g., 'Otaku Core v2.4')
 * @param {Array} kpiBlocks - Array of objects for right KPI blocks: { label, value, trend, trendLabel, trendColor }
 * @param {React.ReactNode} children - Optional alert banners or anything else
 */
export default function AdminPageHeader({ 
  title, 
  description, 
  iconClass, 
  versionTag = "HQ Panel",
  kpiBlocks = [],
  children
}) {
  return (
    <>
      {children}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white border-[3px] border-black p-6 shadow-[5px_5px_0px_#000]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-comic-yellow text-black border-[2px] border-black font-comic text-[10px] font-bold uppercase shadow-[2px_2px_0px_#000]">
              QUẢN TRỊ VIÊN
            </span>
            <span className="px-2 py-0.5 bg-blue-300 text-black border-[2px] border-black font-comic text-[10px] font-bold uppercase shadow-[2px_2px_0px_#000]">
              {versionTag}
            </span>
          </div>
          <h1 className="font-comic text-3xl text-black uppercase tracking-tight flex items-center gap-2 font-black mt-2">
            <span>{title}</span>
            {iconClass && <i className={`fa-solid ${iconClass} text-blue-600`}></i>}
          </h1>
          <p className="font-bold text-gray-700">{description}</p>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto pb-2 lg:pb-0">
          {kpiBlocks.map((block, idx) => (
            <div key={idx} className={`${block.bgColor || 'bg-gray-100'} border-[2px] border-black p-3 flex flex-col items-start min-w-[140px] shadow-[3px_3px_0px_#000]`}>
              <span className={`font-comic text-[10px] ${block.labelColor || 'text-gray-600'} uppercase font-bold tracking-wider`}>
                {block.label}
              </span>
              <span className={`font-black text-3xl ${block.valueColor || 'text-black'}`}>
                {block.value}
              </span>
              {block.trend && (
                <span className={`font-bold text-xs ${block.trendColor || 'text-green-600'} flex items-center mt-1`}>
                  {block.trend === 'up' && <i className="fa-solid fa-arrow-trend-up mr-1"></i>}
                  {block.trend === 'down' && <i className="fa-solid fa-arrow-trend-down mr-1"></i>}
                  {block.trend === 'live' && <span className="w-2 h-2 rounded-full bg-red-600 mr-1.5 animate-ping border border-black"></span>}
                  {block.trendLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
