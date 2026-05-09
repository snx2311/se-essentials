import { Layout } from "@/components/Layout";
import { LoadingScreen } from "@/components/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy page imports
const Home = lazy(() => import("@/pages/Home"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Orders = lazy(() => import("@/pages/Orders"));
const OrderDetail = lazy(() => import("@/pages/OrderDetail"));
const Profile = lazy(() => import("@/pages/Profile"));
const Membership = lazy(() => import("@/pages/Membership"));

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetail,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: Checkout,
});
const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: Wishlist,
});
const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: Orders,
});
const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: OrderDetail,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});
const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/membership",
  component: Membership,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productRoute,
  checkoutRoute,
  wishlistRoute,
  ordersRoute,
  orderDetailRoute,
  profileRoute,
  membershipRoute,
]);

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
