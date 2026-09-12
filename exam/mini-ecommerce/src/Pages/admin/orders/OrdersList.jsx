import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminPageHeader from "../../../Components/admin/AdminPageHeader";
import AdminPagination from "../../../Components/admin/AdminPagination";
import { useGetOrders, useUpdateOrderStatus } from "../../../Services/queries/useOrders";
import { useCreateNotification } from "../../../Services/queries/useNotifications";
import { useDebounce } from "../../../Utils/useDebounce";
import { toast } from "sonner";
import OrdersKpi from "./_components/OrdersKpi";
import OrdersActionBar from "./_components/OrdersActionBar";
import OrdersTable from "./_components/OrdersTable";
import OrdersBottomWidgets from "./_components/OrdersBottomWidgets";

export default function OrdersList() {
  const { data: ordersData, isLoading, isError } = useGetOrders();
  const updateStatusMutation = useUpdateOrderStatus();
  const createNotificationMutation = useCreateNotification();
  
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    id: "",
    customer: ""
  });
  
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    if (location.state?.highlightOrderId) {
      const orderId = location.state.highlightOrderId;
      setFilters(prev => ({ ...prev, id: orderId }));
      setActiveTab("all");
      setHighlightId(orderId);
      
      // Xóa state để refresh không bị dính
      window.history.replaceState({}, document.title);

      // Tắt hiệu ứng sau 5 giây
      setTimeout(() => {
        setHighlightId(null);
      }, 5000);
    }
  }, [location.state]);

  const debouncedFilters = useDebounce(filters, 500);

  const orders = useMemo(() => {
    if (!ordersData) return [];
    // Sắp xếp đơn mới nhất lên đầu
    return [...ordersData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [ordersData]);

  // Lọc dữ liệu
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // 1. Lọc theo tab trạng thái
      if (activeTab !== "all" && order.status !== activeTab) return false;
      
      // 2. Lọc theo input debounced
      if (debouncedFilters.id && !order.id.toLowerCase().includes(debouncedFilters.id.toLowerCase())) return false;
      
      if (debouncedFilters.customer) {
        const keyword = debouncedFilters.customer.toLowerCase();
        const matchName = order.customerName.toLowerCase().includes(keyword);
        const matchPhone = order.phone.includes(keyword);
        if (!matchName && !matchPhone) return false;
      }
      
      return true;
    });
  }, [orders, activeTab, debouncedFilters]);

  // Reset trang 1 khi đổi bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, debouncedFilters]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ id: "", customer: "" });
    setActiveTab("all");
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status: newStatus });
      toast.success(`Đã cập nhật trạng thái đơn ${orderId} thành công!`);

      const order = orders.find(o => o.id === orderId);
      if (order && order.userId) {
        await createNotificationMutation.mutateAsync({
          id: "NOTIF-" + Math.floor(Math.random() * 100000),
          userId: String(order.userId),
          role: "customer",
          title: "🚚 Cập Nhật Đơn Hàng",
          message: `Đơn hàng ${orderId} của bạn đã được chuyển sang trạng thái: ${newStatus}.`,
          link: "/profile",
          highlightId: orderId
        });
      }
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại.");
    }
  };

  if (isLoading) return <div className="p-10 text-center font-comic">Đang tải dữ liệu...</div>;
  if (isError) return <div className="p-10 text-center font-comic text-red-500">Có lỗi khi tải dữ liệu.</div>;

  return (
    <div className="flex flex-col w-full pb-16 gap-6">
      <AdminPageHeader
        title="QUẢN LÝ ĐƠN HÀNG & GIAO VẬN MANGA"
        description="Theo dõi và phân luồng đóng gói bọc màng co manga chống va đập góc, in mã vận đơn đối soát tự động và giám sát trạng thái ship COD toàn quốc."
        tagLabel="ĐIỀU PHỐI ĐƠN HÀNG TOÀN QUỐC"
        tagColor="bg-yellow-300 text-black border-black"
        tagIcon="fa-solid fa-bolt"
      />

      <OrdersKpi orders={orders} />
      
      <OrdersActionBar 
        orders={orders} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <OrdersTable 
        orders={currentOrders}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
        onUpdateStatus={handleUpdateStatus}
        highlightId={highlightId}
      />

      {totalPages > 1 && (
        <AdminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      <OrdersBottomWidgets />
    </div>
  );
}
