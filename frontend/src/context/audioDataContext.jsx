import React, { createContext, useContext, useState } from "react";

const AudioDataContext = createContext();

const AudioContextProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [aaRedirectUrl, setAaRedirectUrl] = useState("");
  const [kycRedirectUrl, setKycRedirectUrl] = useState("");

  return (
    <AudioDataContext.Provider
      value={{
        customerDetails,
        setCustomerDetails,
        aaRedirectUrl,
        setAaRedirectUrl,
        kycRedirectUrl,
        setKycRedirectUrl,
      }}
    >
      {children}
    </AudioDataContext.Provider>
  );
};

export { AudioDataContext, AudioContextProvider };
