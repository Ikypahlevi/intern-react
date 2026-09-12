# Kế hoạch Thay thế Popup bằng Hiệu ứng Highlight Sản Phẩm

## Mục tiêu
Loại bỏ hoàn toàn Popup hiển thị chi tiết sản phẩm vừa tạo. Thay vào đó, khi Admin click vào một sản phẩm từ thanh tìm kiếm, hệ thống sẽ điều hướng về bảng sản phẩm, tự động chuyển đến trang (pagination) chứa sản phẩm đó, cuộn (scroll) tới dòng chứa sản phẩm, và làm nổi bật (highlight) dòng đó lên.

## Chi tiết các bước thực hiện

### 1. Dọn dẹp code cũ (Rollback)
- Xóa hoàn toàn file ProductDetailModal.jsx.
- Xóa import và component Modal trong ProductsList.jsx.
- Xóa nút "Xem chi tiết" (icon con mắt) vừa thêm ở cột hành động trong ProductsTable.jsx.

### 2. Sửa lại thanh tìm kiếm (AdminHeader.jsx)
- Cập nhật URL khi bấm vào kết quả tìm kiếm: đổi từ ?viewProduct={id} thành ?highlight={id}.

### 3. Logic tự động nhảy trang (ProductsList.jsx)
- Đọc tham số highlight từ URL.
- Dò tìm xem sản phẩm đó nằm ở vị trí (index) số mấy trong danh sách (sau khi đã lọc).
- Tính toán xem index đó thuộc trang (page) thứ mấy.
- Tự động setCurrentPage(page) để nhảy đúng đến trang chứa sản phẩm.

### 4. Hiệu ứng Cuộn & Làm nổi bật (ProductsTable.jsx)
- Dựa vào ID truyền xuống từ URL, tìm thẻ <tr> chứa sản phẩm.
- Dùng useRef và scrollIntoView({ behavior: 'smooth', block: 'center' }) để cuộn màn hình hiển thị ngay dòng sản phẩm.
- Thêm class CSS thay đổi màu nền (ví dụ: vàng sáng) cho dòng đó. Hiệu ứng này sẽ kéo dài khoảng 3 giây rồi phai dần về màu trắng bình thường, sau đó hệ thống sẽ tự động gỡ tham số highlight khỏi URL.

## Xác nhận
Kế hoạch này mang tính thực tế cao, giúp người quản lý định vị ngay sản phẩm trên bảng dữ liệu mà không cần xem qua popup. Nếu anh/chị chốt phương án này, hãy bấm "Proceed" để em tiến hành dọn dẹp và code luôn nhé!
