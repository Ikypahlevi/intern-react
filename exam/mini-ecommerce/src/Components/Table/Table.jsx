import React from "react";

export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto border-4 border-black shadow-[6px_6px_0px_#000] bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-comic-yellow font-comic text-lg uppercase tracking-wider border-b-4 border-black">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`p-4 text-black font-normal ${idx !== columns.length - 1 ? "border-r-2 border-black" : ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-bubble font-bold text-sm">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-gray-500 font-comic text-xl">
                KHÔNG CÓ DỮ LIỆU... 🥲
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className={`hover:bg-yellow-50 transition-colors ${rowIdx !== data.length - 1 ? "border-b-2 border-black" : ""}`}
              >
                {columns.map((col, colIdx) => (
                  <td 
                    key={colIdx} 
                    className={`p-4 ${colIdx !== columns.length - 1 ? "border-r-2 border-black" : ""}`}
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
