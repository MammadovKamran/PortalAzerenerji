/** @format */

import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
const AdminLayout = () => {
  const location = useLocation();
  const [user, setUser] = useState({
    username: "kamran",
  });
  return (
    <>
      {location.pathname.includes("admin/websites") || location.pathname.includes("admin/create_new_website") ? <NavBar /> : null}
      <Outlet context={{ user, setUser }} />
    </>
  );
};

export default AdminLayout;
