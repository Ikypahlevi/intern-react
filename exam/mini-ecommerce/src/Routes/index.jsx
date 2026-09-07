import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layouts/PublicLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AdminLayout from "../Layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import Home from "../Pages/home/Home";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";
import ProductsList from "../Pages/products/ProductsList";
import ProductDetail from "../Pages/productDetail/ProductDetail";

import Cart from "../Pages/cart/Cart";
import Checkout from "../Pages/checkout/Checkout";
import CheckoutSuccess from "../Pages/checkout/CheckoutSuccess";
import Profile from "../Pages/profile/Profile";

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
          // TODO: Thêm trang quản lý sản phẩm, tài khoản
        ]
      }
    ],
  },
]);

export default router;
