import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../views/dashboard";
import Users from "../views/users";
import Products from "../views/products";
import Settings from "../views/settings";
import NotFound from "../views/NotFound";
import Table from "../views/table";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    handle: { breadcrumb: "Trang chủ" },
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard />, handle: { breadcrumb: "Dashboard" } },
      { path: "table", element: <Table />, handle: { breadcrumb: "Bảng" } },
      { path: "users", element: <Users />, handle: { breadcrumb: "Người dùng" } },
      { path: "products", element: <Products />, handle: { breadcrumb: "Sản phẩm" } },
      { path: "settings", element: <Settings />, handle: { breadcrumb: "Cài đặt" } },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;