import React from "react";
import { formatCurrency } from "../../../../Utils/format";

export default function OrdersTable({ 
  orders, 
  filters, 
  handleFilterChange, 
  handleResetFilters,
  onViewDetails,
  highlightId
}) {

  return (
    <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_#1c1b1b] overflow-hidden font-bubble">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-yellow-200 border-b-[3px] border-black">
              <th className="p-4 w-44 align-top">
                <div className="font-comic text-sm uppercase text-black mb-2 block">MÃ ĐƠN HÀNG</div>
                <input 
                  type="text" 
                  name="id"
                  value={filters.id || ""}
                  onChange={handleFilterChange}
                  className="w-full bg-white border-[2px] border-black px-2 py-1 font-bubble text-sm outline-none focus:bg-[#fffff0] shadow-[1px_1px_0px_#1c1b1b]" 
                  placeholder="Tìm #Mã đơn..." 
                />
              </th>
              <th className="p-4 w-56 align-top">
                <div className="font-comic text-sm uppercase text-black mb-2 block">KHÁCH HÀNG & SĐT</div>
                <input 
                  type="text"
                  name="customer"
                  value={filters.customer || ""}
                  onChange={handleFilterChange} 
                  className="w-full bg-white border-[2px] border-black px-2 py-1 font-bubble text-sm outline-none focus:bg-[#fffff0] shadow-[1px_1px_0px_#1c1b1b]" 
                  placeholder="Tên hoặc SĐT..." 
                />
              </th>
              <th className="p-4 align-top w-40">
                <div className="font-comic text-sm uppercase text-black mb-2 block">SỐ LƯỢNG SP</div>
              </th>
              <th className="p-4 w-44 align-top">
                <div className="font-comic text-sm uppercase text-black mb-2 block">TỔNG TIỀN (VNĐ)</div>
              </th>
              <th className="p-4 w-40 align-top">
                <div className="font-comic text-sm uppercase text-black mb-2 block">TRẠNG THÁI</div>
              </th>
              <th className="p-4 w-36 text-center align-top">
                <span className="font-comic text-sm uppercase text-black block mb-2">THAO TÁC</span>
                <button 
                  onClick={handleResetFilters}
                  className="w-full bg-white border-[2px] border-black font-comic text-[10px] uppercase py-1 shadow-[1px_1px_0px_#1c1b1b] hover:bg-gray-100 transition-all"
                >
                  Reset Lọc
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-[2px] divide-black">
            {orders.map(order => {
              const isHighlighted = order.id === highlightId;
              const rowBorder = order.status === 'pending' ? 'border-l-red-500' :
                              order.status === 'shipping' ? 'border-l-blue-400' :
                              order.status === 'completed' ? 'border-l-green-500' :
                              'border-l-gray-500';
              
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                              
              return (
                <tr key={order.id} className={`hover:bg-yellow-50 transition-all duration-500 border-l-[6px] ${rowBorder} ${isHighlighted ? 'bg-yellow-100/80 animate-pulse border-y-[3px] border-y-red-500 shadow-inner' : 'bg-white'}`}>
                  <td className="p-4 align-middle">
                    <span className="font-comic text-sm text-blue-600 tracking-tight block">#{order.id}</span>
                    <span className="font-bubble text-xs text-gray-500 block mt-1">{new Date(order.createdAt).toLocaleString()}</span>
                  </td>
                  <td className="p-4 align-middle">
                    <p className="font-bold text-sm text-black">{order.customerName}</p>
                    <p className="font-comic text-sm font-bold text-gray-600">{order.phone}</p>
                  </td>
                  <td className="p-4 align-middle">
                    <span className="font-bold text-black">{totalItems}</span>
                    <span className="text-gray-500 text-xs ml-1">sản phẩm</span>
                  </td>
                  <td className="p-4 align-middle">
                    <p className="font-comic text-sm text-black font-bold">{formatCurrency(order.totalAmount)}</p>
                  </td>
                  <td className="p-4 align-middle">
                    <span className={`inline-block font-comic text-[10px] px-2 py-1 border-[2px] border-black shadow-[2px_2px_0px_#1c1b1b] uppercase ${
                      order.status === 'pending' ? 'bg-red-200 text-black' :
                      order.status === 'shipping' ? 'bg-blue-200 text-black' :
                      order.status === 'completed' ? 'bg-green-500 text-black' :
                      'bg-gray-200 text-black'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-center">
                    <button 
                      onClick={() => onViewDetails(order)} 
                      className="px-3 py-1.5 border-[2px] border-black bg-white shadow-[2px_2px_0px_#1c1b1b] hover:bg-black hover:text-white transition-all font-bold text-xs flex items-center gap-2 mx-auto" 
                      title="Xem chi tiết"
                    >
                      <i className="fa-solid fa-eye"></i> Xem
                    </button>
                  </td>
                </tr>
              )
            })}
            
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-10 text-center font-comic text-lg text-gray-500">
                  Không tìm thấy đơn hàng nào!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
