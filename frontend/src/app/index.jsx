import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreditPage from "../pages/CreditPage";
import AssistantHomepage from "../pages/AssistantHomePage";
import ChooseAssistant from "../pages/ChooseAssistantPage";
import DocumentUploadPage from "../pages/DocumentUploadPage";
import PersonalDetailsPage from "../pages/PersonalDetailsPage";
import ProfessionalDetailsPage from "../pages/ProfessionalDetailsPage";
import SelectAAPage from "../pages/SelectAAPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* ASSISTANTROUTING */}
        <Route path="/route-1" element={<AssistantHomepage />} />
        <Route path="/route-2" element={<ChooseAssistant />} />
        <Route path="/route-3" element={<DocumentUploadPage />} />
        <Route path="/credit" element={<CreditPage />}>
          <Route path="personalDetails" element={<PersonalDetailsPage />} />
          <Route
            path="professionalDetails"
            element={<ProfessionalDetailsPage />}
          />
          <Route path="selectAA" element={<SelectAAPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
