import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/orders");
      return response;
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newOrder) => {
      const response = await api.post(/orders, newOrder);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    }
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const response = await api.patch(/orders/${orderId}, { status });
      return response;
    },
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["orders"], (old) => {
        return old ? old.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)) : old;
      });
    },
  });
};
