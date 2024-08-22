/** @format */

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
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
        } catch {
          return false;
        }
      };

      const refreshToken = async () => {
        try {
          const response = await fetch("http://10.10.12.45:8081/api/v1/auth/refresh-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          });
          const data = await response.json();
          if (response.ok && data.refreshToken) {
            Cookies.set("token", data.refreshToken);
            return true;
          }
          return false;
        } catch {
          return false;
        }
      };

      try {
        const token = Cookies.get("token");

        if (token && isTokenValid(token)) {
          setIsAuthenticated(true);
        } else {
          const refreshed = await refreshToken();
          setIsAuthenticated(refreshed);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    return <Navigate to="/admin" replace />;
  };

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return handleLogout();
  }

  return isAuthenticated ? children : handleLogout();
};

export default PrivateRoute;
