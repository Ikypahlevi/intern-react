import React, { useState } from "react";
import { formatCurrency } from "../../../../Utils/format";
import AdminBadge from "../../../../Components/admin/AdminBadge";
import { useDeleteProduct } from "../../../../Services/queries/useProducts";
import { toast } from "sonner";
import ConfirmModal from "../../../../Components/admin/ConfirmModal";

export default function ProductsTable({ products, columnFilters, setColumnFilters, onEditProduct }) {
  const deleteMutation = useDeleteProduct();
  const [productToDelete, setProductToDelete] = useState(null);

  const handleFilterChange = (col, value) => {
    setColumnFilters(prev => ({ ...prev, [col]: value }));
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    deleteMutation.mutate(productToDelete.id, {
      onSuccess: () => {
        toast.success(`Đã xóa SKU ${productToDelete.sku || productToDelete.id} thành công!`);
        setProductToDelete(null);
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <AdminBadge variant="success" text="Đang bán" />;
      case 'new': return <AdminBadge variant="info" text="Hàng mới" icon="fa-solid fa-bolt" />;
      case 'preorder': return <AdminBadge variant="primary" text="Pre-order" icon="fa-regular fa-clock" />;
      case 'paused': return <AdminBadge variant="secondary" text="Tạm dừng" icon="fa-solid fa-pause" />;
      case 'out_of_stock': return <AdminBadge variant="danger" text="Hết hàng" />;
      default: return <AdminBadge variant="success" text="Đang bán" />;
    }
  };

  return (
    <>
      <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            {/* THEAD */}
            <thead className="bg-blue-200 border-b-[3px] border-black font-comic text-sm uppercase select-none">
              {/* Header Titles */}
              <tr>
                <th className="p-3 align-top border-r-[2px] border-black w-24">
                  <div className="mb-1 font-black">MÃ SKU</div>
                  <input 
                    value={columnFilters.sku}
                    onChange={(e) => handleFilterChange('sku', e.target.value)}
                    className="w-full bg-white border-[2px] border-black px-2 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000]"
                    placeholder="VD: OP-108"
                  />
                </th>
                
                <th className="p-3 align-top border-r-[2px] border-black min-w-64">
                  <div className="mb-1 font-black">HÌNH ẢNH & TÊN MANGA</div>
                  <input 
                    value={columnFilters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    className="w-full bg-white border-[2px] border-black px-2 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000]"
                    placeholder="Gõ tên manga..."
                  />
                </th>

                <th className="p-3 align-top border-r-[2px] border-black min-w-36">
                  <div className="mb-1 font-black">THỂ LOẠI</div>
                  <select 
                    value={columnFilters.genre}
                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                    className="w-full bg-white border-[2px] border-black px-2 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000] cursor-pointer"
                  >
                    <option value="">Tất cả</option>
                    <option value="Hành động">Hành động</option>
                    <option value="Hài hước">Hài hước</option>
                    <option value="Boxset">Boxset</option>
                  </select>
                </th>

                <th className="p-3 align-top border-r-[2px] border-black min-w-36">
                  <div className="mb-1 font-black">NXB / ĐỐI TÁC</div>
                  <select 
                    value={columnFilters.publisher}
                    onChange={(e) => handleFilterChange('publisher', e.target.value)}
                    className="w-full bg-white border-[2px] border-black px-2 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000] cursor-pointer"
                  >
                    <option value="">Tất cả NXB</option>
                    <option value="NXB Kim Đồng">NXB Kim Đồng</option>
                    <option value="NXB Trẻ">NXB Trẻ</option>
                    <option value="IPM">IPM Manga</option>
                  </select>
                </th>

                <th className="p-3 align-top border-r-[2px] border-black min-w-32">
                  <div className="mb-1 font-black text-right">GIÁ BÁN (VND)</div>
                  <div className="flex gap-1">
                    <input 
                      type="number"
                      value={columnFilters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                      className="w-1/2 bg-white border-[2px] border-black px-1 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000]"
                      placeholder="Min"
                    />
                    <input 
                      type="number"
                      value={columnFilters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                      className="w-1/2 bg-white border-[2px] border-black px-1 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000]"
                      placeholder="Max"
                    />
                  </div>
                </th>

                <th className="p-3 align-top border-r-[2px] border-black min-w-32 text-center">
                  <div className="mb-1 font-black">TỒN KHO</div>
                  <select 
                    value={columnFilters.stock}
                    onChange={(e) => handleFilterChange('stock', e.target.value)}
                    className="w-full bg-white border-[2px] border-black px-2 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000] cursor-pointer"
                  >
                    <option value="">Tất cả tồn</option>
                    <option value="instock">Còn hàng (&gt;50)</option>
                    <option value="lowstock">Sắp hết (&lt;50)</option>
                    <option value="outstock">Hết hàng (0)</option>
                  </select>
                </th>

                <th className="p-3 align-top border-r-[2px] border-black min-w-32 text-center">
                  <div className="mb-1 font-black">TRẠNG THÁI</div>
                  <select 
                    value={columnFilters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full bg-white border-[2px] border-black px-2 py-0.5 text-black font-bubble text-xs font-bold outline-none shadow-[1px_1px_0px_#000] cursor-pointer"
                  >
                    <option value="">Tất cả</option>
                    <option value="active">Đang bán</option>
                    <option value="preorder">Pre-order</option>
                    <option value="new">Hàng mới</option>
                    <option value="paused">Tạm dừng</option>
                    <option value="out_of_stock">Hết hàng</option>
                  </select>
                </th>

                <th className="p-3 align-top text-center w-36">
                  <div className="mb-1 font-black">THAO TÁC</div>
                </th>
              </tr>
            </thead>

            {/* TBODY */}
            <tbody className="divide-y-[2px] divide-black font-bubble text-sm">
              {products.length > 0 ? products.map((product) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-yellow-50 transition-colors bg-white group"
                >
                  <td className="p-3 border-r-[2px] border-black">
                    <span className="font-comic font-black bg-gray-200 px-2 py-1 shadow-[1px_1px_0px_#000] border-[2px] border-black">
                      {product.sku || product.id}
                    </span>
                  </td>
                  
                  <td className="p-3 border-r-[2px] border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 border-[2px] border-black bg-white shadow-[2px_2px_0px_#000] overflow-hidden shrink-0 group-hover:rotate-2 transition-transform">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-black text-sm truncate max-w-[250px] group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </span>
                        <span className="font-bold text-gray-500 text-xs">
                          Tác giả: {product.author || 'Đang cập nhật'} • {product.format || 'Bản Tiêu Chuẩn'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 border-r-[2px] border-black">
                    <span className="inline-block bg-gray-100 text-black px-2 py-1 font-comic text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] border-[2px] border-black">
                      {product.category}
                    </span>
                  </td>

                  <td className="p-3 border-r-[2px] border-black">
                    <span className="font-bold text-gray-700 flex items-center gap-1">
                      <i className="fa-solid fa-bookmark text-blue-600"></i>
                      {product.publisher}
                    </span>
                  </td>

                  <td className="p-3 border-r-[2px] border-black text-right">
                    <span className="font-black text-black block">{formatCurrency(product.price || 0)}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="font-bold text-gray-400 text-xs line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </td>

                  <td className="p-3 border-r-[2px] border-black text-center">
                    <span className={`inline-block px-2 py-1 font-comic text-[11px] font-black shadow-[1px_1px_0px_#000] border-[2px] border-black ${
                      product.stock === 0 ? 'bg-red-200 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock} cuốn
                    </span>
                  </td>

                  <td className="p-3 border-r-[2px] border-black text-center">
                    {getStatusBadge(product.status)}
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-100 lg:opacity-50 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEditProduct(product)}
                        className="w-8 h-8 bg-blue-400 text-black border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] hover:bg-blue-500 transition-colors"
                        title="Sửa"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(product)}
                        className="w-8 h-8 bg-black text-white border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] hover:bg-gray-800 transition-colors"
                        title="Xóa"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="p-10 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <i className="fa-solid fa-box-open text-4xl text-gray-400"></i>
                      <span className="font-comic text-xl uppercase font-black text-gray-500">Không tìm thấy sản phẩm nào!</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal 
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="XÓA SẢN PHẨM"
        message={`Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm có mã [${productToDelete?.sku || productToDelete?.id}]? Hành động này không thể hoàn tác!`}
        confirmText="XÓA VĨNH VIỄN"
        cancelText="HỦY BỎ"
        isDanger={true}
      />
    </>
  );
}
