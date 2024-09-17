import { calculateEmi, calculateInterest } from "../helpers";
import ChartFooter from "./chartFooter";
import EmiChart from "./emiChart";
import "./rightSection.css";

const RightSection = ({ state }) => {
  const { principal, roi, tenure } = state;

  const emi = calculateEmi({ principal, roi, tenure });

  const interestPayable = calculateInterest({ emi, tenure, principal });

  return (
    <div className="rightsection-wrapper">
      <EmiChart principal={principal} interestPayable={interestPayable} />

      <ChartFooter
        emi={emi}
        principal={principal}
        interestPayable={interestPayable}
      />
    </div>
  );
};

export default RightSection;
