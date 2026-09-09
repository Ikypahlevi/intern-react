import React, { useState, useEffect } from "react";
import AdminDrawer from "../../../../Components/admin/AdminDrawer";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";
import { useCreateProduct, useUpdateProduct } from "../../../../Services/queries/useProducts";
import { toast } from "sonner";

export default function ProductDrawer({ isOpen, onClose, product }) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isEdit = !!product;

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    author: "",
    publisher: "",
    category: "",
    format: "Bản Tiêu Chuẩn",
    price: 0,
    originalPrice: 0,
    stock: 0,
    status: "active",
    image: "",
  });

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        sku: product.sku || "",
        name: product.name || "",
        author: product.author || "",
        publisher: product.publisher || "",
        category: product.category || "",
        format: product.format || "Bản Tiêu Chuẩn",
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        stock: product.stock || 0,
        status: product.status || "active",
        image: product.image || "",
      });
    } else if (!product && isOpen) {
      setFormData({
        sku: `SKU-${Math.floor(Math.random() * 10000)}`,
        name: "",
        author: "",
        publisher: "NXB Kim Đồng",
        category: "Hành động",
        format: "Bản Tiêu Chuẩn",
        price: 0,
        originalPrice: 0,
        stock: 0,
        status: "active",
        image: "",
      });
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? Number(value) : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateMutation.mutate(
        { id: product.id, data: formData },
        {
          onSuccess: () => {
            toast.success("Cập nhật sản phẩm thành công!");
            onClose();
          }
        }
      );
    } else {
      createMutation.mutate(
        formData,
        {
          onSuccess: () => {
            toast.success("Thêm sản phẩm mới thành công!");
            onClose();
          }
        }
      );
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "CẬP NHẬT TRUYỆN ✏️" : "THÊM TRUYỆN MỚI ⚡"}
      subtitle="Cấu hình thông tin, kho hàng và hiển thị"
      icon="fa-book"
      footerActions={
        <>
          <AdminPopButton variant="secondary" onClick={onClose}>HỦY BỎ</AdminPopButton>
          <AdminPopButton variant="success" icon="fa-solid fa-check" onClick={handleSubmit}>
            LƯU SẢN PHẨM
          </AdminPopButton>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Block 1 */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-circle-info mr-2"></i>Thông Tin Cơ Bản
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Mã SKU</label>
              <input name="sku" value={formData.sku} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Định Dạng</label>
              <select name="format" value={formData.format} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer">
                <option value="Bản Tiêu Chuẩn">Bản Tiêu Chuẩn</option>
                <option value="Bản Đặc Biệt">Bản Đặc Biệt</option>
                <option value="Boxset">Hộp Gỗ/Boxset</option>
                <option value="Bìa Cứng">Bìa Cứng (Sưu tầm)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-bold text-sm uppercase">Tên Truyện *</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Tác Giả</label>
              <input name="author" value={formData.author} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Thể Loại</label>
              <select name="category" value={formData.category} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer">
                <option value="Hành động">Hành động (Shonen)</option>
                <option value="Hài hước">Hài hước</option>
                <option value="Tình cảm">Tình cảm (Shojo)</option>
                <option value="Light Novel">Light Novel</option>
                <option value="Boxset">Boxset</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-bold text-sm uppercase">Nhà Xuất Bản</label>
              <select name="publisher" value={formData.publisher} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer">
                <option value="NXB Kim Đồng">NXB Kim Đồng</option>
                <option value="NXB Trẻ">NXB Trẻ</option>
                <option value="IPM">IPM Manga</option>
                <option value="Amak">Amak Books</option>
                <option value="Shueisha">Shueisha JP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-coins mr-2"></i>Giá & Tồn Kho
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-red-600">Giá Bán *</label>
              <input type="number" required name="price" value={formData.price} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-gray-500">Giá Bìa (Gốc)</label>
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-blue-600">Số Lượng Tồn</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Trạng Thái</label>
              <select name="status" value={formData.status} onChange={handleChange} className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer">
                <option value="active">Đang bán</option>
                <option value="preorder">Cho phép Pre-order</option>
                <option value="new">Hàng mới về</option>
                <option value="paused">Tạm dừng bán</option>
                <option value="out_of_stock">Báo hết hàng</option>
              </select>
            </div>
          </div>
        </div>

      </form>
    </AdminDrawer>
  );
}
