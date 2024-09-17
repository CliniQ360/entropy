import React from "react";
import InputSlider from "../slider";

const LeftSection = ({ state, dispatch }) => {
  return (
    <div>
      <InputSlider
        state={state}
        dispatch={dispatch}
        title="Loan Amount"
        max={5000000}
        step={20000}
        min={20000}
        minLabel="20K"
        maxLabel="50L"
        type="principal"
        value={state.principal}
      />
      <InputSlider
        state={state}
        dispatch={dispatch}
        type="rateOfInterest"
        title="Interest Rate"
        max={15}
        step={0.1}
        min={0.1}
        minLabel="0.1%"
        maxLabel="15%"
        value={state.roi}
      />
      <InputSlider
        state={state}
        dispatch={dispatch}
        type="loanTenure"
        title="Loan Term (Years)"
        min={0.5}
        step={0.5}
        max={30}
        minLabel="0.5Y"
        maxLabel="30Y"
        value={state.tenure}
      />
    </div>
  );
};

export default LeftSection;
