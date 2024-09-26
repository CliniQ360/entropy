import React, { createContext, useContext, useState } from "react";

const AudioDataContext = createContext();

const AudioContextProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [aaRedirectUrl, setAaRedirectUrl] = useState("");
  const [kycRedirectUrl, setKycRedirectUrl] = useState("");
  const [eMandateRedirectUrl, setEMandateRedirectUrl] = useState("");

  return (
    <AudioDataContext.Provider
      value={{
        customerDetails,
        setCustomerDetails,
        aaRedirectUrl,
        setAaRedirectUrl,
        kycRedirectUrl,
        setKycRedirectUrl,
        eMandateRedirectUrl,
        setEMandateRedirectUrl,
      }}
    >
      {children}
    </AudioDataContext.Provider>
  );
};

export { AudioDataContext, AudioContextProvider };
