import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../../Stores/authStore";

export default function ContactForm() {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Hỏi về đơn hàng truyện tranh",
    orderId: "",
    message: "",
    newsletter: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill nếu user đã đăng nhập
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc (*)");
      return;
    }
    
    setIsSubmitting(true);
    // Giả lập gửi API
    setTimeout(() => {
      alert("⚡ TÍN HIỆU ĐÃ ĐƯỢC PHÁT ĐI THÀNH CÔNG! Tổng bộ Manga sẽ sớm phản hồi bạn.");
      setFormData(prev => ({ ...prev, message: "", orderId: "" })); // Reset nội dung
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="col-span-1 md:col-span-7 font-bubble">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-gray-900 mb-1 uppercase font-comic">Tên độc giả / Bút danh <span className="text-red-600 font-extrabold">*</span></label>
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-xs py-2 px-3 border-[2.5px] border-black shadow-comic-sm rounded-md font-bold focus:bg-yellow-50 outline-none" 
              type="text" 
              placeholder="Ví dụ: Oda Fan / Nguyễn An" 
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-900 mb-1 uppercase font-comic">Số điện thoại liên lạc <span className="text-red-600 font-extrabold">*</span></label>
            <input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-xs py-2 px-3 border-[2.5px] border-black shadow-comic-sm rounded-md font-bold focus:bg-yellow-50 outline-none" 
              type="tel" 
              placeholder="Ví dụ: 0987 654 321" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-gray-900 mb-1 uppercase font-comic">Email liên hệ phản hồi <span className="text-red-600 font-extrabold">*</span></label>
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-xs py-2 px-3 border-[2.5px] border-black shadow-comic-sm rounded-md font-bold focus:bg-yellow-50 outline-none" 
              type="email" 
              placeholder="reader@otaku.vn" 
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-900 mb-1 uppercase font-comic">Chủ đề cần hỗ trợ <span className="text-red-600 font-extrabold">*</span></label>
            <div className="relative">
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full text-xs py-2 px-3 border-[2.5px] border-black shadow-comic-sm rounded-md font-extrabold appearance-none bg-white cursor-pointer"
              >
                <option>Hỏi về đơn hàng truyện tranh</option>
                <option>Đặt trước Boxset & Ấn bản Giới hạn</option>
                <option>Đổi trả sách in lỗi / bung keo</option>
                <option>Khiếu nại vận chuyển gãy góc / móp bìa</option>
                <option>Đề xuất nhập Manga / Hợp tác bản quyền</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-[10px] text-black pointer-events-none font-black"></i>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-gray-900 mb-1 uppercase font-comic">Mã đơn hàng liên quan (nếu có)</label>
          <input 
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            className="w-full text-xs py-2 px-3 border-[2.5px] border-black shadow-comic-sm rounded-md font-bold focus:bg-yellow-50 outline-none" 
            type="text" 
            placeholder="Mã đơn ví dụ: #MANGA-8921" 
          />
        </div>

        <div>
          <label className="block text-xs font-black text-gray-900 mb-1 uppercase font-comic">Nội Dung Tín Hiệu Chi Tiết <span className="text-red-600 font-extrabold">*</span></label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full text-xs py-2 px-3 border-[2.5px] border-black shadow-comic-sm rounded-md font-bold text-gray-800 resize-none focus:bg-yellow-50 outline-none" 
            placeholder="Mô tả chi tiết câu hỏi, thắc mắc về ấn bản hoặc tình trạng đơn hàng gửi về Tổng Bộ..." 
            rows="4"
          ></textarea>
        </div>

        <div className="flex items-start space-x-2 pt-1">
          <input 
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="mt-0.5 rounded text-green-500 h-4 w-4 cursor-pointer border-2 border-black focus:ring-0" 
            id="newsletter-check" 
            type="checkbox" 
          />
          <label className="text-xs font-bold text-gray-800 leading-tight cursor-pointer" htmlFor="newsletter-check">
            ⚡ Đồng ý nhận cảnh báo khẩn cấp khi có đợt mở Pre-order Manga Limited và Bookmark độc quyền.
          </label>
        </div>

        <div className="pt-2">
          <button 
            disabled={isSubmitting}
            className="bg-comic-yellow text-black border-[3.5px] border-black shadow-comic font-black tracking-wide text-sm uppercase px-8 py-3 rounded-lg hover:bg-green-400 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer inline-flex items-center space-x-2 rotate-[-0.5deg]" 
            type="submit"
          >
            <span>{isSubmitting ? "ĐANG PHÁT TÍN HIỆU..." : "⚡ PHÁT TÍN HIỆU NGAY (TRANSMIT SIGNAL)"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
