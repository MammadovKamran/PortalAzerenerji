/** @format */

import { Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute"; // Özel rotayı içe aktarın veya oluşturun
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCreateWebsite from "./pages/admin/AdminCreateWebsite";
import AdminWebsiteList from "./pages/admin/AdminWebsiteList";

const routes = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/", // Ana dizin
        element: <Navigate to="/admin/login" />, // Otomatik olarak /admin/login'e yönlendir
      },
      {
        path: "login", // Giriş yapma sayfası
        element: <Login />,
      },
      {
        path: "websites",
        element: <PrivateRoute element={<AdminWebsiteList />} />, // Özel rotaya sarma
      },
      {
        path: "create_new_website",
        element: <PrivateRoute element={<AdminCreateWebsite />} />, // Özel rotaya sarma
      },
    ],
  },
];

export default routes;
