import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateUser, useUpdateUser } from "../../../../Services/queries/useUsers";
import { toast } from "sonner";
import AdminDrawer from "../../../../Components/admin/AdminDrawer";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";
import { ROLES, STATUS } from "../../../../Constants";

const userSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  nickname: z.string().optional(),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
  role: z.enum([ROLES.ADMIN, ROLES.CUSTOMER]),
  status: z.enum([STATUS.ACTIVE, STATUS.LOCKED]),
});

export default function UserDrawer({ user, onClose }) {
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const fileInputRef = useRef(null);

  const isEdit = !!user;

  // State riêng cho avatar
  const [avatarPreview, setAvatarPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phone: "",
      password: "",
      role: ROLES.CUSTOMER,
      status: STATUS.ACTIVE,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        nickname: user.nickname || "",
        email: user.email || "",
        phone: user.phone || "",
        password: user.password || "",
        role: user.role || ROLES.CUSTOMER,
        status: user.status || STATUS.ACTIVE,
      });
      setAvatarPreview(user.avatar || "");
    } else {
      reset({
        name: "",
        nickname: "",
        email: "",
        phone: "",
        password: "",
        role: ROLES.CUSTOMER,
        status: STATUS.ACTIVE,
      });
      setAvatarPreview("");
    }
  }, [user, reset]);

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pw = '';
    for (let i = 0; i < 12; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
    setValue("password", pw, { shouldValidate: true });
  };

  // Upload avatar file từ máy → Base64
  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh (JPG, PNG, WEBP...)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Kéo thả ảnh avatar
  const handleAvatarDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
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
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearAvatar = () => {
    setAvatarPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (data) => {
    // Đính kèm avatar vào data trước khi lưu
    const payload = { ...data, avatar: avatarPreview };

    if (isEdit) {
      updateUserMutation.mutate(
        { id: user.id, ...payload },
        {
          onSuccess: () => {
            toast.success("Đã cập nhật thông tin tài khoản!");
            onClose();
          },
        }
      );
    } else {
      createUserMutation.mutate(
        payload,
        {
          onSuccess: () => {
            toast.success("Đã thêm tài khoản mới!");
            onClose();
          },
        }
      );
    }
  };

  // Lấy 2 chữ cái đầu để hiển thị khi chưa có avatar
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  return (
    <AdminDrawer
      isOpen={true}
      onClose={onClose}
      title={isEdit ? "CẬP NHẬT HỒ SƠ ✏️" : "THÊM TÀI KHOẢN MỚI ⚡"}
      subtitle="Cấu hình hồ sơ, quyền hạn và trạng thái"
      icon="fa-user-shield"
      footerActions={
        <>
          <AdminPopButton variant="secondary" onClick={onClose}>
            Hủy Bỏ
          </AdminPopButton>
          <AdminPopButton type="submit" form="userForm" variant="success" icon="fa-solid fa-check">
            Lưu Hồ Sơ
          </AdminPopButton>
        </>
      }
    >
      <form id="userForm" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        {/* ===== BLOCK 0: Avatar ===== */}
        <div className="flex flex-col gap-3 bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000]">
          <span className="font-comic text-sm text-black uppercase font-black flex items-center gap-2 border-b-2 border-black pb-2">
            <i className="fa-solid fa-camera"></i> Ảnh Đại Diện
          </span>

          <div className="flex items-start gap-4">
            {/* Avatar Preview — hình tròn kiểu manga */}
            <div className="relative flex-shrink-0">
              <div
                className="w-24 h-24 border-[3px] border-black shadow-[4px_4px_0px_#000] overflow-hidden bg-comic-yellow flex items-center justify-center cursor-pointer"
                style={{ borderRadius: "50%" }}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleAvatarDrop}
                onDragOver={(e) => e.preventDefault()}
                title="Click hoặc kéo thả ảnh vào đây"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={() => {
                      setAvatarPreview("");
                      toast.error("Không thể tải ảnh!");
                    }}
                  />
                ) : (
                  <span className="font-comic text-3xl font-black text-black select-none">
                    {/* Nếu đang edit thì hiện chữ cái đầu tên, không thì hiện icon camera */}
                    {isEdit ? getInitials(user?.name) : <i className="fa-solid fa-camera text-2xl opacity-50"></i>}
                  </span>
                )}
              </div>
              {/* Badge overlay "Thay ảnh" */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-black text-white border-[2px] border-white flex items-center justify-center hover:bg-comic-yellow hover:text-black transition-colors"
                style={{ borderRadius: "50%" }}
                title="Thay đổi ảnh"
              >
                <i className="fa-solid fa-pen text-[10px]"></i>
              </button>
            </div>

            {/* Hướng dẫn + nút hành động */}
            <div className="flex flex-col gap-2 flex-1">
              <p className="font-bubble text-xs font-bold text-gray-500 uppercase">
                Hỗ trợ JPG, PNG, WEBP — Tối đa 2MB
              </p>
              <p className="font-bubble text-xs font-bold text-gray-400">
                Click vào avatar hoặc kéo & thả ảnh vào đó để thay đổi.
              </p>
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-comic-yellow text-black border-[2px] border-black font-comic text-xs uppercase font-black shadow-[2px_2px_0px_#000] hover:brightness-95 transition-all flex items-center gap-1"
                >
                  <i className="fa-solid fa-upload"></i> Tải Lên
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleClearAvatar}
                    className="px-3 py-1.5 bg-red-100 text-red-600 border-[2px] border-red-400 font-comic text-xs uppercase font-black hover:bg-red-200 transition-colors flex items-center gap-1"
                  >
                    <i className="fa-solid fa-trash"></i> Xóa
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Input file ẩn */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarFileChange}
            className="hidden"
          />
        </div>

        {/* ===== BLOCK 1: Thông Tin Nhận Diện ===== */}
        <div className="flex flex-col gap-3 bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000]">
          <span className="font-comic text-sm text-black uppercase font-black flex items-center gap-2 border-b-2 border-black pb-2">
            <i className="fa-regular fa-id-card"></i> 1. Thông Tin Nhận Diện
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <label className="font-bubble font-bold text-sm text-black uppercase">Họ & Tên *</label>
              <input
                {...register("name")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
                placeholder="VD: Nguyễn Văn A"
                type="text"
              />
              {errors.name && <span className="text-red-500 text-xs font-bold">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bubble font-bold text-sm text-black uppercase">Biệt Danh / Nickname</label>
              <input
                {...register("nickname")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
                placeholder="VD: @otaku_king"
                type="text"
              />
            </div>
          </div>
        </div>

        {/* ===== BLOCK 2: Liên Hệ & Đăng Nhập ===== */}
        <div className="flex flex-col gap-3 bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000]">
          <span className="font-comic text-sm text-black uppercase font-black flex items-center gap-2 border-b-2 border-black pb-2">
            <i className="fa-regular fa-envelope"></i> 2. Liên Hệ & Đăng Nhập
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <label className="font-bubble font-bold text-sm text-black uppercase">Email *</label>
              <input
                {...register("email")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
                placeholder="user@swoomanga.vn"
                type="email"
              />
              {errors.email && <span className="text-red-500 text-xs font-bold">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bubble font-bold text-sm text-black uppercase">Số Điện Thoại</label>
              <input
                {...register("phone")}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
                placeholder="09xx.xxx.xxx"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center justify-between">
              <label className="font-bubble font-bold text-sm text-black uppercase">Mật Khẩu *</label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="font-comic text-[10px] text-red-600 uppercase font-black hover:underline"
              >
                Tạo ngẫu nhiên ⚡
              </button>
            </div>
            <input
              {...register("password")}
              className="w-full p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              type="text"
            />
            {errors.password && <span className="text-red-500 text-xs font-bold">{errors.password.message}</span>}
          </div>
        </div>

        {/* ===== BLOCK 3: Phân Quyền ===== */}
        <div className="flex flex-col gap-3 bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000]">
          <span className="font-comic text-sm text-black uppercase font-black flex items-center gap-2 border-b-2 border-black pb-2">
            <i className="fa-solid fa-users-gear"></i> 3. Phân Quyền
          </span>
          <div className="flex flex-col gap-2 mt-2">
            <label className="p-3 border-[2px] border-black flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="radio"
                value={ROLES.ADMIN}
                {...register("role")}
                className="w-4 h-4 accent-black"
              />
              <div className="flex flex-col">
                <span className="font-comic text-sm text-black uppercase font-black">Quản Trị Viên (Admin)</span>
                <span className="font-bubble text-xs font-bold text-gray-600">Toàn quyền kiểm soát cửa hàng, xem báo cáo, quản lý sản phẩm và user.</span>
              </div>
            </label>
            <label className="p-3 border-[2px] border-black flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="radio"
                value={ROLES.CUSTOMER}
                {...register("role")}
                className="w-4 h-4 accent-black"
              />
              <div className="flex flex-col">
                <span className="font-comic text-sm text-black uppercase font-black">Khách Hàng (Customer)</span>
                <span className="font-bubble text-xs font-bold text-gray-600">Quyền mua hàng, xem lịch sử đơn, tích điểm. Không vào được trang quản trị.</span>
              </div>
            </label>
          </div>
        </div>

        {/* ===== BLOCK 4: Trạng Thái ===== */}
        <div className="flex flex-col gap-3 bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000]">
          <span className="font-comic text-sm text-black uppercase font-black flex items-center gap-2 border-b-2 border-black pb-2">
            <i className="fa-solid fa-toggle-on"></i> 4. Trạng Thái
          </span>
          <div className="flex gap-4 mt-2">
            <label className="flex-1 p-2 border-[2px] border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-green-50 transition-colors">
              <input
                type="radio"
                value={STATUS.ACTIVE}
                {...register("status")}
                className="w-4 h-4 accent-green-600"
              />
              <span className="font-comic text-sm text-black uppercase font-black">Hoạt Động</span>
            </label>
            <label className="flex-1 p-2 border-[2px] border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-red-50 transition-colors">
              <input
                type="radio"
                value={STATUS.LOCKED}
                {...register("status")}
                className="w-4 h-4 accent-red-600"
              />
              <span className="font-comic text-sm text-red-600 uppercase font-black">Bị Khóa 🔒</span>
            </label>
          </div>
        </div>

      </form>
    </AdminDrawer>
  );
}
