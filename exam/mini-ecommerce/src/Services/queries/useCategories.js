import { useQuery } from "@tanstack/react-query";
import api from "../api";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/categories");
      return response;
    }
  });
};
