export const isOrderCountedInRevenue = (order) => {
  if (order.status === 'cancelled') return false;

  const isOnlinePayment = order.paymentMethod === 'ONLINE' || 
                          order.paymentMethod === 'MOMO' || 
                          order.paymentMethod === 'VNPAY';
                          
  if (isOnlinePayment) {
    return true;
  }

  return order.status === 'completed' || order.status === 'delivered';
};
