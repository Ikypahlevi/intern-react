import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../Stores/authStore";
import api from "../../../Services/api";
import { useGetOrders } from "../../../Services/queries/useOrders";
import ProfileSidebar from "./_components/ProfileSidebar";
import Breadcrumb from "../../../Components/user/Breadcrumb/Breadcrumb";
import ProfileDetails from "./_components/ProfileDetails";
import OrderHistory from "./_components/OrderHistory";

export default function Profile() {
  const { user, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' hoặc 'orders'
  const [loading, setLoading] = useState(true);

  const { data: allOrders } = useGetOrders();
  const userOrders = allOrders ? allOrders.filter(o => String(o.userId) === String(user?.id)) : [];

  useEffect(() => {
    // Fetch dữ liệu user mới nhất khi vào trang
    const fetchLatestData = async () => {
      try {
        if (user?.id) {
          const latestUser = await api.get(`/users/${user.id}`);
          login(latestUser); // Cập nhật lại store
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestData();
  }, [user?.id, login]);

  if (loading || !user) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="font-comic text-2xl animate-pulse">ĐANG KẾT NỐI VỚI HIỆP SĨ ĐOÀN... ⚡</div>
      </main>
    );
  }

  return (
    <>
            <Breadcrumb 
        items={[
          { label: 'TRANG CHỦ', link: '/' },
          { label: 'HỒ SƠ HIỆP SĨ MANGA', icon: '👤' }
        ]} 
      />

      <main className="max-w-7xl mx-auto px-4 mb-16 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái: Sidebar */}
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Cột phải: Content */}
          <section className="lg:col-span-9 space-y-8">
            {activeTab === "profile" && <ProfileDetails user={user} />}
            {activeTab === "orders" && <OrderHistory orders={userOrders} />}
          </section>
        </div>
      </main>
    </>
  );
}

