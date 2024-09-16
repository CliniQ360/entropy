export function appReducer(state, action) {
  let newState;
  switch (action.type) {
    case "principal":
      newState = { ...state, principal: action.payload };
      break;
    case "rateOfInterest":
      newState = { ...state, roi: action.payload };
      break;
    case "loanTenure":
      newState = { ...state, tenure: action.payload };
      break;
    default:
      throw new Error();
  }
  return newState;
}
