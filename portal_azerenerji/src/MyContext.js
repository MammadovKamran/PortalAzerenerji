/** @format */

import React, { createContext, useState } from "react";

// Context oluşturun
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [reload, setReload] = useState(false);


  return <MyContext.Provider value={{ reload, setReload }}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };
