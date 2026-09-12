# Kế hoạch đồng bộ UI Form (Xóa nút X, dùng nút Hủy bỏ)

## Mục tiêu
Đồng nhất trải nghiệm người dùng (UX) trên toàn bộ hệ thống bằng cách bắt buộc người dùng sử dụng các nút hành động rõ ràng (như "Hủy bỏ") ở dưới đáy form thay vì bấm nút X tắt nhanh ở góc trên. Tránh tình trạng tắt nhầm form.

## Chi tiết thay đổi

### 1. Khu vực Admin Form (AdminDrawer)
- **File:** src/Components/admin/AdminDrawer.jsx (Component dùng chung cho các form Thêm/Sửa Sản phẩm, Tài khoản...)
- **Hành động:** Xóa hoàn toàn nút button chứa icon a-xmark ở góc trên bên phải. Các form hiện tại đều đã có nút "Hủy Bỏ" ở phần footer.

### 2. Khu vực Popup Xác nhận (ConfirmModal)
- **File:** src/Components/admin/ConfirmModal.jsx (Component dùng chung cho popup Xóa, Xuất báo cáo, Xác nhận...)
- **Hành động:** Lược bỏ nút X ở Header của Modal. Người dùng sẽ chỉ có thể dùng nút "Hủy Bỏ" hoặc "Đồng ý" ở dưới.

### 3. Khu vực User Modal
- **File:** src/Components/user/Modal/Modal.jsx
- **Hành động:** Xóa nút X ở trên cùng và bổ sung thêm nút "Hủy bỏ" mặc định ở cuối Modal để đảm bảo người dùng có đường thoát.

### 4. Khu vực Lọc Sản Phẩm Mobile (ProductsFilterSidebar)
- **File:** src/Pages/user/products/_components/ProductsFilterSidebar.jsx
- **Hành động:** Đây là form bộ lọc trên mobile, nút tắt hiện đang là dấu X. Đổi nút này thành nút chứa chữ "HỦY BỎ" hoặc "ĐÓNG" rõ ràng thay vì chỉ dùng icon.

## Xác nhận
Kế hoạch này sẽ rà soát và loại bỏ sạch sẽ mọi nút X trên các form toàn dự án. Nếu anh/chị đồng ý thì em sẽ bắt đầu sửa code ngay nhé!
