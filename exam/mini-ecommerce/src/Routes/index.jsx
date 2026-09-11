import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AdminLayout from "../Layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import Home from "../Pages/user/home/Home";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";
import ProductsList from "../Pages/user/products/ProductsList";
import ProductDetail from "../Pages/user/productDetail/ProductDetail";

import Cart from "../Pages/user/cart/Cart";
import Checkout from "../Pages/user/checkout/Checkout";
import CheckoutSuccess from "../Pages/user/checkout/CheckoutSuccess";
import Profile from "../Pages/user/profile/Profile";
import Contact from "../Pages/user/contact/Contact";
import About from "../Pages/user/about/About";
import Overview from "../Pages/admin/overview/Overview";
import UsersList from "../Pages/admin/users/UsersList";
import ProductsListAdmin from "../Pages/admin/products/ProductsList";
import OrdersListAdmin from "../Pages/admin/orders/OrdersList";
import SettingsAdmin from "../Pages/admin/settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductsList />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Cart />,
          }
        ]
      },
      {
        path: "checkout",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Checkout />,
          }
        ]
      },
      {
        path: "checkout-success",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <CheckoutSuccess />,
          }
        ]
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Profile />,
          }
        ]
      }
    ],
  },
  {
    path: "/auth",
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          }
        ]
      }
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute requireAdmin={true} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="overview" replace />
          },
          {
            path: "overview",
            element: <Overview />
          },
          {
            path: "users",
            element: <UsersList />
          },
          {
            path: "products",
            element: <ProductsListAdmin />
          },
          {
            path: "orders",
            element: <OrdersListAdmin />
          },
          {
            path: "settings",
            element: <SettingsAdmin />
          }
        ]
      }
    ],
  },
]);

export default router;
