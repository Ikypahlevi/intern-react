import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../userService";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
