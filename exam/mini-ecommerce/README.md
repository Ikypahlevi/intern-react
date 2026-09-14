# B-Comics - Mini E-Commerce Platform

Một hệ thống Website Thương Mại Điện Tử thu nhỏ chuyên bán truyện tranh (Manga/Comics), bao gồm cả giao diện người dùng (User/Customer) và hệ thống quản trị (Admin Dashboard). Dự án được thiết kế với giao diện chuẩn phong cách Comic độc đáo.

## Hướng Dẫn Cài Đặt & Chạy Dự Án

Dự án yêu cầu cài đặt sẵn **Node.js** (khuyến nghị phiên bản LTS mới nhất).

**Bước 1:** Clone mã nguồn dự án về máy.
**Bước 2:** Mở terminal ở thư mục root của dự án và cài đặt thư viện:
\\\ash
npm install
\\\

**Bước 3:** Khởi chạy Backend giả lập (JSON Server).
Mở một Terminal (1) và chạy lệnh:
\\\ash
npm run server
\\\
_(Server sẽ chạy ở cổng http://localhost:8000)_

**Bước 4:** Khởi chạy giao diện Frontend (Vite).
Mở tiếp một Terminal (2) khác và chạy lệnh:
\\\ash
npm run dev
\\\
_(Website sẽ chạy ở cổng mặc định của Vite, thường là http://localhost:5173)_

---

## 🔐 Tài Khoản Truy Cập Test

- **Tài khoản Admin:**
  - Email: dmin@gmail.com
  - Mật khẩu: password123
- **Tài khoản Khách hàng (User):**
  - Đăng ký một tài khoản mới hoặc dùng tài khoản có sẵn.
  - Ví dụ: duongss123@gmail.com / 123456

---

## 🛠️ Danh Sách Các Thư Viện Đã Sử Dụng & Lý Do Lựa Chọn

Dự án này được tối ưu kiến trúc và tuân thủ các quy tắc hiện đại nhất (Giai đoạn 1-5), lựa chọn kỹ càng các công cụ (Tech Stack) như sau:

### 1. Nền tảng Core

- **Vite (v8) + React (v19):** Công cụ build (bundler) siêu tốc, thay thế cho Create React App vốn chậm chạp. Kết hợp với React v19 mới nhất.
- **React Router DOM (v7):** Thư viện chuẩn mực để quản lý chuyển hướng (Routing), quản lý Protected Route (Admin/User) và xử lý Error Boundary cực kỳ mạnh mẽ.

### 2. Quản Lý Trạng Thái (State Management)

- **Zustand (zustand):** Quản lý Global State tĩnh (Ví dụ: Trạng thái giỏ hàng Cart, Trạng thái đăng nhập Auth).
  - _Lý do:_ Rất nhẹ, cú pháp đơn giản không cần quá nhiều boilerplate rườm rà như Redux, hiệu năng cao do kiểm soát re-render chính xác.
- **React Query (@tanstack/react-query):** Quản lý Server State (Xử lý các thao tác gọi API như Get/Post/Put/Delete).
  - _Lý do:_ Công cụ số một hiện nay trong việc gọi API, giúp loại bỏ hoàn toàn các hook useState / useEffect cồng kềnh. Tự động hỗ trợ Caching dữ liệu, tự động fetch lại (refetch), quản lý trạng thái isLoading/isError dễ dàng.

### 3. Quản Lý Form & Validation

- **React Hook Form (
  eact-hook-form):** Quản lý trạng thái nhập liệu Form.
  - _Lý do:_ Tối ưu hiệu năng xuất sắc nhờ kĩ thuật Uncontrolled Components, Form không bị re-render liên tục mỗi khi gõ phím.
- **Zod (zod) + Hookform Resolvers:** Quản lý Schema, định nghĩa luật lệ (validation rules).
  - _Lý do:_ Xác định schema cực kì trực quan, hỗ trợ TypeScript tốt. Khi kết hợp với React Hook Form tạo ra luồng validate dữ liệu chặt chẽ từ Input đến Submit. (Toàn bộ Schema của dự án đã được quy hoạch gọn gàng tại src/Validations).

### 4. Giao Tiếp Server & UI Components

- **Axios (xios):** HTTP Client gọi API.
  - _Lý do:_ Cú pháp gọn gàng hơn etch, hỗ trợ Interceptors để dễ dàng đính kèm token (nếu sau này hệ thống mở rộng xác thực bằng JWT).
- **Tailwind CSS (v4):** Styling Framework.
  - _Lý do:_ Viết CSS trực tiếp trên mã HTML/JSX một cách tốc độ, file CSS xuất ra cực nhẹ, dễ dàng cấu hình (config) các màu và viền để tạo ra style _Comic_ đặc trưng của dự án.
- **Sonner (sonner):** Thư viện thông báo Toast.
  - _Lý do:_ UI hiện đại, hiệu ứng xuất hiện siêu mượt, dễ dàng tùy biến thông báo thành công / thất bại.

### 5. Backend Giả Lập

- **JSON-Server (json-server):** Fake Backend RESTful API.
  - _Lý do:_ Phục vụ Mock API tốc độ cao bằng file db.json, hỗ trợ filter, sort, và pagination chuẩn mực. Cực kỳ phù hợp cho Frontend Developer tập trung phát triển logic giao diện.

---

_Dự án đã được chia nhỏ cấu trúc Code (Code-Splitting bằng \React.lazy\), gom thư mục Schema, tái sử dụng Common Components chặt chẽ để đảm bảo khả năng bảo trì (Maintainability)._
