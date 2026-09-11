import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      activeUserId: "guest",
      carts: {}, // { 'guest': [], 'user1': [] }
      items: [],
      
      switchUser: (userId) => {
        const targetUserId = userId ? String(userId) : "guest";
        const state = get();
        const currentActive = state.activeUserId;
        
        if (currentActive === targetUserId) return; // No change
        
        let updatedCarts = { ...state.carts };
        let nextItems = [];

        if (targetUserId !== "guest" && currentActive === "guest") {
           // LOGIN SCENARIO: Merge Guest cart into User cart
           const guestItems = state.items;
           const userItems = updatedCarts[targetUserId] || [];
           
           // Merge logic: if same product, sum quantity, else append
           const mergedItems = [...userItems];
           guestItems.forEach(guestItem => {
             const existing = mergedItems.find(item => item.id === guestItem.id);
             if (existing) {
               existing.quantity += guestItem.quantity;
             } else {
               mergedItems.push(guestItem);
             }
           });
           
           nextItems = mergedItems;
           updatedCarts["guest"] = []; 
           updatedCarts[targetUserId] = nextItems;
        } else if (targetUserId === "guest" && currentActive !== "guest") {
           // LOGOUT SCENARIO: Save User cart, load Guest cart
           updatedCarts[currentActive] = state.items;
           updatedCarts["guest"] = []; // Force clear guest cart on logout
           nextItems = [];
        } else {
           // SWITCHING FROM USER TO USER
           updatedCarts[currentActive] = state.items;
           nextItems = updatedCarts[targetUserId] || [];
        }
        
        set({
          activeUserId: targetUserId,
          carts: updatedCarts,
          items: nextItems
        });
      },

      addItem: (product, quantity = 1) => {
        if (quantity < 1) quantity = 1; // Validation
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );

        if (existingItem) {
          const newQty = existingItem.quantity + quantity;
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: newQty > (product.stock || newQty) ? product.stock : newQty }
                : item,
            ),
          });
        } else {
          const safeQty = quantity > (product.stock || quantity) ? product.stock : quantity;
          set({ items: [...currentItems, { ...product, quantity: safeQty }] });
        }
      },
      updateQuantity: (id, quantity) => {
        if (quantity < 1) quantity = 1; // Validation chặn số 0 hoặc âm
        
        set({
          items: get().items.map((item) => {
            if (item.id === id) {
              const safeQty = quantity > (item.stock || quantity) ? item.stock : quantity;
              return { ...item, quantity: safeQty };
            }
            return item;
          }),
        });
      },
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },
      removeItems: (ids) => {
        set({
          items: get().items.filter((item) => !ids.includes(item.id)),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: "ecommerce-cart", // Tên key trong LocalStorage
    },
  ),
);
