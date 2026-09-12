# Kế hoạch Cập nhật Logic Tính Doanh Thu

## Mục tiêu
Điều chỉnh lại công thức tính doanh thu trên toàn bộ hệ thống theo đúng yêu cầu:
1. Đơn thanh toán trước qua QR (MoMo, VNPay, v.v.): Ghi nhận doanh thu ngay lập tức (miễn là không bị hủy).
2. Đơn thanh toán sau (Ship COD): Chỉ ghi nhận doanh thu khi trạng thái đơn hàng là đã hoàn thành / giao thành công (completed).

## Các bước triển khai chi tiết

### 1. Fix lỗi thiếu dữ liệu (Bug Fix)
- Hiện tại, chức năng Thanh toán (Checkout) đang quên không lưu trường paymentMethod (Phương thức thanh toán) vào CSDL db.json khi tạo đơn hàng mới.
- **Giải pháp:** Sửa file Checkout.jsx để đính kèm thêm paymentMethod: paymentMethod vào payload của 
ewOrder.

### 2. Tạo hàm Utils dùng chung
- Thay vì viết lại logic tính toán ở 5 file khác nhau, em sẽ tạo một hàm helper isValidRevenue(order) trong src/Utils/helpers.js (hoặc đặt chung vào hàm ormat). Hàm này sẽ nhận vào 1 order và trả về 	rue/false dựa trên 2 quy tắc nêu trên.

### 3. Cập nhật các bảng thống kê (Admin)
Áp dụng hàm logic mới vào các khu vực hiển thị doanh thu:
- **OrdersKpi.jsx**: Khối KPI phía trên cùng của trang Quản lý Đơn Hàng.
- **KpiCards.jsx**: Khối tổng doanh thu (Card 1) ở trang Overview.
- **RevenueChart.jsx**: Biểu đồ hình cột hiển thị doanh thu 6 tháng gần nhất.
- **CategoryDonut.jsx**: Biểu đồ tỷ trọng doanh thu theo thể loại (Donut Chart).
- **UsersList.jsx**: Cột tổng chi tiêu (Total Spend) của từng khách hàng trong bảng Quản lý User.

## Xác nhận
Kế hoạch này đảm bảo tính nhất quán dữ liệu cao nhất và xử lý triệt để cái lõi của việc tính sai doanh thu. Nếu anh/chị đồng ý với cách giải quyết này, hãy bấm "Proceed" để em tiến hành viết code cho tất cả các file liên quan nhé!
