import LandingPage from "../pages/LandingPage";
import { Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Route path="/" element={<LandingPage />} />
      {/* ASSISTANTROUTING */}
      <Route path="/route-1" element={<AssistantHomepage />} />
      <Route path="/route-2" element={<ChooseAssistant />} />

      <Route path="/credit" element={<CreditPage />}>
        <Route path="personalDetails" element={<PersonalDetailsPage />} />
        <Route
          path="professionalDetails"
          element={<ProfessionalDetailsPage />}
        />
        <Route path="selectAA" element={<SelectAAPage />} />
        <Route path="availableOffers" element={<AvailableOffersPage />} />
        <Route path="route-3" element={<DocumentUploadPage />} />
        <Route path="route-4" element={<KYCPage />} />
        <Route path="route-5" element={<BankDetailsPage />} />
        <Route path="route-6" element={<EmandatePage />} />
        <Route path="route-7" element={<CreditOfferPage />} />
        <Route path="route-8" element={<PreviewDocumentPage />} />
      </Route>
    </div>
  );
}

export default App;
