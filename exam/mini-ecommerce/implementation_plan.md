# Kế hoạch khắc phục dứt điểm lỗi Layout Admin (Vỡ giao diện & Cuộn ngang)

## Nguyên nhân gốc rễ
Việc sử dụng thuộc tính padding-left: 256px (pl-64) kết hợp với thẻ header được định vị tuyệt đối ixed left-64 right-0 là cách làm cũ, rất dễ gây lỗi tính toán kích thước (overflow) trên một số độ phân giải màn hình hoặc khi bị kết hợp với các class responsive mới, dẫn đến tình trạng xuất hiện thanh cuộn ngang và bị cắt lẹm nội dung bên phải như trong hình.

## Giải pháp: Áp dụng CSS Grid Layout
Chúng ta sẽ đập bỏ cách dàn trang cũ và chuyển sang dùng hệ thống **CSS Grid** hiện đại, đảm bảo Responsive mượt mà 100% không bao giờ vỡ.

### 1. Thay đổi cấu trúc AdminLayout.jsx
- Bỏ cách dùng padding pl-64.
- Áp dụng Grid: lg:grid lg:grid-cols-[256px_1fr].
- Cột 1 (256px) dành cho Sidebar. Cột 2 (1fr - lấy toàn bộ phần diện tích còn lại) dành cho Header và Main Content.

### 2. Tái cấu trúc AdminHeader.jsx
- Xóa bỏ định vị tĩnh ixed left-64 right-0.
- Chuyển sang dùng sticky top-0 z-40 w-full.
- Lợi ích: Header sẽ luôn nằm gọn gàng 100% bên trong không gian của cột 2, không bao giờ bị tràn hay cắt lẹm ra khỏi màn hình. Vẫn đảm bảo tính năng dính chặt trên cùng khi cuộn chuột.

### 3. Tối ưu AdminSidebar.jsx
- Trên màn hình máy tính (lg), Sidebar sẽ nằm ngoan ngoãn trong cột 1 của Grid (sticky top-0 h-screen).
- Trên điện thoại, Sidebar sẽ chuyển thành dạng Drawer (trượt ra trượt vào) đè lên trên nội dung bằng ixed z-50.

## Xác nhận
Với cấu trúc Grid này, giao diện sẽ bám sát 100% kích thước màn hình của anh/chị, dứt điểm hoàn toàn bệnh tràn thanh cuộn ngang.
