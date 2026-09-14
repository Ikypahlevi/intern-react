import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorBoundary from "../Components/common/ErrorBoundary";

import PublicLayout from "../Layouts/PublicLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AdminLayout from "../Layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

const Home = lazy(() => import("../Pages/user/home/Home"));
const Register = lazy(() => import("../Pages/auth/Register"));
const Login = lazy(() => import("../Pages/auth/Login"));
const ProductsList = lazy(() => import("../Pages/user/products/ProductsList"));
const ProductDetail = lazy(() => import("../Pages/user/productDetail/ProductDetail"));

const Cart = lazy(() => import("../Pages/user/cart/Cart"));
const Checkout = lazy(() => import("../Pages/user/checkout/Checkout"));
const CheckoutSuccess = lazy(() => import("../Pages/user/checkout/CheckoutSuccess"));
const Profile = lazy(() => import("../Pages/user/profile/Profile"));
const Contact = lazy(() => import("../Pages/user/contact/Contact"));
const About = lazy(() => import("../Pages/user/about/About"));
const Overview = lazy(() => import("../Pages/admin/overview/Overview"));
const UsersList = lazy(() => import("../Pages/admin/users/UsersList"));
const ProductsListAdmin = lazy(() => import("../Pages/admin/products/ProductsList"));
const OrdersListAdmin = lazy(() => import("../Pages/admin/orders/OrdersList"));
const SettingsAdmin = lazy(() => import("../Pages/admin/settings/Settings"));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full"></div></div>}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <SuspenseWrapper><Home /></SuspenseWrapper> },
      { path: "products", element: <SuspenseWrapper><ProductsList /></SuspenseWrapper> },
      { path: "product/:id", element: <SuspenseWrapper><ProductDetail /></SuspenseWrapper> },
      { path: "about", element: <SuspenseWrapper><About /></SuspenseWrapper> },
      { path: "contact", element: <SuspenseWrapper><Contact /></SuspenseWrapper> },
      {
        path: "cart",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <SuspenseWrapper><Cart /></SuspenseWrapper> }]
      },
      {
        path: "checkout",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <SuspenseWrapper><Checkout /></SuspenseWrapper> }]
      },
      {
        path: "checkout-success",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <SuspenseWrapper><CheckoutSuccess /></SuspenseWrapper> }]
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <SuspenseWrapper><Profile /></SuspenseWrapper> }]
      }
    ]
  },
  {
    path: "/auth",
    element: <GuestRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <SuspenseWrapper><Login /></SuspenseWrapper> },
          { path: "register", element: <SuspenseWrapper><Register /></SuspenseWrapper> }
        ]
      }
    ]
  },
  {
    path: "/admin",
    element: <ProtectedRoute requireAdmin={true} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "", element: <Navigate to="overview" replace /> },
          { path: "overview", element: <SuspenseWrapper><Overview /></SuspenseWrapper> },
          { path: "users", element: <SuspenseWrapper><UsersList /></SuspenseWrapper> },
          { path: "products", element: <SuspenseWrapper><ProductsListAdmin /></SuspenseWrapper> },
          { path: "orders", element: <SuspenseWrapper><OrdersListAdmin /></SuspenseWrapper> },
          { path: "settings", element: <SuspenseWrapper><SettingsAdmin /></SuspenseWrapper> }
        ]
      }
    ]
  }
]);

export default router;
