import React from "react";

export default function AdminPagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 bg-white p-3 border-[2px] border-black shadow-[3px_3px_0px_#000] font-bubble">
      <div className="text-sm font-bold text-gray-700 text-center sm:text-left">
        Hiển thị <span className="text-black font-black">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="text-black font-black">{Math.min(currentPage * itemsPerPage, totalItems)}</span> trong <span className="text-black font-black">{totalItems}</span> bản ghi
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 border-[2px] border-black hover:bg-comic-yellow disabled:opacity-50 disabled:hover:bg-gray-200 transition-colors"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <span className="font-comic font-black px-3 py-1 border-[2px] border-black bg-white">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 border-[2px] border-black hover:bg-comic-yellow disabled:opacity-50 disabled:hover:bg-gray-200 transition-colors"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
