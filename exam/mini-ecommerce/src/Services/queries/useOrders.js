import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/orders");
      return response;
    },
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
