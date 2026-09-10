import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./cartStore";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      login: (userData) => {
        set({ user: userData, isAuthenticated: true });
        useCartStore.getState().switchUser(userData.id);
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        useCartStore.getState().switchUser(null);
      },
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        // Sau khi đọc xong localStorage, đánh dấu là đã hydrate xong
        state?.setHasHydrated(true);
        // Đồng bộ giỏ hàng với trạng thái user hiện tại
        if (state?.user) {
          useCartStore.getState().switchUser(state.user.id);
        } else {
          useCartStore.getState().switchUser(null);
        }
      },
    }
  )
);
