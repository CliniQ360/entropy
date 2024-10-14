import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreditPage from "../pages/CreditPage";
import AssistantHomepage from "../pages/AssistantHomePage";
import ChooseAssistant from "../pages/ChooseAssistantPage";
import DocumentUploadPage from "../pages/DocumentUploadPage";
import KYCPage from "../pages/KYCPage";
import BankDetailsPage from "../pages/BankDetailsPage";
import EmandatePage from "../pages/eMandatePage";
import PersonalDetailsPage from "../pages/PersonalDetailsPage";
import ProfessionalDetailsPage from "../pages/ProfessionalDetailsPage";
import SelectAAPage from "../pages/SelectAAPage";
import CreditOfferPage from "../pages/CreditOfferDetail";
import AvailableOffersPage from "../pages/OfferPage";
import PreviewDocumentPage from "../pages/PreviewDocumentPage";
import CustomizeOfferPage from "../pages/customizeOffer";
import InsuranceOfferPage from "../pages/InsuranceOfferPage";
import InsuranceRegistration from "../pages/InsuranceRegistration";
import InsurancePage from "../pages/InsurancePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* ASSISTANTROUTING */}
        <Route path="/route-1" element={<AssistantHomepage />} />
        <Route path="/route-2" element={<ChooseAssistant />} />

        <Route path="/credit" element={<CreditPage />}>
          <Route path="personal-Detail" element={<PersonalDetailsPage />} />
          <Route
            path="professionalDetails"
            element={<ProfessionalDetailsPage />}
          />
          <Route path="selectAA" element={<SelectAAPage />} />
          <Route path="availableOffers" element={<AvailableOffersPage />} />
          <Route path="customize-offers" element={<CustomizeOfferPage />} />
          <Route path="route-3" element={<DocumentUploadPage />} />
          <Route path="kyc-page" element={<KYCPage />} />
          <Route path="account-details" element={<BankDetailsPage />} />
          <Route path="emandate-page" element={<EmandatePage />} />
          <Route path="offer-page" element={<CreditOfferPage />} />
          <Route path="preview-offer" element={<PreviewDocumentPage />} />
        </Route>
        <Route path="/insurance" element={<InsurancePage />}>
          <Route path="register" element={<InsuranceRegistration />} />
          <Route path="offers" element={<InsuranceOfferPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
