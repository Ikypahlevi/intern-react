import React, { useEffect } from "react";
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

  const isEdit = !!user;

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
    }
  }, [user, reset]);

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pw = '';
    for (let i = 0; i < 12; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
    setValue("password", pw, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    if (isEdit) {
      updateUserMutation.mutate(
        { id: user.id, ...data },
        {
          onSuccess: () => {
            toast.success("Đã cập nhật thông tin tài khoản!");
            onClose();
          },
        }
      );
    } else {
      createUserMutation.mutate(
        data,
        {
          onSuccess: () => {
            toast.success("Đã thêm tài khoản mới!");
            onClose();
          },
        }
      );
    }
  };

  return (
    <AdminDrawer
      isOpen={true} // Controlled by parent
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
