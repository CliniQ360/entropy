import { Navbar } from "./sections/Navbar";
import Hero from "./sections/Hero";
import FeaturesCarousal from "./sections/FeaturesCarousal";
import StepperComponent from "./sections/StepperComponent";
import EmiCalculator from "../../components/EmiCalculator";

function LandingPage() {
  return (
    <main id="bodyMain">
      <Navbar />
      <Hero />
      <EmiCalculator />
      <FeaturesCarousal />
      <StepperComponent />
    </main>
  );
}

export default LandingPage;
