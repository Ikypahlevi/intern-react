import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await api.get("/notifications?_sort=createdAt&_order=desc");
      return data;
    },
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newNotif) => {
      const { data } = await api.post("/notifications", {
        ...newNotif,
        isRead: false,
        createdAt: new Date().toISOString()
      });
      return data;
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
      const { data } = await api.patch(`/notifications/${id}`, { isRead: true });
      return data;
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
