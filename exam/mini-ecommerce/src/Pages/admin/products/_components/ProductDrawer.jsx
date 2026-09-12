import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AdminDrawer from "../../../../Components/admin/AdminDrawer";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";
import { useCreateProduct, useUpdateProduct } from "../../../../Services/queries/useProducts";
import { useCreateNotification } from "../../../../Services/queries/useNotifications";
import { toast } from "sonner";
import { STATUS } from "../../../../Constants";

const productSchema = z.object({
  sku: z.string().min(1, "MÃ£ SKU khÃ´ng Ä‘Æ°á»£c bá»  trá»‘ng"),
  name: z.string().min(2, "TÃªn truyá»‡n pháº£i cÃ³ Ã­t nháº¥t 2 kÃ½ tá»±"),
  author: z.string().optional(),
  publisher: z.string().min(1, "Vui lÃ²ng chá» n nhÃ  xuáº¥t báº£n"),
  category: z.string().min(1, "Vui lÃ²ng chá» n thá»ƒ loáº¡i"),
  format: z.string().min(1, "Vui lÃ²ng chá» n Ä‘á»‹nh dáº¡ng"),
  price: z.coerce.number().positive("GiÃ¡ bÃ¡n pháº£i lá»›n hÆ¡n 0"),
  originalPrice: z.coerce.number().min(0, "GiÃ¡ bÃ¬a khÃ´ng há»£p lá»‡"),
  stock: z.coerce.number().min(0, "Tá»“n kho khÃ´ng Ä‘Æ°á»£c Ã¢m"),
  status: z.enum([STATUS.ACTIVE, STATUS.NEW, STATUS.PREORDER, STATUS.PAUSED, STATUS.OUT_OF_STOCK]),
  image: z.string().optional(),
});

export default function ProductDrawer({ isOpen, onClose, product }) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const createNotificationMutation = useCreateNotification();
  const fileInputRef = useRef(null);

  const isEdit = !!product;

  // Tráº¡ng thÃ¡i riÃªng cho áº£nh (khÃ´ng Ä‘Æ°a vÃ o react-hook-form vÃ¬ lÃ  base64/url)
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
      publisher: "NXB Kim Ä á»“ng",
      category: "HÃ nh Ä‘á»™ng",
      format: "Báº£n TiÃªu Chuáº©n",
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
        publisher: product.publisher || "NXB Kim Äá»“ng",
        category: product.category || "HÃ nh Ä‘á»™ng",
        format: product.format || "Báº£n TiÃªu Chuáº©n",
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
        publisher: "NXB Kim Äá»“ng",
        category: "HÃ nh Ä‘á»™ng",
        format: "Báº£n TiÃªu Chuáº©n",
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

  // Khi user nháº­p URL áº£nh
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
    setValue("image", url);
  };

  // Khi user upload file tá»« mÃ¡y
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Chá»‰ cháº¥p nháº­n file áº£nh
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lÃ²ng chá»n file áº£nh (JPG, PNG, WEBP...)");
      return;
    }

    // Giá»›i háº¡n 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error("áº¢nh quÃ¡ lá»›n! Vui lÃ²ng chá»n áº£nh nhá» hÆ¡n 2MB.");
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

  // XÃ³a áº£nh
  const handleClearImage = () => {
    setImagePreview("");
    setImageUrl("");
    setValue("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // KÃ©o tháº£ áº£nh vÃ o vÃ¹ng upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Vui lÃ²ng kÃ©o tháº£ file áº£nh!");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("áº¢nh quÃ¡ lá»›n! Vui lÃ²ng chá»n áº£nh nhá» hÆ¡n 2MB.");
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
            toast.success("Cáº­p nháº­t sáº£n pháº©m thÃ nh cÃ´ng!");
            onClose();
          },
        }
      );
    } else {
      createMutation.mutate(
        data,
        {
          onSuccess: (newProduct) => {
            toast.success("Thêm sản phẩm mới thành công!");
            createNotificationMutation.mutateAsync({
              id: "NOTIF-" + Math.floor(Math.random() * 100000),
              role: "all",
              title: "📚 Truyện Mới Về Kho",
              message: "Truyện vừa lên kệ. Mua ngay kẻo lỡ!",
              link: "/products"
            });
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
      title={isEdit ? "Cáº¬P NHáº¬T TRUYá»†N âœï¸" : "THÃŠM TRUYá»†N Má»šI âš¡"}
      subtitle="Cáº¥u hÃ¬nh thÃ´ng tin, kho hÃ ng vÃ  hiá»ƒn thá»‹"
      icon="fa-book"
      footerActions={
        <>
          <AdminPopButton variant="secondary" onClick={onClose}>Há»¦Y Bá»Ž</AdminPopButton>
          <AdminPopButton type="submit" form="productForm" variant="success" icon="fa-solid fa-check">
            LÆ¯U Sáº¢N PHáº¨M
          </AdminPopButton>
        </>
      }
    >
      <form id="productForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        {/* ===== BLOCK 0: HÃ¬nh áº¢nh Sáº£n Pháº©m ===== */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-image mr-2"></i>HÃ¬nh áº¢nh BÃ¬a Truyá»‡n
          </span>

          {/* Tab chá»n cháº¿ Ä‘á»™ */}
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
              <i className="fa-solid fa-link mr-1"></i> Nháº­p URL
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
              <i className="fa-solid fa-upload mr-1"></i> Táº£i LÃªn
            </button>
          </div>

          {/* Cháº¿ Ä‘á»™ nháº­p URL */}
          {imageMode === "url" && (
            <div className="flex flex-col gap-1">
              <label className="font-bold text-xs uppercase text-gray-500">ÄÆ°á»ng Dáº«n URL áº¢nh</label>
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

          {/* Cháº¿ Ä‘á»™ upload file */}
          {imageMode === "upload" && (
            <div className="flex flex-col gap-2">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-[3px] border-dashed border-black p-6 text-center cursor-pointer hover:bg-yellow-50 transition-colors"
              >
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2 block"></i>
                <p className="font-comic text-sm font-black uppercase">KÃ©o & tháº£ áº£nh vÃ o Ä‘Ã¢y</p>
                <p className="font-bubble text-xs font-bold text-gray-500 mt-1">hoáº·c click Ä‘á»ƒ chá»n tá»« mÃ¡y tÃ­nh</p>
                <p className="font-bubble text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP â€” Tá»‘i Ä‘a 2MB</p>
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
                  <i className="fa-solid fa-trash mr-1"></i> XÃ³a áº£nh
                </button>
              )}
            </div>
          )}

          {/* Khung Preview áº£nh */}
          <div className="mt-1">
            <label className="font-bold text-xs uppercase text-gray-500 mb-1 block">Xem TrÆ°á»›c</label>
            {imagePreview ? (
              <div className="relative w-full aspect-[3/4] max-w-[140px] border-[3px] border-black shadow-[4px_4px_0px_#000] overflow-hidden bg-gray-100">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => {
                    setImagePreview("");
                    toast.error("KhÃ´ng thá»ƒ táº£i áº£nh tá»« URL nÃ y!");
                  }}
                />
                {/* Badge gÃ³c */}
                <span className="absolute top-1 left-1 bg-green-500 text-white text-[9px] font-comic font-black px-1.5 py-0.5 border border-black">
                  âœ“ OK
                </span>
              </div>
            ) : (
              <div className="w-full aspect-[3/4] max-w-[140px] border-[3px] border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-300">
                <i className="fa-solid fa-image text-3xl mb-1"></i>
                <span className="text-[10px] font-bold uppercase">ChÆ°a cÃ³ áº£nh</span>
              </div>
            )}
          </div>
        </div>

        {/* ===== BLOCK 1: ThÃ´ng Tin CÆ¡ Báº£n ===== */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-circle-info mr-2"></i>ThÃ´ng Tin CÆ¡ Báº£n
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">MÃ£ SKU *</label>
              <input
                {...register("sku")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.sku && <span className="text-red-500 text-xs font-bold">{errors.sku.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Äá»‹nh Dáº¡ng</label>
              <select
                {...register("format")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value="Báº£n TiÃªu Chuáº©n">Báº£n TiÃªu Chuáº©n</option>
                <option value="Báº£n Äáº·c Biá»‡t">Báº£n Äáº·c Biá»‡t</option>
                <option value="Boxset">Há»™p Gá»—/Boxset</option>
                <option value="BÃ¬a Cá»©ng">BÃ¬a Cá»©ng (SÆ°u táº§m)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-bold text-sm uppercase">TÃªn Truyá»‡n *</label>
              <input
                {...register("name")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.name && <span className="text-red-500 text-xs font-bold">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">TÃ¡c Giáº£</label>
              <input
                {...register("author")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Thá»ƒ Loáº¡i</label>
              <select
                {...register("category")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value="HÃ nh Ä‘á»™ng">HÃ nh Ä‘á»™ng (Shonen)</option>
                <option value="HÃ i hÆ°á»›c">HÃ i hÆ°á»›c</option>
                <option value="TÃ¬nh cáº£m">TÃ¬nh cáº£m (Shojo)</option>
                <option value="Light Novel">Light Novel</option>
                <option value="Boxset">Boxset</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="font-bold text-sm uppercase">NhÃ  Xuáº¥t Báº£n</label>
              <select
                {...register("publisher")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value="NXB Kim Äá»“ng">NXB Kim Äá»“ng</option>
                <option value="NXB Tráº»">NXB Tráº»</option>
                <option value="IPM">IPM Manga</option>
                <option value="Amak">Amak Books</option>
                <option value="Shueisha">Shueisha JP</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== BLOCK 2: GiÃ¡ & Tá»“n Kho ===== */}
        <div className="bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
          <span className="font-comic text-sm uppercase font-black border-b-2 border-black pb-2">
            <i className="fa-solid fa-coins mr-2"></i>GiÃ¡ & Tá»“n Kho
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-red-600">GiÃ¡ BÃ¡n *</label>
              <input
                type="number" min="0"
                {...register("price")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.price && <span className="text-red-500 text-xs font-bold">{errors.price.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-gray-500">GiÃ¡ BÃ¬a (Gá»‘c)</label>
              <input
                type="number" min="0"
                {...register("originalPrice")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.originalPrice && <span className="text-red-500 text-xs font-bold">{errors.originalPrice.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase text-blue-600">Sá»‘ LÆ°á»£ng Tá»“n</label>
              <input
                type="number" min="0"
                {...register("stock")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              />
              {errors.stock && <span className="text-red-500 text-xs font-bold">{errors.stock.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm uppercase">Tráº¡ng ThÃ¡i</label>
              <select
                {...register("status")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold cursor-pointer"
              >
                <option value={STATUS.ACTIVE}>Äang bÃ¡n</option>
                <option value={STATUS.PREORDER}>Cho phÃ©p Pre-order</option>
                <option value={STATUS.NEW}>HÃ ng má»›i vá»</option>
                <option value={STATUS.PAUSED}>Táº¡m dá»«ng bÃ¡n</option>
                <option value={STATUS.OUT_OF_STOCK}>BÃ¡o háº¿t hÃ ng</option>
              </select>
            </div>
          </div>
        </div>

      </form>
    </AdminDrawer>
  );
}

