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
import BuyerFormPage from "../pages/BuyerFormPage";
import NomineeFormPage from "../pages/NomineePage";
import WelcomePage from "../pages/WelcomePage";
import ServiceInfoPage from "../pages/ServiceInfoPage";
import InitiateJourneyPage from "../pages/InitiateJourneyPage";
import EligibilityCriteriaPage from "../pages/EligibilityCriteriaPage";
import FamilySelectionPage from "../pages/FamilySelectionPage";
import DocumentUploadPageInsurance from "../pages/DocumentUploadPageForInsurance";
import CustomizeInsurancePage from "../pages/CustomizeInsurancePage";
import InsuranceKYCPage from "../pages/InsuranceKYCPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/eligibility-criteria"
          element={<EligibilityCriteriaPage />}
        />
        <Route path="/service-info" element={<ServiceInfoPage />} />
        <Route path="/initiate-journey" element={<InitiateJourneyPage />} />
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
          <Route path="document-upload" element={<DocumentUploadPage />} />
          <Route path="kyc-page" element={<KYCPage />} />
          <Route path="account-details" element={<BankDetailsPage />} />
          <Route path="emandate-page" element={<EmandatePage />} />
          <Route path="offer-page" element={<CreditOfferPage />} />
          <Route path="preview-offer" element={<PreviewDocumentPage />} />
        </Route>
        <Route path="/insurance" element={<InsurancePage />}>
          <Route
            path="document-upload"
            element={<DocumentUploadPageInsurance />}
          />
          <Route path="register" element={<InsuranceRegistration />} />
          <Route path="selection" element={<FamilySelectionPage />} />
          <Route path="offers" element={<InsuranceOfferPage />} />
          <Route path="buyer-form" element={<BuyerFormPage />} />
          <Route path="nominee-form" element={<NomineeFormPage />} />
          <Route path="insurance-offer" element={<NomineeFormPage />} />
          <Route
            path="customize-insurance-offer"
            element={<CustomizeInsurancePage />}
          />
          <Route path="insurance-kyc" element={<InsuranceKYCPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
