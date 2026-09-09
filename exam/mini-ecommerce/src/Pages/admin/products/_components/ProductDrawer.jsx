import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AdminDrawer from "../../../../Components/admin/AdminDrawer";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";
import { useCreateProduct, useUpdateProduct } from "../../../../Services/queries/useProducts";
import { toast } from "sonner";
import { STATUS } from "../../../../Constants";

const productSchema = z.object({
  sku: z.string().min(1, "Mã SKU không được bỏ trống"),
  name: z.string().min(2, "Tên truyện phải có ít nhất 2 ký tự"),
  author: z.string().optional(),
  publisher: z.string().min(1, "Vui lòng chọn nhà xuất bản"),
  category: z.string().min(1, "Vui lòng chọn thể loại"),
  format: z.string().min(1, "Vui lòng chọn định dạng"),
  price: z.coerce.number().positive("Giá bán phải lớn hơn 0"),
  originalPrice: z.coerce.number().min(0, "Giá bìa không hợp lệ"),
  stock: z.coerce.number().min(0, "Tồn kho không được âm"),
  status: z.enum([STATUS.ACTIVE, STATUS.NEW, STATUS.PREORDER, STATUS.PAUSED, STATUS.OUT_OF_STOCK]),
  image: z.string().optional(),
});

export default function ProductDrawer({ isOpen, onClose, product }) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isEdit = !!product;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: "",
      name: "",
      author: "",
      publisher: "NXB Kim Đồng",
      category: "Hành động",
      format: "Bản Tiêu Chuẩn",
      price: 0,
      originalPrice: 0,
      stock: 0,
      status: STATUS.ACTIVE,
      image: "",
    },
  });

  useEffect(() => {
    if (product && isOpen) {
      reset({
        sku: product.sku || "",
        name: product.name || "",
        author: product.author || "",
        publisher: product.publisher || "NXB Kim Đồng",
        category: product.category || "Hành động",
        format: product.format || "Bản Tiêu Chuẩn",
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        stock: product.stock || 0,
        status: product.status || STATUS.ACTIVE,
        image: product.image || "",
      });
    } else if (!product && isOpen) {
      reset({
        sku: `SKU-${Math.floor(Math.random() * 10000)}`,
        name: "",
        author: "",
        publisher: "NXB Kim Đồng",
        category: "Hành động",
        format: "Bản Tiêu Chuẩn",
        price: 0,
        originalPrice: 0,
        stock: 0,
        status: STATUS.ACTIVE,
        image: "",
      });
    }
  }, [product, isOpen, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      updateMutation.mutate(
        { id: product.id, data },
        {
          onSuccess: () => {
            toast.success("Cập nhật sản phẩm thành công!");
            onClose();
          },
        }
      );
    } else {
      createMutation.mutate(
        data,
        {
          onSuccess: () => {
            toast.success("Thêm sản phẩm mới thành công!");
            onClose();
          },
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
          <AdminPopButton type="submit" form="productForm" variant="success" icon="fa-solid fa-check">
            LƯU SẢN PHẨM
          </AdminPopButton>
        </>
      }
    >
      <form id="productForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        
        {/* Block 1: Thông Tin Cơ Bản */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-circle-info mr-2"></i>Thông Tin Cơ Bản
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Mã SKU *</label>
              <input
                {...register("sku")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.sku && <span className="text-red-500 text-xs font-bold">{errors.sku.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Định Dạng</label>
              <select
                {...register("format")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value="Bản Tiêu Chuẩn">Bản Tiêu Chuẩn</option>
                <option value="Bản Đặc Biệt">Bản Đặc Biệt</option>
                <option value="Boxset">Hộp Gỗ/Boxset</option>
                <option value="Bìa Cứng">Bìa Cứng (Sưu tầm)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-bold text-sm uppercase">Tên Truyện *</label>
              <input
                {...register("name")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.name && <span className="text-red-500 text-xs font-bold">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Tác Giả</label>
              <input
                {...register("author")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Thể Loại</label>
              <select
                {...register("category")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value="Hành động">Hành động (Shonen)</option>
                <option value="Hài hước">Hài hước</option>
                <option value="Tình cảm">Tình cảm (Shojo)</option>
                <option value="Light Novel">Light Novel</option>
                <option value="Boxset">Boxset</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-bold text-sm uppercase">Nhà Xuất Bản</label>
              <select
                {...register("publisher")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value="NXB Kim Đồng">NXB Kim Đồng</option>
                <option value="NXB Trẻ">NXB Trẻ</option>
                <option value="IPM">IPM Manga</option>
                <option value="Amak">Amak Books</option>
                <option value="Shueisha">Shueisha JP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Block 2: Giá & Tồn Kho */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-coins mr-2"></i>Giá & Tồn Kho
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-red-600">Giá Bán *</label>
              <input
                type="number"
                {...register("price")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.price && <span className="text-red-500 text-xs font-bold">{errors.price.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-gray-500">Giá Bìa (Gốc)</label>
              <input
                type="number"
                {...register("originalPrice")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.originalPrice && <span className="text-red-500 text-xs font-bold">{errors.originalPrice.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-blue-600">Số Lượng Tồn</label>
              <input
                type="number"
                {...register("stock")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.stock && <span className="text-red-500 text-xs font-bold">{errors.stock.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Trạng Thái</label>
              <select
                {...register("status")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value={STATUS.ACTIVE}>Đang bán</option>
                <option value={STATUS.PREORDER}>Cho phép Pre-order</option>
                <option value={STATUS.NEW}>Hàng mới về</option>
                <option value={STATUS.PAUSED}>Tạm dừng bán</option>
                <option value={STATUS.OUT_OF_STOCK}>Báo hết hàng</option>
              </select>
            </div>
          </div>
        </div>

      </form>
    </AdminDrawer>
  );
}
