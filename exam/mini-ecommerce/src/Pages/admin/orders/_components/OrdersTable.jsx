import React from "react";

export default function OrdersTable({ 
  orders, 
  filters, 
  handleFilterChange, 
  handleResetFilters,
  onUpdateStatus,
  highlightId
}) {

  return (
    <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_#1c1b1b] overflow-hidden font-bubble">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
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
              <th className="p-4 w-64 align-top">
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
              <th className="p-4 align-top">
                <div className="font-comic text-sm uppercase text-black mb-2 block">CHI TIẾT SẢN PHẨM</div>
              </th>
              <th className="p-4 w-44 align-top">
                <div className="font-comic text-sm uppercase text-black mb-2 block">TỔNG TIỀN (VNĐ)</div>
              </th>
              <th className="p-4 w-44 align-top">
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
                              
              return (
                <tr key={order.id} className={`hover:bg-yellow-50 transition-all duration-500 border-l-[6px] ${rowBorder} ${isHighlighted ? 'bg-yellow-100/80 animate-pulse border-y-[3px] border-y-red-500 shadow-inner' : 'bg-white'}`}>
                  <td className="p-4 align-top">
                    <span className="font-comic text-sm text-blue-600 tracking-tight block">#{order.id}</span>
                    <span className="font-bubble text-xs text-gray-500 block">{new Date(order.createdAt).toLocaleString()}</span>
                  </td>
                  <td className="p-4 align-top">
                    <p className="font-bold text-sm text-black">{order.customerName}</p>
                    <p className="font-comic text-sm font-bold text-black">{order.phone}</p>
                    <p className="font-bubble text-xs text-gray-600 line-clamp-2 mt-1">{order.address}</p>
                  </td>
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img src={item.image} alt={item.name} className="w-8 h-12 object-cover border-[2px] border-black shadow-[1px_1px_0px_#000]" />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs text-black truncate">{item.name}</p>
                            <p className="font-bubble text-xs text-gray-600">SL: x{item.quantity} • {item.price.toLocaleString()}₫</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 align-top">
                    <p className="font-comic text-sm text-black font-bold">{order.totalAmount.toLocaleString()}₫</p>
                  </td>
                  <td className="p-4 align-top">
                    <span className={`inline-block font-comic text-xs px-2 py-1 border-[2px] border-black shadow-[2px_2px_0px_#1c1b1b] uppercase ${
                      order.status === 'pending' ? 'bg-red-200 text-black' :
                      order.status === 'shipping' ? 'bg-blue-200 text-black' :
                      order.status === 'completed' ? 'bg-green-500 text-black' :
                      'bg-gray-200 text-black'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 align-top text-center">
                    <div className="flex items-center justify-center gap-2">
                      {order.status === 'pending' && (
                        <>
                          <button onClick={() => onUpdateStatus(order.id, 'shipping')} className="p-1 border-[2px] border-black bg-green-400 shadow-[2px_2px_0px_#1c1b1b] hover:bg-green-500 transition-all" title="Duyệt đơn (Đang giao)">
                            <i className="fa-solid fa-check text-black"></i>
                          </button>
                          <button onClick={() => onUpdateStatus(order.id, 'cancelled')} className="p-1 border-[2px] border-black bg-red-400 shadow-[2px_2px_0px_#1c1b1b] hover:bg-red-500 transition-all" title="Hủy đơn">
                            <i className="fa-solid fa-xmark text-white"></i>
                          </button>
                        </>
                      )}
                      {(order.status === 'shipping' || order.status === 'completed' || order.status === 'cancelled') && (
                        <span className="text-xs text-gray-500 font-bold">-</span>
                      )}
                    </div>
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
