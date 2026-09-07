import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../productService";

// Hook lấy danh sách sản phẩm
export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });
};

// Hook lấy chi tiết sản phẩm
export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getById(id),
    enabled: !!id, // Chỉ gọi API khi có id
  });
};

// Hook thêm sản phẩm (Dành cho admin)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      // Làm mới lại danh sách sản phẩm sau khi thêm thành công
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Hook sửa sản phẩm
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Hook xóa sản phẩm
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
