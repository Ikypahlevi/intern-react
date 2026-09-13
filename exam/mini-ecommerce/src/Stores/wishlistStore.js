import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const { items } = get();
        const existingIndex = items.findIndex((item) => item.id === product.id);

        if (existingIndex >= 0) {
          // Remove
          set({ items: items.filter((item) => item.id !== product.id) });
          toast.success("Đã xóa khỏi danh sách yêu thích!");
        } else {
          // Add
          set({ items: [...items, product] });
          toast.success("Đã thêm vào danh sách yêu thích! ❤️");
        }
      },
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },
    }),
    {
      name: "wishlist-storage",
    }
  )
);
