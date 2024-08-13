/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "alertifyjs/build/css/alertify.css";
import { LoaderProvider } from "./LoaderContext";

const root = ReactDOM.createRoot(document.getElementById("root") );
root.render(
  <ChakraProvider>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </ChakraProvider>
);
