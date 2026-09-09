import React, { useEffect, useState, useRef } from "react";
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
  const fileInputRef = useRef(null);

  const isEdit = !!product;

  // Trạng thái riêng cho ảnh (không đưa vào react-hook-form vì là base64/url)
  const [imagePreview, setImagePreview] = useState("");
  const [imageMode, setImageMode] = useState("url"); // "url" | "upload"
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
      setImagePreview(product.image || "");
      setImageUrl(product.image || "");
      setImageMode("url");
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
      setImagePreview("");
      setImageUrl("");
      setImageMode("url");
    }
  }, [product, isOpen, reset]);

  // Khi user nhập URL ảnh
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
    setValue("image", url);
  };

  // Khi user upload file từ máy
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Chỉ chấp nhận file ảnh
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh (JPG, PNG, WEBP...)");
      return;
    }

    // Giới hạn 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      setValue("image", base64);
    };
    reader.readAsDataURL(file);
  };

  // Xóa ảnh
  const handleClearImage = () => {
    setImagePreview("");
    setImageUrl("");
    setValue("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Kéo thả ảnh vào vùng upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Vui lòng kéo thả file ảnh!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImagePreview(base64);
        setValue("image", base64);
      };
      reader.readAsDataURL(file);
    }
  };

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

        {/* ===== BLOCK 0: Hình Ảnh Sản Phẩm ===== */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-image mr-2"></i>Hình Ảnh Bìa Truyện
          </span>

          {/* Tab chọn chế độ */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setImageMode("url")}
              className={`px-3 py-1 text-xs font-comic font-black uppercase border-[2px] border-black transition-colors ${
                imageMode === "url"
                  ? "bg-black text-white shadow-none"
                  : "bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-gray-100"
              }`}
            >
              <i className="fa-solid fa-link mr-1"></i> Nhập URL
            </button>
            <button
              type="button"
              onClick={() => setImageMode("upload")}
              className={`px-3 py-1 text-xs font-comic font-black uppercase border-[2px] border-black transition-colors ${
                imageMode === "upload"
                  ? "bg-black text-white shadow-none"
                  : "bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-gray-100"
              }`}
            >
              <i className="fa-solid fa-upload mr-1"></i> Tải Lên
            </button>
          </div>

          {/* Chế độ nhập URL */}
          {imageMode === "url" && (
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs uppercase text-gray-500">Đường Dẫn URL Ảnh</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold text-sm"
                />
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="px-3 bg-red-500 text-white border-[2px] border-black font-comic text-xs uppercase hover:bg-red-600 transition-colors"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Chế độ upload file */}
          {imageMode === "upload" && (
            <div className="flex flex-col gap-2">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-[3px] border-dashed border-black p-6 text-center cursor-pointer hover:bg-yellow-50 transition-colors"
              >
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2 block"></i>
                <p className="font-comic text-sm font-black uppercase">Kéo & thả ảnh vào đây</p>
                <p className="font-bubble text-xs font-bold text-gray-500 mt-1">hoặc click để chọn từ máy tính</p>
                <p className="font-bubble text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP — Tối đa 2MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="self-start px-3 py-1 bg-red-100 text-red-600 border-[2px] border-red-400 font-comic text-xs uppercase hover:bg-red-200 transition-colors"
                >
                  <i className="fa-solid fa-trash mr-1"></i> Xóa ảnh
                </button>
              )}
            </div>
          )}

          {/* Khung Preview ảnh */}
          <div className="mt-1">
            <label className="font-bold text-xs uppercase text-gray-500 mb-1 block">Xem Trước</label>
            {imagePreview ? (
              <div className="relative w-full aspect-[3/4] max-w-[140px] border-[3px] border-black shadow-[4px_4px_0px_#000] overflow-hidden bg-gray-100">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => {
                    setImagePreview("");
                    toast.error("Không thể tải ảnh từ URL này!");
                  }}
                />
                {/* Badge góc */}
                <span className="absolute top-1 left-1 bg-green-500 text-white text-[9px] font-comic font-black px-1.5 py-0.5 border border-black">
                  ✓ OK
                </span>
              </div>
            ) : (
              <div className="w-full aspect-[3/4] max-w-[140px] border-[3px] border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-300">
                <i className="fa-solid fa-image text-3xl mb-1"></i>
                <span className="text-[10px] font-bold uppercase">Chưa có ảnh</span>
              </div>
            )}
          </div>
        </div>

        {/* ===== BLOCK 1: Thông Tin Cơ Bản ===== */}
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

        {/* ===== BLOCK 2: Giá & Tồn Kho ===== */}
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
