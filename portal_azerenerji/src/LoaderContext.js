/** @format */

import React, { createContext, useState } from "react";

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [reload, setReload] = useState(false);

return <LoaderContext.Provider value={{ reload, setReload }}>{children}</LoaderContext.Provider>;
};

export { LoaderContext, LoaderProvider };