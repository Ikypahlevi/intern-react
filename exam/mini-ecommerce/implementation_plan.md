# Kế hoạch Tăng Kích Thước Chữ (Font Size) Toàn Cục

## 1. Phân tích vấn đề
- Cỡ chữ hiện tại trên website (được kiểm soát bởi Tailwind CSS với base mặc định là 16px) đang khá nhỏ so với giao diện truyện tranh, khiến việc đọc dữ liệu (User xem truyện, Admin duyệt đơn) hơi mỏi mắt.
- Yêu cầu: Làm to chữ lên một chút và áp dụng đồng bộ 100% trên cả 2 giao diện Admin & User.

## 2. Giải pháp kỹ thuật (Tối ưu nhất)
Thay vì phải đi tìm và sửa từng class 	ext-sm, 	ext-base, 	ext-xs ở hàng chục file Component khác nhau (rất mất thời gian, dễ gây lỗi vỡ layout hoặc sót file), em sẽ sử dụng phương pháp **Scale Root Font-size**.

- **Hành động:** Em sẽ can thiệp vào file CSS gốc (src/index.css), cấu hình cho thẻ <html> có ont-size: 17.5px; (Mặc định đang là 16px).
- **Cơ chế hoạt động:** Tailwind CSS sử dụng đơn vị em cho toàn bộ các thông số (font chữ, padding, margin, kích thước hộp). 1rem = font-size của thẻ html. 
- Khi ta tăng base font-size từ 16px lên 17.5px (tăng ~10%), **tất cả mọi thứ** sử dụng class Tailwind trên toàn bộ dự án sẽ tự động tỷ lệ thuận to lên 10%. 
- **Ưu điểm tuyệt đối:** Chữ sẽ to ra, đồng thời các nút bấm (button), khoảng cách (margin/padding) cũng to ra tương ứng. Đảm bảo chữ KHÔNG BỊ TRÀN (overflow) ra khỏi khung/nút bấm, giữ nguyên vẹn 100% thiết kế đẹp mắt hiện tại nhưng ở một phiên bản "rõ nét, to tát" hơn.

## 3. Các bước triển khai
- Mở file src/index.css.
- Bổ sung quy tắc CSS vào block @layer base:
  `css
  html {
    font-size: 17.5px; /* Tăng 10% so với mặc định 16px */
  }
  `
- Rebuild dự án để áp dụng.

## 4. Xác nhận
Cách làm này cực kỳ nhanh, an toàn tuyệt đối và đạt đúng mục đích "chỉnh to hơn tí" một cách vô cùng đồng bộ. Anh/chị xem qua kế hoạch, nếu đồng ý thì nhấn "Proceed" để em gõ dòng code phép thuật này nhé!
