import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../../Stores/authStore";
import api from "../../../Services/api";
import { useGetOrders } from "../../../Services/queries/useOrders";
import ProfileSidebar from "./_components/ProfileSidebar";
import Breadcrumb from "../../../Components/user/Breadcrumb/Breadcrumb";
import ProfileDetails from "./_components/ProfileDetails";
import OrderHistory from "./_components/OrderHistory";
import WishlistTab from "./_components/WishlistTab";

export default function Profile() {
  const { user, login } = useAuthStore();
    const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(defaultTab); // 'profile' hoặc 'orders'
  const [loading, setLoading] = useState(true);

  const { data: allOrders, isLoading: ordersLoading, isError: ordersError } = useGetOrders();
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
  }, [user?.id]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center font-comic text-2xl text-stone-500 animate-pulse">ĐANG TẢI HỒ SƠ...</div>;
  }

  return (
    <>
      <Breadcrumb 
        items={[
          { label: 'TRANG CHỦ', link: '/' },
          { label: 'TÀI KHOẢN', icon: '👤' }
        ]} 
      />

      <main className="max-w-7xl mx-auto px-4 mt-6 mb-16 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="lg:col-span-9 space-y-6">
            {activeTab === 'profile' && <ProfileDetails user={user} />}
            {activeTab === 'orders' && (
              ordersLoading ? (
                <div className="bg-white border-[3px] border-black shadow-comic p-10 text-center font-comic animate-pulse">
                  ĐANG TẢI LỊCH SỬ...
                </div>
              ) : ordersError ? (
                <div className="bg-white border-[3px] border-black shadow-comic p-10 text-center font-comic text-comic-red">
                  ỐI! LỖI TẢI DỮ LIỆU.
                </div>
              ) : (
                <OrderHistory orders={userOrders} />
              )
            )}
            {activeTab === 'wishlist' && <WishlistTab />}
          </div>
        </div>
      </main>
    </>
  );
}

