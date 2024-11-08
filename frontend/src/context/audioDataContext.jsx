import React, { createContext, useContext, useState } from "react";

const AudioDataContext = createContext();

const AudioContextProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [aaRedirectUrl, setAaRedirectUrl] = useState("");
  const [kycRedirectUrl, setKycRedirectUrl] = useState("");
  const [eMandateRedirectUrl, setEMandateRedirectUrl] = useState("");
  const [offerList, setOfferList] = useState([]);
  const [offerDetails, setOfferDetails] = useState([]);
  const [insuranceCustomerRegistration, setInsuranceCustomerRegistration] =
    useState({});
  const [insuranceOfferList, setInsuranceOfferList] = useState([]);
  const [insuranceBuyerForm, setInsuranceBuyerForm] = useState({});
  const [insuranceNomineeForm, setInsuranceNomineeForm] = useState({});

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
        insuranceCustomerRegistration,
        setInsuranceCustomerRegistration,
        insuranceOfferList,
        setInsuranceOfferList,
        insuranceBuyerForm,
        setInsuranceBuyerForm,
        insuranceNomineeForm,
        setInsuranceNomineeForm,
      }}
    >
      {children}
    </AudioDataContext.Provider>
  );
};

export { AudioDataContext, AudioContextProvider };
