import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreditPage from "../pages/CreditPage";
import AssistantHomepage from "../pages/AssistantHomePage";
import ChooseAssistant from "../pages/ChooseAssistantPage";
import DocumentUploadPage from "../pages/DocumentUploadPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/credit" element={<CreditPage />} />
        {/* ASSISTANTROUTING */}
        <Route path="/route-1" element={<AssistantHomepage />} />
        <Route path="/route-2" element={<ChooseAssistant />} />
        <Route path="/route-3" element={<DocumentUploadPage />} />
      </Routes>
    </div>
  );
}

export default App;
