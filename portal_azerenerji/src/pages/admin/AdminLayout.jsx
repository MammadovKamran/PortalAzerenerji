/** @format */

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
const AdminLayout = () => {
  const location = useLocation().pathname;

  if (location === "/admin" || location === "/admin/") {
  }
  if (location === "") {
    
  } else {
    <NavBar />;
  }

  return (
    <>
      {location === "/admin" || location === "/admin/" ? null : <NavBar />}
      <Outlet />
    </>
  );
};

export default AdminLayout;
