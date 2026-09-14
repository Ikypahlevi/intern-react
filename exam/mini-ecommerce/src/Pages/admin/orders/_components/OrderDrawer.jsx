import React from 'react';
import AdminDrawer from '../../../../Components/admin/AdminDrawer';
import AdminPopButton from '../../../../Components/admin/AdminPopButton';
import { formatCurrency } from '../../../../Utils/format';

export default function OrderDrawer({ isOpen, onClose, order, onUpdateStatus }) {
  if (!order) return null;

  const isPending = order.status === 'pending';

  const footerActions = (
    <>
      <AdminPopButton 
        type="button" 
        variant="secondary" 
        onClick={onClose}
      >
        HỦY BỎ
      </AdminPopButton>
      {isPending && (
        <>
          <AdminPopButton 
            type="button" 
            variant="danger" 
            onClick={() => onUpdateStatus(order.id, 'cancelled')}
          >
            HỦY ĐƠN HÀNG
          </AdminPopButton>
          <AdminPopButton 
            type="button" 
            variant="primary" 
            onClick={() => onUpdateStatus(order.id, 'shipping')}
          >
            DUYỆT ĐƠN (GIAO HÀNG)
          </AdminPopButton>
        </>
      )}
    </>
  );

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={`CHI TIẾT ĐƠN HÀNG #${order.id}`}
      subtitle={`Khách hàng: ${order.customerName}`}
      icon="fa-file-invoice"
      footerActions={footerActions}
    >
      <div className="space-y-6 font-bubble">
        {/* Thông tin chung */}
        <div className="bg-white border-[2px] border-black p-4 shadow-[4px_4px_0_#1c1b1b]">
          <h3 className="font-comic text-lg border-b-2 border-black pb-2 mb-3 uppercase">Thông tin đơn hàng</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 block">Ngày đặt:</span>
              <span className="font-bold">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Trạng thái:</span>
              <span className={`inline-block font-comic text-[10px] px-2 py-1 border border-black shadow-[2px_2px_0_#000] uppercase ${
                order.status === 'pending' ? 'bg-red-200 text-black' :
                order.status === 'shipping' ? 'bg-blue-200 text-black' :
                order.status === 'completed' ? 'bg-green-500 text-black' :
                'bg-gray-200 text-black'
              }`}>
                {order.status}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Phương thức thanh toán:</span>
              <span className="font-bold uppercase">{order.paymentMethod || 'COD'}</span>
            </div>
          </div>
        </div>

        {/* Thông tin giao hàng */}
        <div className="bg-white border-[2px] border-black p-4 shadow-[4px_4px_0_#1c1b1b]">
          <h3 className="font-comic text-lg border-b-2 border-black pb-2 mb-3 uppercase">Thông tin giao hàng</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500 inline-block w-24">Họ tên:</span> <span className="font-bold">{order.customerName}</span></p>
            <p><span className="text-gray-500 inline-block w-24">Điện thoại:</span> <span className="font-bold">{order.phone}</span></p>
            <p><span className="text-gray-500 inline-block w-24">Email:</span> <span className="font-bold">{order.email}</span></p>
            <p><span className="text-gray-500 inline-block w-24 align-top">Địa chỉ:</span> <span className="font-bold inline-block w-[calc(100%-6rem)]">{order.address}</span></p>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-white border-[2px] border-black p-4 shadow-[4px_4px_0_#1c1b1b]">
          <h3 className="font-comic text-lg border-b-2 border-black pb-2 mb-3 uppercase flex justify-between">
            <span>Sản phẩm ({order.items.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </h3>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center border-b border-dashed border-gray-300 pb-3 last:border-0 last:pb-0">
                <img loading="lazy" decoding="async" src={item.image} alt={item.name} className="w-12 h-16 object-cover border-[2px] border-black shadow-[2px_2px_0_#000]" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">SL: {item.quantity} x {formatCurrency(item.price)}</p>
                </div>
                <div className="font-comic text-sm">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tổng kết */}
        <div className="bg-white border-[2px] border-black p-4 shadow-[4px_4px_0_#1c1b1b]">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Tạm tính:</span>
              <span className="font-bold">{formatCurrency(order.items.reduce((acc, i) => acc + (i.price * i.quantity), 0))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phí giao hàng:</span>
              <span className="font-bold text-green-600">
                {order.shippingFee === 0 ? 'FREESHIP' : formatCurrency(order.shippingFee || 30000)}
              </span>
            </div>
            <div className="flex justify-between border-t-2 border-black mt-2 pt-2">
              <span className="font-comic text-lg">TỔNG CỘNG:</span>
              <span className="font-comic text-xl text-red-600">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

      </div>
    </AdminDrawer>
  );
}
