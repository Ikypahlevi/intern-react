# Kế hoạch Cải thiện Trải nghiệm Người dùng (UX) và Giao diện (UI)

## 1. Khóa thanh cuộn (Scroll Lock) khi mở Popup/Modal
- **Vấn đề:** Hiện tại khi mở các Modal (như Hamburger Menu trên điện thoại, hoặc các khung cập nhật trong Admin), trang web bên dưới vẫn có thể cuộn được, gây khó chịu cho người dùng.
- **Giải pháp:** Sử dụng React useEffect bên trong các Component Drawer (như AdminDrawer, Header.jsx) để can thiệp vào document.body.style.overflow. Khi Modal mở, đặt thành hidden để khóa cuộn. Khi đóng, trả về unset.

## 2. Menu Thể Loại (Categories) dạng Accordion trong Hamburger
- **Vấn đề:** Danh sách thể loại trên mobile chiếm diện tích và khi click vào 1 thể loại, menu không tự động đóng lại.
- **Giải pháp:** 
  - Thêm state isMobileCategoryOpen vào Header.jsx để tạo hiệu ứng sổ xuống (Accordion) cho mục THỂ LOẠI.
  - Bổ sung sự kiện onClick={() => setIsMobileMenuOpen(false)} vào mỗi Thể loại. Khi người dùng chọn xong, ngoài việc lọc sản phẩm, menu sẽ tự động trượt vào để lộ ra danh sách sản phẩm.

## 3. Căn giữa Icon trong Banner Tính năng (Value Props)
- **Vấn đề:** Các icon (như 100% Bản Quyền, Bọc Màng Co, Giao Siêu Tốc) hiện đang căn ngang (flex-row) với chữ. Điều này khiến giao diện trên Laptop/Tablet bị lệch do khung hiển thị rộng.
- **Giải pháp:** Sửa đổi file Home.jsx (khu vực Value Props). Chuyển từ layout ngang sang layout dọc (stack) bằng Tailwind CSS:
  - Sử dụng lex-col kết hợp 	ext-center.
  - Icon sẽ nằm chễm chệ ngay chính giữa phía trên, và đoạn text sẽ nằm cân đối ở phía dưới, đảm bảo độ thẩm mỹ cao nhất trên mọi thiết bị.

## 4. Xác nhận
Anh/chị xem qua các bước tối ưu trên. Nếu chốt phương án, hãy bấm **Proceed** để em hoàn thiện nốt phần căn chỉnh Icon (các chức năng khóa cuộn và Accordion em đã bắt đầu lên khung rồi ạ).
