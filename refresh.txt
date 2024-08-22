/** @format */

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    const currentTime = Date.now() / 1000;
    console.log("Token Expiration Time:", new Date(decoded.exp * 1000).toLocaleString());
    console.log("Current Time:", new Date(currentTime * 1000).toLocaleString());
    return decoded.exp > currentTime;
  } catch (e) {
    console.error("Error decoding token:", e);
    return false;
  }
};

const refreshToken = async () => {
  try {
    const response = await fetch("http://10.10.12.45:8081/api/v1/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: Cookies.get("id"),
        token: Cookies.get("refreshToken"),
      }),
    });

    const data = await response.json();
    if (response.ok && data.token) {
      Cookies.set("token", data.token, { expires: 1 });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Token refresh error:", error);
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = async () => {
    const token = Cookies.get("token");

    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      const success = await refreshToken();
      if (success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, [location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PrivateRoute;
