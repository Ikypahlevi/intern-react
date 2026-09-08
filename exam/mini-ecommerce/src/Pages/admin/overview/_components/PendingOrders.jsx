import React from "react";
import { Link } from "react-router-dom";

export default function PendingOrders({ orders }) {
  const pendingOrders = orders.filter(o => o.status === 'pending').slice(0, 5);

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  };

  return (
    <div className="bg-white border-[3px] border-black shadow-[5px_5px_0px_#000] flex flex-col h-full font-bubble">
      <div className="p-4 border-b-[3px] border-black bg-comic-yellow flex items-center justify-between">
        <h2 className="font-comic text-lg uppercase text-black font-black flex items-center gap-2">
          <i className="fa-solid fa-clipboard-list text-red-600"></i> CẦN DUYỆT GẤP 
          <span className="bg-red-600 text-white px-2 py-0.5 text-xs border border-black">{pendingOrders.length}</span>
        </h2>
        <Link to="/admin/orders" className="font-bold text-xs uppercase underline hover:text-red-600">Xem tất cả</Link>
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-[3px] border-black bg-gray-100 font-comic text-sm uppercase">
              <th className="p-3 border-r-[2px] border-black">Mã Đơn</th>
              <th className="p-3 border-r-[2px] border-black">Khách Hàng</th>
              <th className="p-3 border-r-[2px] border-black">Tổng Tiền</th>
              <th className="p-3 border-r-[2px] border-black">Thời Gian</th>
              <th className="p-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center font-bold text-gray-500">
                  Tuyệt vời! Không có đơn hàng nào tồn đọng.
                </td>
              </tr>
            ) : (
              pendingOrders.map(order => (
                <tr key={order.id} className="border-b-[2px] border-black hover:bg-yellow-50 transition-colors">
                  <td className="p-3 border-r-[2px] border-black font-bold text-blue-600">{order.id}</td>
                  <td className="p-3 border-r-[2px] border-black">
                    <div className="font-bold text-sm">{order.customerName}</div>
                    <div className="text-[10px] text-gray-500">{order.phone}</div>
                  </td>
                  <td className="p-3 border-r-[2px] border-black font-comic text-sm font-bold text-red-600">
                    {order.totalAmount.toLocaleString()}₫
                  </td>
                  <td className="p-3 border-r-[2px] border-black text-xs font-bold text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="p-3 text-center">
                    <button className="bg-green-500 text-white border-[2px] border-black font-comic text-xs px-2 py-1 shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] uppercase font-bold">
                      Duyệt
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
