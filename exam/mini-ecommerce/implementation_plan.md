# Kế hoạch Thêm Hệ Thống Thông Báo (Notifications) & Tối Ưu UX

## Mục tiêu
1. Xây dựng hệ thống thông báo realtime cho cả Admin và User khi dữ liệu thay đổi.
2. Tối ưu giao diện Header User: Rút gọn nút Giỏ hàng và thêm Chuông thông báo.
3. Đồng bộ hóa con trỏ chuột (cursor: pointer) cho tất cả các phần tử có chức năng tương tác trên toàn hệ thống.

## Chi tiết các bước thực hiện

### 1. Cấu hình Dữ Liệu & API (Services)
- Hệ thống cơ sở dữ liệu (db.json) sẽ được thêm collection "notifications": [].
- Tạo mới file src/Services/queries/useNotifications.js chứa các custom hooks (useGetNotifications, useCreateNotification, useMarkNotificationRead).
- Lọc thông báo: 
  + User thường sẽ nhận thông báo có userId của họ hoặc ole: 'all' (khi có sản phẩm mới).
  + Admin sẽ nhận thông báo có ole: 'admin'.

### 2. Bắt Sự Kiện Thay Đổi Dữ Liệu (Triggers)
Hệ thống sẽ tự động tạo thông báo (POST notification) trong các trường hợp sau:
- **User đặt hàng thành công (Checkout.jsx):** Bắn thông báo cho Admin "Có đơn hàng mới" -> Kèm link nhảy đến bảng Quản lý Đơn hàng (highlight đơn đó lên).
- **Admin duyệt/cập nhật đơn hàng (OrdersList.jsx):** Bắn thông báo cho User mua hàng "Đơn hàng của bạn đã được cập nhật..." -> Kèm link nhảy đến trang Profile/Đơn hàng.
- **Admin thêm sản phẩm mới (ProductsList.jsx):** Bắn thông báo cho tất cả User "Vừa có truyện mới về kho..." -> Kèm link nhảy đến trang danh sách Sản phẩm.

### 3. Tối ưu Header Giao Diện User (Header.jsx)
- Rút gọn nút Giỏ hàng (xóa phần text thừa, chỉ giữ lại icon asket-shopping và số lượng).
- Thêm Icon Chuông Thông Báo (Notification Bell) ngay cạnh Giỏ hàng.
- Khi bấm vào chuông sẽ xổ xuống danh sách thông báo. Bấm vào thông báo nào sẽ điều hướng (
avigate) đến trang chứa dữ liệu đó.

### 4. Nâng cấp Thông Báo cho Admin (AdminHeader.jsx)
- Tích hợp thêm các thông báo sự kiện (như có người vừa đặt hàng) vào chung với danh sách cảnh báo tồn kho và chờ duyệt hiện tại.
- Hỗ trợ click để điều hướng thẳng đến bảng tương ứng (và highlight như yêu cầu).

### 5. Chuẩn hóa UX (Cursor Pointer)
- Thêm luật CSS toàn cục (Global CSS) vào index.css: Bắt buộc tất cả các thẻ utton,  (link), hoặc các thẻ đóng vai trò nút bấm (ole="button") đều phải có hiệu ứng trỏ chuột bàn tay (cursor: pointer !important).

## Xác nhận
Kế hoạch này sẽ thêm một lớp giao tiếp hai chiều hoàn hảo giữa Admin và User. Mọi thay đổi quan trọng đều được báo cáo kịp thời và điều hướng đúng chỗ. Anh/chị hãy đọc qua kế hoạch, nếu đồng ý thì nhấn "Proceed" để em triển khai từ A-Z nhé!
