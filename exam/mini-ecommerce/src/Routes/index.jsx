import { createBrowserRouter, Navigate } from "react-router-dom";
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
import Contact from "../Pages/contact/Contact";
import About from "../Pages/about/About";
import Overview from "../Pages/admin/overview/Overview";
import UsersList from "../Pages/admin/users/UsersList";

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
          }
        ]
      }
    ],
  },
]);

export default router;
