/** @format */

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));

  const checkToken = () => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkToken();
    const intervalId = setInterval(checkToken, 10 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    checkToken();
  }, [location]);

  if (!isAuthenticated) {
    return <Navigate to={"/admin"} />;
  }

  return children;
};

export default PrivateRoute;
