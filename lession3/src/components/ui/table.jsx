import React from "react";

// CÁI KHUÔN ĐÚC BẢNG DỮ LIỆU
export const Table = ({
  columns = [], // Mảng Bản vẽ cột
  data = [], // Mảng Dữ liệu hàng
}) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        {/* 1. VẼ TIÊU ĐỀ BẢNG (Header) */}
        <thead className="bg-gray-50 text-gray-700 text-sm font-semibold uppercase">
          <tr>
            {/* Vòng lặp thứ nhất: Đọc bản vẽ để đúc ra các Cột */}
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4 border-b border-gray-200">
                {col.title} {/* VD: In ra chữ "Khách hàng", "Số lượng" */}
              </th>
            ))}
          </tr>
        </thead>

        {/* 2. VẼ THÂN BẢNG (Ruột chứa dữ liệu) */}
        <tbody className="text-gray-600 text-sm">
          {/* Tình huống: Nếu thùng hàng trống không */}
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-gray-400"
              >
                Chưa có dữ liệu nào! 🥥
              </td>
            </tr>
          ) : (
            /* Vòng lặp thứ 2 (Lặp Hàng): Đọc thùng hàng data để đúc ra các Hàng (Row) */
            data.map((rowItem, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Vòng lặp thứ 3 (Lặp Ô): Đi dọc theo bản vẽ cột để nhét dữ liệu vào từng ô (Cell) */}
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {/* 
                      VŨ KHÍ TỐI THƯỢNG: Hàm render!
                      - Nếu bản vẽ có kèm hàm render: Gọi hàm đó ra để tự do vẽ vời (vẽ Nút, vẽ Chữ màu).
                      - Nếu không có: In cái chữ bình thường ra.
                    */}
                    {col.render
                      ? col.render(rowItem[col.dataIndex], rowItem)
                      : rowItem[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
