import React from "react";
import Input from "../../../Components/Input/Input";
import Select from "../../../Components/Select/Select";

export default function CheckoutForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="comic-border bg-white rounded-xl p-6 shadow-comic-lg">
      {/* Section Title Header */}
      <div className="border-b-4 border-black pb-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <span className="bg-comic-yellow comic-border px-3 py-1 font-comic text-2xl rotate-[-2deg] inline-block shadow-comic-sm">
            BƯỚC 1
          </span> */}
          <div>
            <h1 className="font-comic text-2xl text-black tracking-wide">
              THÔNG TIN GIAO HÀNG
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-bubble">
              Billing & Shipping Details
            </p>
          </div>
        </div>
        <span className="text-xs font-extrabold bg-red-100 text-comic-red px-2 py-1 rounded comic-border-2">
          * Bắt buộc
        </span>
      </div>

      {/* Form Fields Container */}
      <div className="space-y-4 font-bubble">
        {/* Row: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1">
              Họ & Đệm (First Name) <span className="text-comic-red">*</span>
            </label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Nhập họ và đệm"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1">
              Tên (Last Name) <span className="text-comic-red">*</span>
            </label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Nhập tên"
            />
          </div>
        </div>

        {/* Country / Region Dropdown */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1">
            Quốc Gia / Khu Vực (Country / Region){" "}
            <span className="text-comic-red">*</span>
          </label>
          <Select
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={[
              { value: "VN", label: "Vietnam (Việt Nam)" },
              { value: "JP", label: "Japan (Nhật Bản)" },
            ]}
          />
        </div>

        {/* Street Address */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-gray-800">
            Địa Chỉ Nhận Hàng (Street Address){" "}
            <span className="text-comic-red">*</span>
          </label>
          <Input
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            placeholder="Số nhà, tên đường phố cụ thể..."
          />
        </div>

        {/* Town / City & District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1">
              Tỉnh / Thành Phố (Town / City){" "}
              <span className="text-comic-red">*</span>
            </label>
            <Select
              name="city"
              value={formData.city}
              onChange={handleChange}
              options={[
                { value: "HCM", label: "Hồ Chí Minh" },
                { value: "HN", label: "Hà Nội" },
                { value: "DN", label: "Đà Nẵng" },
              ]}
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1">
              Quận / Huyện (District) <span className="text-comic-red">*</span>
            </label>
            <Input
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              placeholder="Nhập Quận/Huyện"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1">
              Số Điện Thoại (Phone) <span className="text-comic-red">*</span>
            </label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Ví dụ: 0901234567"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1">
              Địa Chỉ Email <span className="text-comic-red">*</span>
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="hero@swoo-manga.vn"
            />
          </div>
        </div>

        {/* Additional Information Textarea */}
        <div className="pt-4 border-t-2 border-black mt-4">
          <div className="mb-2">
            <h2 className="font-comic text-lg text-black">THÔNG TIN BỔ SUNG</h2>
            <label className="block text-xs font-bold text-gray-600">
              Ghi chú đơn hàng (Ghi chú giao hàng, yêu cầu bọc màng co, v.v...)
            </label>
          </div>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm border-[2.5px] border-black rounded-lg shadow-comic-sm focus:shadow-comic focus:bg-yellow-50 focus:outline-none transition-all font-bold"
            placeholder="Ghi chú đơn hàng cho shipper hoặc yêu cầu đặc biệt..."
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
