import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreditPage from "../pages/CreditPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/credit" element={<CreditPage />} />
      </Routes>
    </div>
  );
}

export default App;
