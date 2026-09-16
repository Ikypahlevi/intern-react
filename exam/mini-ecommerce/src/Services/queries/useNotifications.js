import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get("/notifications?_sort=createdAt&_order=desc");
      return Array.isArray(response) ? response : (response?.data || []);
    },
    refetchInterval: 3000, // Tự động gọi lại mỗi 3 giây để mô phỏng Real-time
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newNotif) => {
      const response = await api.post("/notifications", {
        ...newNotif,
        isRead: false,
        createdAt: new Date().toISOString()
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.patch(`/notifications/${id}`, { isRead: true });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids) => {
      const updates = ids.map(id => api.patch(`/notifications/${id}`, { isRead: true }));
      await Promise.all(updates);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
