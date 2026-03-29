import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { AssistantPage } from "./pages/AssistantPage";
import { ComparePage } from "./pages/ComparePage";
import { LoginPage } from "./pages/LoginPage";
import { MarketplacePage } from "./pages/MarketplacePage";

export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("pricehunt_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [cartCount, setCartCount] = useState(0);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("pricehunt_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pricehunt_user");
  };

  const rootRoute = createRootRoute();

  const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <LoginPage onLogin={login} user={user} />,
  });

  const compareRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/compare",
    component: () => (
      <ComparePage user={user} onLogout={logout} cartCount={cartCount} />
    ),
  });

  const marketplaceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/marketplace",
    component: () => (
      <MarketplacePage
        user={user}
        onLogout={logout}
        cartCount={cartCount}
        onAddToCart={() => setCartCount((c) => c + 1)}
      />
    ),
  });

  const assistantRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/assistant",
    component: () => (
      <AssistantPage user={user} onLogout={logout} cartCount={cartCount} />
    ),
  });

  const routeTree = rootRoute.addChildren([
    loginRoute,
    compareRoute,
    marketplaceRoute,
    assistantRoute,
  ]);

  const router = createRouter({
    routeTree,
    history: createHashHistory(),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
