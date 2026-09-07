import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Tính toán hiển thị các nút trang kề trước và kề sau
  const renderPageNumbers = () => {
    const pages = [];
    
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(3, totalPages);
    }
    if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    }

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)} className="comic-border px-3.5 py-1 bg-white hover:bg-comic-yellow shadow-comic-sm transition-all font-comic text-lg">
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="px-1 font-black font-bubble">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button 
          key={i} 
          onClick={() => onPageChange(i)} 
          className={`comic-border px-3.5 py-1 shadow-comic-sm transition-all font-comic text-lg ${
            currentPage === i 
              ? 'bg-comic-yellow font-black' 
              : 'bg-white hover:bg-comic-yellow'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="px-1 font-black font-bubble">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className="comic-border px-3.5 py-1 bg-white hover:bg-comic-yellow shadow-comic-sm transition-all font-comic text-lg">
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pt-6 mt-6 flex flex-wrap items-center justify-between gap-4 border-t-4 border-stone-900">
      <div className="font-bubble font-bold text-xs text-stone-700">
        Đang xem <span className="bg-comic-yellow px-1.5 py-0.5 comic-border-sm">{startItem} - {endItem}</span> trên tổng số <span className="font-black">{totalItems} sản phẩm</span>
      </div>
      
      <div className="flex items-center gap-1.5">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="comic-border px-3 py-1 bg-white hover:bg-stone-900 hover:text-white shadow-comic-sm transition-all font-comic text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-stone-900"
        >
          « TRƯỚC
        </button>
        
        {renderPageNumbers()}
        
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="comic-border px-3 py-1 bg-white hover:bg-stone-900 hover:text-white shadow-comic-sm transition-all font-comic text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-stone-900"
        >
          TIẾP »
        </button>
      </div>
    </div>
  );
}
