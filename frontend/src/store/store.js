import { configureStore } from "@reduxjs/toolkit";
import landingPageReducer from "../pages/LandingPage/sections/landingPage.slice";

export default configureStore({
  reducer: {
    contactUser: landingPageReducer,
  },
});
