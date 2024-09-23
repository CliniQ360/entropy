import React, { createContext, useContext, useState } from "react";

const AudioDataContext = createContext();

const AudioContextProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState({});

  return (
    <AudioDataContext.Provider
      value={{
        customerDetails,
        setCustomerDetails,
      }}
    >
      {children}
    </AudioDataContext.Provider>
  );
};

export { AudioDataContext, AudioContextProvider };
