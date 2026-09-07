import React, { useState } from "react";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import api from "../../../Services/api";
import { useAuthStore } from "../../../Stores/authStore";

export default function ProfileDetails({ user }) {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Họ tên và Email không được để trống!");
      return;
    }

    try {
      setIsSubmitting(true);
      // Fetch user mới nhất
      const currentUser = await api.get(`/users/${user.id}`);
      
      const updatedUser = {
        ...currentUser,
        ...formData
      };

      await api.put(`/users/${user.id}`, updatedUser);
      login(updatedUser); // Cập nhật lại store
      alert("Cập nhật thông tin thành công! ⚡");
    } catch (error) {
      console.error("Lỗi cập nhật profile:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-[3px] border-black shadow-comic-lg p-6 sm:p-8 relative">
      <div className="absolute -top-3 left-6 bg-comic-yellow text-black font-comic text-xs uppercase px-3 py-0.5 border-2 border-black rotate-[-2deg] font-black shadow-comic-sm">
        HỒ SƠ HIỆP SĨ (HERO DOSSIER)
      </div>

      <div className="flex flex-wrap items-center justify-between border-b-[3px] border-black pb-4 mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-comic tracking-wide text-black flex items-center gap-2 font-black">
            CẬP NHẬT HỒ SƠ CÁ NHÂN
            <span className="text-comic-yellow bg-black px-2 py-0.5 text-sm rotate-3">⚡ OFFICIAL</span>
          </h1>
          <p className="text-xs text-gray-700 font-bold uppercase tracking-wider mt-1 font-bubble">
            Chỉnh sửa thông tin giao nhận và thiết lập tài khoản
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 font-bubble">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Họ và Tên thật <span className="text-comic-red">*</span>
            </label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên..."
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Email <span className="text-comic-red">*</span>
            </label>
            <Input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ví dụ: hero@swoo.vn"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Số điện thoại
            </label>
            <Input 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Địa chỉ mặc định
            </label>
            <Input 
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ nhà..."
            />
          </div>
        </div>

        <div className="pt-4 flex items-center gap-3">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-comic-yellow hover:bg-yellow-400 text-black font-comic text-base uppercase tracking-wider shadow-comic font-black"
          >
            {isSubmitting ? "ĐANG LƯU..." : "LƯU THAY ĐỔI ⚡"}
          </Button>
        </div>
      </form>
    </div>
  );
}
