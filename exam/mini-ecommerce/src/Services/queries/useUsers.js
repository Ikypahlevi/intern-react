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
    onSuccess: (newUser) => {
      // Cập nhật trực tiếp vào cache để UI mượt mà
      queryClient.setQueryData(["users"], (old) => {
        return old ? [...old, newUser] : [newUser];
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => userService.update(id, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (old) => {
        return old ? old.map((u) => (u.id === updatedUser.id ? updatedUser : u)) : old;
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.delete,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["users"], (old) => {
        return old ? old.filter((u) => u.id !== deletedId) : old;
      });
    },
  });
};
