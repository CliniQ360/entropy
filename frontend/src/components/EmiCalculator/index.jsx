import { useReducer, useState } from "react";
import { appReducer } from "./appReducer";
import LeftSection from "./leftSection";
import RightSection from "./rightSection";
import "./emiCalculator.css";

export default function EmiCalculator() {
  const initialState = {
    principal: 1000000,
    tenure: 5,
    roi: 9,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <LeftSection state={state} dispatch={dispatch} />
        <RightSection state={state} />
      </div>
    </div>
  );
}
