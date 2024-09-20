import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/index";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/store";
import { MediaContextProvider } from "./context/mediaContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <MediaContextProvider>
          <App />
        </MediaContextProvider>
      </Router>
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
