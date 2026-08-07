const currentUser = { id: 101, name: "Bình", isVIP: true };
const currentCart = ["Áo thun", "Quần Jeans"];

// 1. Điền toán tử gì vào trước 'newItems' để gom các tham số dư thừa?
function processCheckout(user, cart, ...newItems) {
  // 2. Dùng Spread để gộp mảng 'cart' và mảng 'newItems' thành một mảng mới
  const finalCart = [...cart, ...newItems];

  // 3. Dùng Spread để copy 'user' và nhét thêm 'finalCart' vào hóa đơn
  const copyUser = { ...currentUser };
  const receipt = {
    user: copyUser,
    items: finalCart,
  };

  return receipt;
}

// GỌI HÀM CHẠY THỬ
// Khách hàng Bình có giỏ hàng cũ, và tiện tay mua thêm 3 món: 'Tất', 'Mũ', 'Kính'
const result = processCheckout(currentUser, currentCart, "Tất", "Mũ", "Kính");

console.log(result);
