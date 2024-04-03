/** @format */

import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCreateWebsite from "./pages/admin/AdminAddNewWebsite";
import AdminWebsiteList from "./pages/admin/AdminWebsiteList";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        index: true,
        element: <Login />,
      },
      {
        path: "websites",
        element: <AdminWebsiteList />,
      },
      {
        path: "create_new_website",
        element: <AdminCreateWebsite />,
      },
    ],
  },
//   {
//     path: "*",
//     element: <ErrorPage />,
//   },
];

export default routes;
