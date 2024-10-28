import { configureStore } from "@reduxjs/toolkit";
import landingPageReducer from "../pages/LandingPage/sections/landingPage.slice";
import initiateJourneyReducer from "../pages/InitiateJourneyPage/initiateJourney.slice";

export default configureStore({
  reducer: {
    contactUser: landingPageReducer,
    initateJourney: initiateJourneyReducer,
  },
});
