import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useEffect } from "react";
import router from "./Routes";
import { useAuthStore } from "./Stores/authStore";
import { useCartStore } from "./Stores/cartStore";

const queryClient = new QueryClient();

function SyncStores() {
  const user = useAuthStore((state) => state.user);
  const authHydrated = useAuthStore((state) => state._hasHydrated);

  useEffect(() => {
    if (authHydrated) {
      if (user) {
        useCartStore.getState().switchUser(user.id);
      } else {
        useCartStore.getState().switchUser(null);
      }
    }
  }, [authHydrated, user]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SyncStores />
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
