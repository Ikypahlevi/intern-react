import React from "react";
import { formatCurrency } from "../../../Utils/format";
import { useUpdateOrderStatus } from "../../../Services/queries/useOrders";
import { toast } from "sonner";

export default function OrderHistory({ orders = [] }) {
  const updateStatusMutation = useUpdateOrderStatus();

  // Sắp xếp đơn hàng mới nhất lên đầu
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

  const handleConfirmReceived = async (orderId) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status: "completed" });
      toast.success("Cảm ơn bạn đã xác nhận nhận hàng!");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
      case "PENDING":
        return <span className="bg-comic-yellow text-black text-[11px] font-comic font-black px-2 py-0.5 border border-black uppercase">ĐANG CHỜ DUYỆT</span>;
      case "shipping":
      case "SHIPPING":
        return <span className="bg-blue-400 text-black text-[11px] font-comic font-black px-2 py-0.5 border border-black uppercase">🚚 ĐANG GIAO HÀNG</span>;
      case "completed":
      case "COMPLETED":
        return <span className="bg-green-500 text-white text-[11px] font-comic font-black px-2 py-0.5 border border-black uppercase">✅ GIAO THÀNH CÔNG</span>;
      case "cancelled":
      case "CANCELLED":
        return <span className="bg-gray-400 text-black text-[11px] font-comic font-black px-2 py-0.5 border border-black uppercase">❌ ĐÃ HỦY</span>;
      default:
        return <span className="bg-gray-200 text-black text-[11px] font-comic font-black px-2 py-0.5 border border-black uppercase">{status}</span>;
    }
  };

  return (
    <div className="bg-white border-[3px] border-black shadow-comic-lg p-6 sm:p-8 relative">
      <div className="absolute -top-3 left-6 bg-black text-comic-yellow font-comic text-xs uppercase px-3 py-0.5 border-2 border-black rotate-[-1deg] font-black shadow-comic-sm">
        LỊCH SỬ ĐƠN HÀNG
      </div>

      <div className="flex items-center justify-between border-b-[3px] border-black pb-3 mb-5">
        <div>
          <h2 className="text-xl font-comic tracking-wide text-black uppercase font-black">DANH SÁCH ĐƠN HÀNG ĐÃ ĐẶT</h2>
          <p className="text-xs text-gray-700 font-bold font-bubble">Theo dõi tình trạng giao ấn bản truyện & quà tặng kèm</p>
        </div>
        <span className="bg-yellow-100 border border-black px-2 py-1 text-xs font-black text-black font-comic">
          {orders.length} ĐƠN HÀNG
        </span>
      </div>

      <div className="space-y-4 font-bubble">
        {sortedOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500 font-bold border-2 border-dashed border-gray-300 bg-gray-50">
            Bạn chưa có đơn hàng nào. Hãy ra Kho truyện săn Manga ngay nhé!
          </div>
        ) : (
          sortedOrders.map((order) => (
            <div key={order.id} className="border-2 border-black p-4 bg-yellow-50 shadow-comic-sm">
              {/* Header của từng Order */}
              <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-2 mb-3 gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-comic font-black text-black text-sm uppercase">MÃ: #{order.id}</span>
                  <span className="text-xs text-gray-600 font-bold hidden sm:inline">| Ngày đặt: {new Date(order.createdAt || order.date).toLocaleDateString('vi-VN')}</span>
                </div>
                {getStatusBadge(order.status)}
              </div>

              {/* Chi tiết Item trong Order */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 space-y-3 border-r-0 md:border-r-2 border-dashed border-gray-400 pr-0 md:pr-4">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-16 bg-white border-2 border-black overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-comic font-black text-xs uppercase text-black line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] text-gray-600 font-bold mt-0.5">Số lượng: {item.quantity} cuốn</p>
                        <span className="text-xs font-black text-comic-red">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tổng tiền của Order */}
                <div className="md:col-span-4 text-left md:text-right flex flex-col justify-center gap-2">
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">TỔNG TIỀN (Gồm Ship)</div>
                    <div className="font-comic font-black text-xl text-black">{formatCurrency(order.totalAmount || order.total)}</div>
                  </div>
                  
                  {/* Nút xác nhận nhận hàng nếu đang giao */}
                  {(order.status === "shipping" || order.status === "SHIPPING") && (
                    <button 
                      onClick={() => handleConfirmReceived(order.id)}
                      disabled={updateStatusMutation.isLoading}
                      className="mt-2 bg-green-500 hover:bg-green-600 text-white font-comic text-xs uppercase px-3 py-1.5 border-[2px] border-black shadow-[2px_2px_0px_#000] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_#000] transition-all"
                    >
                      Xác Nhận Nhận Hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
