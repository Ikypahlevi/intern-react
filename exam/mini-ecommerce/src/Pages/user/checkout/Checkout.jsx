import React, { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../../../Stores/cartStore";
import { useAuthStore } from "../../../Stores/authStore";
import api from "../../../Services/api";
import CheckoutForm from "./_components/CheckoutForm";
import CheckoutSummary from "./_components/CheckoutSummary";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, removeItem } = useCartStore();
  const { user, login } = useAuthStore(); // login để cập nhật lại thông tin user trong store nếu cần

  // Lấy danh sách ID sản phẩm được chọn từ giỏ hàng (truyền qua state)
  const selectedIds = location.state?.selectedIds || items.map(item => item.id);
  const checkoutItems = useMemo(() => items.filter(item => selectedIds.includes(item.id)), [items, selectedIds]);

  const totalAmount = useMemo(() => 
    checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0),
  [checkoutItems]);

  const shippingFee = 30000; // Cố định 30k giao tiêu chuẩn

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "VN",
    street: "",
    city: "HCM",
    district: "",
    phone: "",
    email: user?.email || "",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Nếu không có sản phẩm nào để thanh toán
  if (checkoutItems.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="bg-white rounded-2xl comic-border shadow-comic-lg p-10 text-center max-w-lg w-full">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-comic text-3xl text-stone-900 mb-3">KHÔNG CÓ SẢN PHẨM</h2>
          <p className="font-bubble text-stone-600 font-bold mb-6">
            Bạn chưa chọn sản phẩm nào để thanh toán. Vui lòng quay lại giỏ hàng!
          </p>
          <Link to="/cart" className="inline-block bg-comic-yellow text-stone-900 font-comic text-xl px-8 py-3 comic-border shadow-comic hover:bg-stone-900 hover:text-white transition-colors">
            QUAY VỀ GIỎ HÀNG
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Vui lòng đăng nhập để tiếp tục!");
      return;
    }

    // Validate cơ bản
    if (!formData.firstName || !formData.lastName || !formData.street || !formData.phone || !formData.email) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Tạo object đơn hàng mới theo đúng chuẩn db.json
      const newOrder = {
        id: `SWOO-${Math.floor(Math.random() * 100000)}`,
        userId: String(user.id),
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        address: `${formData.street}, ${formData.district}, ${formData.city}`,
        items: checkoutItems.map(item => ({
          productId: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: totalAmount + shippingFee,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      // Push to /orders
      await api.post('/orders', newOrder);

      // Xóa các sản phẩm đã thanh toán khỏi giỏ hàng
      selectedIds.forEach(id => removeItem(id));

      // Hiển thị thông báo và chuyển hướng sang trang Success
      navigate("/checkout-success", { state: { orderId: newOrder.id } });

    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 w-full text-xs">
        <nav className="inline-flex items-center space-x-2 bg-white comic-border shadow-comic-sm px-4 py-1.5 rounded-lg font-bubble font-bold text-sm">
          <Link to="/" className="hover:text-comic-red text-stone-800">TRANG CHỦ</Link>
          <span className="text-comic-red font-black">&gt;</span>
          <Link to="/cart" className="hover:text-comic-red text-stone-800">GIỎ HÀNG</Link>
          <span className="text-comic-red font-black">&gt;</span>
          <span className="text-comic-red uppercase bg-yellow-200 px-1.5 py-0.5 rounded border border-black">CHECKOUT / THANH TOÁN</span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 mb-16 w-full flex-grow">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái: Form */}
          <div className="lg:col-span-7">
            <CheckoutForm formData={formData} setFormData={setFormData} />
          </div>

          {/* Cột phải: Summary */}
          <div className="lg:col-span-5 h-full">
            <CheckoutSummary 
              items={checkoutItems}
              totalAmount={totalAmount}
              shippingFee={shippingFee}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </main>
    </>
  );
}
