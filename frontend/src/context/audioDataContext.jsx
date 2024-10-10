import React, { createContext, useContext, useState } from "react";
import { offersDump } from "../assets/dump";

const AudioDataContext = createContext();

const AudioContextProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [aaRedirectUrl, setAaRedirectUrl] = useState("");
  const [kycRedirectUrl, setKycRedirectUrl] = useState("");
  const [eMandateRedirectUrl, setEMandateRedirectUrl] = useState("");
  const [offerList, setOfferList] = useState([]);
  const [offerDetails, setOfferDetails] = useState(offersDump);

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
        offerList,
        setOfferList,
        offerDetails,
        setOfferDetails,
      }}
    >
      {children}
    </AudioDataContext.Provider>
  );
};

export { AudioDataContext, AudioContextProvider };
