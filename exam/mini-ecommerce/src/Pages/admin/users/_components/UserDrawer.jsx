import React, { useState, useEffect } from "react";
import { useCreateUser, useUpdateUser } from "../../../../Services/queries/useUsers";
import { toast } from "sonner";
import AdminDrawer from "../../../../Components/admin/AdminDrawer";
import AdminPopButton from "../../../../Components/admin/AdminPopButton";

export default function UserDrawer({ user, onClose }) {
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const isEdit = !!user;

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
    status: "active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        nickname: user.nickname || "",
        email: user.email || "",
        phone: user.phone || "",
        password: user.password || "",
        role: user.role || "customer",
        status: user.status || "active",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pw = '';
    for (let i = 0; i < 12; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
    setFormData(prev => ({ ...prev, password: pw }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateUserMutation.mutate(
        { id: user.id, ...formData },
        {
          onSuccess: () => {
            toast.success("Đã cập nhật thông tin tài khoản!");
            onClose();
          }
        }
      );
    } else {
      createUserMutation.mutate(
        formData,
        {
          onSuccess: () => {
            toast.success("Đã thêm tài khoản mới!");
            onClose();
          }
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
      <form id="userForm" onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="flex flex-col gap-3 bg-white p-4 border-[2px] border-black shadow-[3px_3px_0px_#000]">
          <span className="font-comic text-sm text-black uppercase font-black flex items-center gap-2 border-b-2 border-black pb-2">
            <i className="fa-regular fa-id-card"></i> 1. Thông Tin Nhận Diện
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <label className="font-bubble font-bold text-sm text-black uppercase">Họ & Tên *</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
                placeholder="VD: Nguyễn Văn A"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bubble font-bold text-sm text-black uppercase">Biệt Danh / Nickname</label>
              <input 
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
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
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
                placeholder="user@swoomanga.vn"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bubble font-bold text-sm text-black uppercase">Số Điện Thoại</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
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
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border-[2px] border-black outline-none focus:bg-yellow-50 font-bold"
              type="text"
            />
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
                name="role" 
                value="admin" 
                checked={formData.role === "admin"}
                onChange={handleChange}
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
                name="role" 
                value="customer" 
                checked={formData.role === "customer"}
                onChange={handleChange}
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
                name="status" 
                value="active" 
                checked={formData.status === "active"}
                onChange={handleChange}
                className="w-4 h-4 accent-green-600"
              />
              <span className="font-comic text-sm text-black uppercase font-black">Hoạt Động</span>
            </label>

            <label className="flex-1 p-2 border-[2px] border-black flex items-center justify-center gap-2 cursor-pointer hover:bg-red-50 transition-colors">
              <input 
                type="radio" 
                name="status" 
                value="locked" 
                checked={formData.status === "locked"}
                onChange={handleChange}
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
