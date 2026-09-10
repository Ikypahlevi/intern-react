import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/orders");
      return response;
    },
    // Tự động fetch lại mỗi 5 giây để đồng bộ real-time
    refetchInterval: 5000,
    // Tạm dừng fetch nếu chuyển sang tab khác để tiết kiệm tài nguyên
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await api.patch(`/orders/${orderId}`, { status });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};
