export const calculateEmi = ({ principal: p, roi: r, tenure: t }) => {
  r = r / (12 * 100);
  t = t * 12;
  return (
    Math.round((p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1)) || "--"
  );
};

export const calculateInterest = ({ emi, tenure, principal }) => {
  return emi * tenure * 12 - principal;
};
