import React from "react";

export default function UsersHeader({ totalUsers }) {
  return (
    <>
      <div className="relative bg-red-600 text-white px-6 py-2 border-[3px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-bullhorn text-comic-yellow text-xl"></i>
          <span className="font-comic text-sm uppercase tracking-wider font-bold">Lưu ý quản trị:</span>
          <span className="font-bold text-sm">Chỉ Admin mới có quyền truy cập và thay đổi cấu hình tài khoản.</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white border-[3px] border-black p-6 shadow-[5px_5px_0px_#000]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-comic-yellow text-black border-[2px] border-black font-comic text-[10px] font-bold uppercase shadow-[2px_2px_0px_#000]">
              Quyền lực tối cao
            </span>
            <span className="px-2 py-0.5 bg-blue-300 text-black border-[2px] border-black font-comic text-[10px] font-bold uppercase shadow-[2px_2px_0px_#000]">
              Otaku Core v2.4
            </span>
          </div>
          <h1 className="font-comic text-3xl text-black uppercase tracking-tight flex items-center gap-2 font-black mt-2">
            <span>QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN</span>
            <i className="fa-solid fa-users text-blue-600"></i>
          </h1>
          <p className="font-bold text-gray-700">
            Quản lý tổng quan dữ liệu thành viên, cấp phép vai trò và khóa tài khoản vi phạm.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="bg-gray-100 border-[2px] border-black p-3 flex flex-col items-start min-w-[140px] shadow-[3px_3px_0px_#000]">
            <span className="font-comic text-[10px] text-gray-600 uppercase font-bold tracking-wider">Tổng thành viên</span>
            <span className="font-black text-3xl text-black">{totalUsers}</span>
            <span className="font-bold text-xs text-green-600 flex items-center mt-1">
              <i className="fa-solid fa-arrow-trend-up mr-1"></i> +12 tuần này
            </span>
          </div>
          <div className="bg-comic-yellow border-[2px] border-black p-3 flex flex-col items-start min-w-[140px] shadow-[3px_3px_0px_#000]">
            <span className="font-comic text-[10px] text-black uppercase font-bold tracking-wider">Đang Online</span>
            <span className="font-black text-3xl text-black">142</span>
            <span className="font-bold text-xs text-black flex items-center mt-1">
              <span className="w-2 h-2 rounded-full bg-red-600 mr-1.5 animate-ping border border-black"></span> Trực tiếp
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
