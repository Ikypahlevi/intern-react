import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { toast } from "sonner";

export const useGetSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await api.get("/settings");
      return response;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedSettings) => {
      // json-server supports PATCH on object-based root keys
      const response = await api.patch("/settings", updatedSettings);
      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["settings"], data);
      toast.success("Đã cập nhật cấu hình hệ thống thành công!");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi lưu cấu hình!");
    },
  });
};
