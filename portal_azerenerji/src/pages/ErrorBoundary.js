/** @format */

import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <>
      <main style={{ height: "100vh", textAlign: "center" }}>
        <h1 style={{ paddingTop: "20%" }}>
          {error.status} - {error.statusText}
        </h1>
      </main>
    </>
  );
};

export default ErrorBoundary;
