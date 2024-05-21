/** @format */
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCreateWebsite from "./pages/admin/AdminAddNewWebsite";
import AdminWebsiteList from "./pages/admin/AdminWebsiteList";
import ErrorBoundary from "./pages/ErrorBoundary";
import PrivateRoute from "./pages/Auth/PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "websites",
        element: (
          <PrivateRoute>
            <AdminWebsiteList />
          </PrivateRoute>
        ),
      },
      {
        path: "create_new_website",
        element: (
          <PrivateRoute>
            <AdminCreateWebsite />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
