/**
 * Tính tổng số lượng sản phẩm
 * @param {Array} items - Danh sách sản phẩm (có thuộc tính quantity)
 * @returns {number}
 */
export const calculateTotalQuantity = (items = []) => {
  return items.reduce((total, item) => total + (item.quantity || 0), 0);
};

/**
 * Tính tổng tiền của danh sách sản phẩm
 * @param {Array} items - Danh sách sản phẩm (có price và quantity)
 * @returns {number}
 */
export const calculateSubtotal = (items = []) => {
  return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
};

/**
 * Tính phí giao hàng dựa trên cài đặt và tổng tiền
 * @param {number} subtotal - Tổng tiền tạm tính
 * @param {number} baseFee - Phí ship cơ bản
 * @param {number} freeshipThreshold - Mức miễn phí ship
 * @returns {number}
 */
export const calculateShippingFee = (subtotal, baseFee = 30000, freeshipThreshold = 500000) => {
  if (freeshipThreshold > 0 && subtotal >= freeshipThreshold) {
    return 0;
  }
  return baseFee;
};

/**
 * Tính tổng cộng số tiền phải thanh toán
 * @param {number} subtotal - Tổng tiền tạm tính
 * @param {number} shippingFee - Phí giao hàng
 * @returns {number}
 */
export const calculateTotal = (subtotal, shippingFee) => {
  return subtotal + shippingFee;
};

