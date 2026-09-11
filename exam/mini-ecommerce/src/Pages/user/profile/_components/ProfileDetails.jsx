import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../_schema/profileSchema";
import { useAuthStore } from "../../../../Stores/authStore";
import { toast } from "sonner";
import Input from "../../../../Components/user/Input/Input";
import Button from "../../../../Components/user/Button/Button";
import api from "../../../../Services/api";

export default function ProfileDetails({ user }) {
  const { login } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || ""
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const users = await api.get(`/users?email=${user.email}`);
      const currentUser = users[0];

      if (!currentUser) {
        toast.error("Không tìm thấy tài khoản để cập nhật!");
        return;
      }

      const updatedUser = {
        ...currentUser,
        ...data
      };

      await api.put(`/users/${user.id}`, updatedUser);
      toast.success("Cập nhật thông tin thành công! 🥳");

      login({
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
        name: updatedUser.name,
      });

    } catch (error) {
      toast.error("Lỗi cập nhật. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-[3px] border-black shadow-comic-lg p-6 sm:p-8 relative">
      <div className="absolute -top-3 left-6 bg-black text-white font-comic text-xs uppercase px-3 py-0.5 border-2 border-black rotate-[-1deg] font-black shadow-comic-sm">
        HỒ SƠ CỦA TÔI
      </div>

      <div className="flex items-center gap-4 border-b-[3px] border-black pb-4 mb-6">
        <div className="w-16 h-16 bg-comic-yellow border-2 border-black flex items-center justify-center shadow-comic-sm">
          <i className="fa-solid fa-user-ninja text-3xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-comic tracking-wide text-black uppercase font-black">QUẢN LÝ THÔNG TIN</h2>
          <p className="text-xs text-gray-700 font-bold font-bubble">Cập nhật thông tin để nhận quà VIP & Tracking đơn hàng dễ hơn</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-bubble">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Họ và tên *
            </label>
            <Input 
              {...register("name")}
              placeholder="Nhập họ và tên..."
              error={errors.name?.message}
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Email *
            </label>
            <Input 
              type="email"
              {...register("email")}
              placeholder="Ví dụ: hero@swoo.vn"
              error={errors.email?.message}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Số Điện Thoại
            </label>
            <Input 
              type="tel"
              {...register("phone")}
              placeholder="0912345678"
              error={errors.phone?.message}
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1 font-comic tracking-wider">
              Địa chỉ nhận hàng
            </label>
            <Input 
              {...register("address")}
              placeholder="Nhập địa chỉ nhà..."
              error={errors.address?.message}
            />
          </div>
        </div>

        <div className="pt-4 text-right">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-comic-yellow hover:bg-black text-black hover:text-white font-comic border-[3px] border-black px-8 py-2.5 text-sm uppercase shadow-comic transition-all"
          >
            {isSubmitting ? "ĐANG LƯU..." : "LƯU THAY ĐỔI ⚡"}
          </Button>
        </div>
      </form>
    </div>
  );
}
