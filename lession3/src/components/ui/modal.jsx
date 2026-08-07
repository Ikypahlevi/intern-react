import React, { useEffect } from "react";
import { createPortal } from "react-dom"; // Phép thuật dịch chuyển tức thời

// CÁI KHUÔN ĐÚC BẢNG THÔNG BÁO
export const Modal = ({
  isOpen, // Lệnh mở/đóng Modal (true/false)
  onClose, // Nút bấm (X) để tắt Modal
  title, // Tiêu đề của Bảng thông báo
  children, // Nội dung bên trong Bảng
}) => {
  // 1. KHÓA THANH CUỘN CHUỘT BẰNG USEEFFECT
  useEffect(() => {
    if (isOpen) {
      // Khi Modal mở: Bắt trang web nín thở, cấm cuộn chuột
      document.body.style.overflow = "hidden";
    } else {
      // Khi Modal đóng: Thả ra cho cuộn bình thường
      document.body.style.overflow = "unset";
    }

    // Dọn dẹp phòng hờ khi Component bị xóa
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 2. NẾU ĐANG ĐÓNG (isOpen = false) -> Tàng hình, không vẽ gì cả
  if (!isOpen) return null;

  // 3. NẾU ĐANG MỞ -> Bắt đầu niệm chú dịch chuyển
  // Lệnh createPortal nhận 2 thông tin: (Cái gì cần dịch chuyển, Dịch chuyển đi đâu?)
  return createPortal(
    // GÓI HÀNG ĐƯỢC DỊCH CHUYỂN
    // Thẻ div ngoài cùng: Lớp nền đen mờ (Overlay) phủ kín màn hình
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
      {/* Cái Bảng Thông Báo màu trắng nằm giữa */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Phần Đầu (Header) có Tiêu đề và Nút Tắt */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>

          {/* Nút bấm X để gọi hàm onClose */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Phần Ruột (Body): Chứa nội dung khách truyền vào */}
        <div className="p-6">{children}</div>
      </div>
    </div>,

    // ĐIỂM ĐẾN DỊCH CHUYỂN: Ném thẳng ra thẻ <body> của tài liệu gốc
    document.body,
  );
};
