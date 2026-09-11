import React from "react";
import Input from "../../../../Components/user/Input/Input";
import Select from "../../../../Components/user/Select/Select";

export default function CheckoutForm({ register, errors }) {
  return (
    <div className="comic-border bg-white rounded-xl p-6 shadow-comic-lg">
      <div className="border-b-4 border-black pb-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-comic text-2xl text-black tracking-wide">
              THÔNG TIN GIAO HÀNG
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-bubble">
              Billing & Shipping Details
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Họ (First Name) *" 
            id="firstName"
            placeholder="Ví dụ: Nguyễn"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input 
            label="Tên (Last Name) *" 
            id="lastName"
            placeholder="Ví dụ: Văn A"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Số Điện Thoại *" 
            id="phone"
            type="tel"
            placeholder="Ví dụ: 0912345678"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <Input 
            label="Email liên hệ *" 
            id="email"
            type="email"
            placeholder="Ví dụ: email@domain.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <Select 
          label="Quốc gia *" 
          id="country"
          options={[{ value: "VN", label: "Việt Nam (Vietnam)" }]}
          {...register("country")}
          error={errors.country?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select 
            label="Tỉnh / Thành phố *" 
            id="city"
            options={[
              { value: "", label: "--- Chọn Tỉnh/Thành ---" },
              { value: "HCM", label: "Hồ Chí Minh" },
              { value: "HN", label: "Hà Nội" },
              { value: "DN", label: "Đà Nẵng" }
            ]}
            {...register("city")}
            error={errors.city?.message}
          />
          <Input 
            label="Quận / Huyện *" 
            id="district"
            placeholder="Ví dụ: Quận 1"
            {...register("district")}
            error={errors.district?.message}
          />
        </div>

        <Input 
          label="Địa chỉ chi tiết (Số nhà, Tên đường) *" 
          id="street"
          placeholder="Ví dụ: 123 Đường Hải Triều"
            {...register("street")}
            error={errors.street?.message}
        />

        <div className="pt-2">
          <label className="block text-xs font-black text-slate-800 mb-1.5 uppercase tracking-wider font-bubble">
            Ghi chú đơn hàng (Tùy chọn)
          </label>
          <textarea
            className="w-full text-sm px-4 py-3 bg-white rounded-lg border-2 border-black font-bold focus:outline-none focus:bg-yellow-50 focus:ring-0 shadow-[4px_4px_0px_#000] focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
            rows="3"
            placeholder="Ghi chú về việc giao hàng, ví dụ: Giao giờ hành chính..."
            {...register("notes")}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
