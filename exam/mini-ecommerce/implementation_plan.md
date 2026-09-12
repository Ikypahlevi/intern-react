# Kế hoạch bổ sung Popup Chi tiết Sản phẩm (Admin)

## Mục tiêu
Tạo ra một Popup (Modal) hiển thị toàn bộ thông tin chi tiết của sản phẩm. Popup này sẽ xuất hiện ở hai trường hợp:
1. Khi Admin bấm vào một sản phẩm từ thanh tìm kiếm (Live Search).
2. Khi Admin bấm vào nút "Xem" (icon con mắt) trên bảng quản lý sản phẩm.

## Giải pháp Kỹ thuật
Sử dụng **URL Search Params** (?viewProduct=ID) để quản lý trạng thái hiển thị của Popup.
- Lợi ích: Dễ dàng chia sẻ link, thống nhất trạng thái giữa thanh tìm kiếm toàn cục và trang quản lý sản phẩm mà không cần tạo thêm global state phức tạp (như Redux hay Zustand).

## Chi tiết các bước thực hiện

### 1. Cập nhật thanh tìm kiếm (AdminHeader.jsx)
- Thay đổi logic 
avigate() khi click vào sản phẩm tìm kiếm.
- Thay vì điều hướng tới route lỗi /admin/products/:id, hệ thống sẽ điều hướng tới trang quản lý sản phẩm và đính kèm tham số: /admin/products?viewProduct={id}.

### 2. Thêm nút "Xem chi tiết" vào bảng (ProductsTable.jsx)
- Trong cột hành động (Actions), bổ sung một nút bấm màu vàng có icon con mắt (a-eye).
- Khi click, nút này sẽ gọi hàm để đẩy tham số ?viewProduct={id} lên URL.

### 3. Tạo Component ProductDetailModal.jsx
- Xây dựng một Popup mới ở src/Pages/admin/products/_components/ProductDetailModal.jsx.
- Giao diện mang phong cách Comic đặc trưng của dự án (viền dày, shadow đậm).
- **Dữ liệu hiển thị:** Tên, ảnh, tác giả, nhà xuất bản, thể loại, định dạng, trạng thái (có badge màu), giá bán, giá gốc, số lượng tồn, số lượng bán, và phần mô tả.
- **Tuân thủ quy tắc cũ:** Không dùng nút X ở góc trên để đóng. Sẽ chỉ có một nút "Đóng lại" ở dưới cùng.

### 4. Tích hợp vào ProductsList.jsx
- Sử dụng hook useSearchParams để lắng nghe URL. Nếu thấy có iewProduct, trang sẽ tự động render ProductDetailModal và truyền ID vào.
- Khi đóng Modal, chỉ cần gỡ bỏ tham số iewProduct khỏi URL.

## Xác nhận
Kế hoạch này đảm bảo tính năng mới được tích hợp mượt mà, đúng chuẩn luồng dữ liệu của React Router và tuân thủ chặt chẽ phong cách thiết kế UI/UX của toàn dự án. Nếu anh/chị đồng ý, em sẽ code ngay nhé!
