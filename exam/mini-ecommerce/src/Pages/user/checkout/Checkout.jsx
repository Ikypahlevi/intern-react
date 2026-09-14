import React, { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../../../Validations/checkoutSchema";
import { useCartStore } from "../../../Stores/cartStore";
import { useAuthStore } from "../../../Stores/authStore";
import api from "../../../Services/api";
import { useCreateOrder } from "../../../Services/queries/useOrders";
import { useCreateNotification } from "../../../Services/queries/useNotifications";
import { useGetSettings } from "../../../Services/queries/useSettings";
import CheckoutForm from "./_components/CheckoutForm";
import CheckoutSummary from "./_components/CheckoutSummary";
import Breadcrumb from "../../../Components/user/Breadcrumb/Breadcrumb";
import { toast } from "sonner";
import ConfirmModal from "../../../Components/admin/ConfirmModal";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, removeItems } = useCartStore();
  const { user, logout } = useAuthStore(); 
  const createOrderMutation = useCreateOrder();
  const createNotificationMutation = useCreateNotification();

  const selectedIds = location.state?.selectedIds || items.map(item => item.id);
  const checkoutItems = useMemo(() => items.filter(item => selectedIds.includes(item.id)), [items, selectedIds]);

  const { data: dbSettings, isLoading: isSettingsLoading } = useGetSettings();

  const totalAmount = useMemo(() => 
    checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0),
  [checkoutItems]);

  const freeshipThreshold = dbSettings?.shipping?.freeshipThreshold || 0;
  const baseShippingFee = dbSettings?.shipping?.baseFee !== undefined ? dbSettings.shipping.baseFee : 30000;
  const shippingFee = calculateShippingFee(totalAmount, baseShippingFee, freeshipThreshold);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Sync initial payment method with settings
  React.useEffect(() => {
    if (dbSettings?.payments) {
       const p = paymentMethod.toLowerCase();
       if (!dbSettings.payments[p]) {
         const activeMethod = Object.entries(dbSettings.payments).find(([_, val]) => val)?.[0];
         if (activeMethod) {
            setPaymentMethod(activeMethod.toUpperCase());
         }
       }
    }
  }, [dbSettings, paymentMethod]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "VN",
      street: "",
      city: "HCM",
      district: "",
      phone: "",
      email: user?.email || "",
      notes: ""
    }
  });

    const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState(null);

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

    const onSubmit = async (data) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      return;
    }
    setPendingData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirmOrder = async () => {
    if (!pendingData) return;
    const data = pendingData;
    if (!user) {
      toast.error("Vui lòng đăng nhập để tiếp tục!");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // SECURITY CHECK: Verify user is not locked
      const userData = await api.get(`/users/${user.id}`);
      if (userData.status === "locked") {
        toast.error("Tài khoản của bạn đã bị khóa! Không thể đặt hàng.");
        logout();
        navigate("/login");
        return;
      }

      const newOrder = {
        id: "SWOO-" + Math.floor(Math.random() * 100000),
        userId: String(user.id),
        customerName: (data.firstName + " " + data.lastName).trim(),
        phone: data.phone,
        address: data.street + ", " + data.district + ", " + data.city,
        items: checkoutItems.map(item => ({
          productId: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: calculateTotal(totalAmount, shippingFee),
        paymentMethod: paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      await createOrderMutation.mutateAsync(newOrder);

      await createNotificationMutation.mutateAsync({
        id: "NOTIF-" + Math.floor(Math.random() * 100000),
        role: "admin",
        title: "📦 Đơn Hàng Mới",
        message: `Đơn hàng ${newOrder.id} vừa được đặt thành công.`,
        link: "/admin/orders",
        highlightId: newOrder.id
      });

      removeItems(selectedIds);

      navigate("/checkout-success", { state: { orderId: newOrder.id } });

    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
            <Breadcrumb 
        items={[
          { label: 'TRANG CHỦ', link: '/' },
          { label: 'GIỎ HÀNG', link: '/cart' },
          { label: 'CHECKOUT / THANH TOÁN', icon: '💳' }
        ]} 
      />

      <main className="max-w-7xl mx-auto px-4 mb-16 w-full flex-grow">
              <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmOrder}
        title="XÁC NHẬN ĐẶT HÀNG"
        message={`Bạn đang chuẩn bị đặt ${checkoutItems.length} sản phẩm với tổng thanh toán là ${(totalAmount + shippingFee).toLocaleString()}đ. Bạn có chắc chắn muốn tiến hành đặt hàng?`}
        confirmText="XÁC NHẬN ĐẶT HÀNG"
        cancelText="KIỂM TRA LẠI"
        isDanger={false}
      />

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm register={register} errors={errors} />
          </div>

          <div className="lg:col-span-5 h-full">
            <CheckoutSummary 
              items={checkoutItems}
              totalAmount={totalAmount}
              shippingFee={shippingFee}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </main>
    </>
  );
}





