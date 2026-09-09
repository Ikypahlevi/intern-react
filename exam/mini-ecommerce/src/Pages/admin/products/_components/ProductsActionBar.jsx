import React, { useRef } from "react";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";

export default function ProductsActionBar({ onOpenAdd, onResetFilters, onExport, onImport }) {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onImport) {
      onImport(file);
    }
    // Reset file input so the same file can be selected again
    e.target.value = null;
  };

  return (
    <div className="bg-white border-[3px] border-black p-3 shadow-[5px_5px_0px_#000] flex flex-wrap items-center justify-between gap-4">
      {/* Left Action Group */}
      <div className="flex flex-wrap items-center gap-3">
        <input 
          type="file" 
          accept=".xlsx, .xls, .csv" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <AdminPopButton 
          variant="info" 
          icon="fa-solid fa-upload" 
          onClick={handleImportClick}
        >
          IMPORT DANH SÁCH (EXCEL/CSV)
        </AdminPopButton>
        
        <AdminPopButton 
          variant="primary" 
          icon="fa-solid fa-circle-plus" 
          onClick={onOpenAdd}
        >
          THÊM SẢN PHẨM MỚI ⚡
        </AdminPopButton>
      </div>

      {/* Right Action Group */}
      <div className="flex flex-wrap items-center gap-3">
        <AdminPopButton 
          variant="secondary" 
          icon="fa-solid fa-download" 
          onClick={onExport}
        >
          XUẤT EXCEL
        </AdminPopButton>

        <div className="flex items-center bg-gray-100 border-[2px] border-black p-1 shadow-[2px_2px_0px_#000]">
          <button className="px-2 py-1 bg-comic-yellow text-black font-comic text-xs uppercase font-black border-[2px] border-black shadow-[1px_1px_0px_#000]">
            <i className="fa-solid fa-table-cells mr-1"></i> BẢNG
          </button>
          <button className="px-2 py-1 text-gray-500 font-comic text-xs uppercase font-bold hover:text-black transition-colors">
            <i className="fa-solid fa-grip mr-1"></i> LƯỚI
          </button>
        </div>

        <button 
          onClick={onResetFilters}
          className="flex items-center gap-1 text-gray-500 hover:text-red-600 font-bold text-sm transition-colors ml-2"
          title="Đặt lại bộ lọc"
        >
          <i className="fa-solid fa-filter-circle-xmark"></i>
          <span className="hidden xl:inline uppercase font-comic text-xs">Xóa lọc</span>
        </button>
      </div>
    </div>
  );
}
