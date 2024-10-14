// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Grid,
//   Typography,
//   TextField,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Toolbar,
//   IconButton,
//   AppBar,
//   styled,
//   List,
//   ListItem,
//   Select,
//   FormControl,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   Box,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import CustomLoader from "../../components/CustomLoader";
// import CustomSnackbar from "../../components/CustomSnackbar";
// import { insuranceOffer } from "../../assets/dump";

// const OffersContainer = styled("div")(({ theme }) => ({}));

// const DialogContainer = styled(Dialog)(({ theme }) => ({
//   "& .MuiOutlinedInput-input.Mui-disabled": {
//     WebkitTextFillColor: "#000000b0", //#000000c2
//   },
// }));

// const InsuranceOfferPage = () => {
//   const dispatch = useDispatch();
//   const [showLoader, setShowLoader] = useState(false);
//   const [offers, setOffers] = useState(insuranceOffer);
//   const [offerDetails, setOfferDetails] = useState([]);
//   const [providerDetails, setProviderDetails] = useState([]);
//   const navigate = useNavigate();
//   const txnId = sessionStorage.getItem("txnId");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [allAddOns, setAllAddOns] = useState(
//     JSON.parse(sessionStorage.getItem("selectedAddOns")) || {}
//   );
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // useEffect(() => {
//   //   setShowLoader(true);
//   //   setShowLoader(true);
//   //   setTimeout(() => {
//   //     dispatch(insuranceOfferDetails({ txnId: txnId })).then((res) => {
//   //       if (res?.error && Object.keys(res?.error)?.length > 0) {
//   //         setErrorMessage("Error while fetching offers");
//   //         setShowSnackbar(true);
//   //         setShowLoader(false);
//   //         return;
//   //       } else {
//   //         setOffers(res?.payload?.offer_list);
//   //         setShowLoader(false);
//   //       }
//   //     });
//   //   }, 2000);
//   // }, []);

//   const handleCardSelect = (offer) => {
//     sessionStorage.setItem("offer_id", offer?.offer_details?.offer_item_id);
//     navigate("/home/policy-details");
//   };

//   const handleCheckNow = (index) => {
//     setOfferDetails(offers[index]?.offer_details);
//     setProviderDetails(offers[index]?.provider_details);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleAddOnChange = (event, name) => {
//     setAllAddOns((prevData) => ({
//       ...prevData,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleAddOnBlur = (offerId, name) => {
//     //   setShowLoader(true);
//     //   let addOn_obj = [];
//     //   sessionStorage.setItem("selectedAddOns", JSON.stringify(allAddOns));
//     //   Object.entries(allAddOns).forEach(([key, value]) => {
//     //     if (key === name.toString()) {
//     //       value.map((item) => {
//     //         addOn_obj.push({
//     //           add_on_id: item,
//     //           add_on_count: 1,
//     //         });
//     //       });
//     //     }
//     //   });
//     //   const payload = {
//     //     txnId: txnId,
//     //     offerId: offerId,
//     //     addOnData: {
//     //       add_on_obj: addOn_obj,
//     //     },
//     //   };
//     //   dispatch(insuranceSelect(payload)).then((response) => {
//     //     if (response?.error && Object.keys(response?.error)?.length > 0) {
//     //       setShowLoader(false);
//     //       return;
//     //     } else if (
//     //       response?.payload &&
//     //       response?.payload[0]?.ack_status === "ACK"
//     //     ) {
//     //       const fetchData = async (retryCount = 0) => {
//     //         if (retryCount >= 3) {
//     //           console.log(
//     //             "Maximum retry limit reached. Unable to get desired response."
//     //           );
//     //           return;
//     //         }
//     //         const id = setInterval(() => {
//     //           setShowLoader(true);
//     //           dispatch(creditStatusCheck(payload)).then((res) => {
//     //             const response = res?.payload;
//     //             if (response.current_action === "ON_SELECT_KYC") {
//     //               console.log("Success");
//     //               setShowLoader(false);
//     //               clearInterval(id);
//     //               dispatch(insuranceOfferDetails({ txnId: txnId })).then(
//     //                 (res) => {
//     //                   if (
//     //                     res?.payload &&
//     //                     res?.payload?.transaction_details?.current_action ===
//     //                       "ON_SELECT_KYC"
//     //                   ) {
//     //                     setOffers(res?.payload?.offer_list);
//     //                     console.log("Desired response received:");
//     //                     setShowLoader(false);
//     //                   } else {
//     //                     console.log("Response received:"); // Make the API call again with incremented retryCount
//     //                     fetchData(retryCount + 1);
//     //                   }
//     //                 }
//     //               );
//     //             } else {
//     //               console.log("Error");
//     //             }
//     //           });
//     //         }, 3000);
//     //       };
//     //       fetchData();
//     //     } else {
//     //       setShowLoader(false);
//     //       setShowSnackbar(true);
//     //       return;
//     //     }
//     //   });
//   };

//   const onSnackbarClose = () => {
//     setShowSnackbar(false);
//   };

//   return (
//     <OffersContainer>
//       <CustomLoader open={showLoader} />
//       <CustomSnackbar
//         message={errorMessage || "Something went wrong"}
//         open={showSnackbar}
//         status={"error"}
//         onClose={onSnackbarClose}
//       />
//       <Grid container spacing={2} style={{ marginBottom: "10px" }}>
//         {offers?.map(
//           (offer, index) =>
//             offer?.offer_details && (
//               <Grid item xs={12} sm={6} lg={4}>
//                 <div
//                   key={index}
//                   style={{
//                     border: "4px solid #6938f4",
//                     margin: "12px 8px",
//                     backgroundColor: "#6938f4",
//                     borderRadius: "1%",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <Card sx={{ borderRadius: "1%" }}>
//                     <CardHeader
//                       avatar={
//                         <img
//                           src={offer?.provider_details?.images[0]?.url}
//                           width={70}
//                           height="auto"
//                         />
//                       }
//                       title={offer?.provider_details?.name}
//                       // action={
//                       //     <Button  variant="contained" style={{ backgroundColor: "#20b281" }} onClick={() => handleCheckNow(index)}>Check Now</Button>
//                       // }
//                     />
//                     <CardContent>
//                       <Grid container spacing={1}>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" color="text.secondary">
//                             Policy Name
//                           </Typography>
//                           <h4 style={{ marginTop: "10px" }}>
//                             {" "}
//                             {offer?.offer_details?.policy_name}{" "}
//                           </h4>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" color="text.secondary">
//                             Add On
//                           </Typography>
//                           <h4 style={{ marginTop: "10px" }}>
//                             <FormControl fullWidth>
//                               <Select
//                                 name={offer?.offer_details?.policy_name}
//                                 multiple
//                                 value={
//                                   allAddOns[
//                                     offer?.offer_details?.policy_name
//                                   ] || []
//                                 }
//                                 onChange={(event) =>
//                                   handleAddOnChange(
//                                     event,
//                                     offer?.offer_details?.policy_name
//                                   )
//                                 }
//                                 renderValue={(selected) =>
//                                   // <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                   // selected.join(', ')
//                                   // </Box>
//                                   offer?.offer_details?.available_add_ons
//                                     .filter((option) =>
//                                       selected.includes(option.id)
//                                     )
//                                     .map((option) => option?.descriptor?.name)
//                                     .join(", ")
//                                 }
//                                 onBlur={() =>
//                                   handleAddOnBlur(
//                                     offer?.offer_details?.offer_item_id,
//                                     offer?.offer_details?.policy_name
//                                   )
//                                 }
//                               >
//                                 {offer?.offer_details?.available_add_ons.map(
//                                   (option) => (
//                                     <MenuItem
//                                       key={option?.id}
//                                       value={option?.id}
//                                     >
//                                       <Checkbox
//                                         checked={
//                                           allAddOns[
//                                             offer?.offer_details?.policy_name
//                                           ]
//                                             ? allAddOns[
//                                                 offer?.offer_details
//                                                   ?.policy_name
//                                               ].indexOf(option?.id) > -1
//                                             : 0
//                                         }
//                                       />
//                                       {/* indexOf(option?.id) */}
//                                       <ListItemText
//                                         primary={option?.descriptor?.name}
//                                       />
//                                       <ListItemText
//                                         style={{ textAlign: "right" }}
//                                         primary={
//                                           option?.price?.currency +
//                                           " " +
//                                           option?.price?.value
//                                         }
//                                       />
//                                     </MenuItem>
//                                   )
//                                 )}
//                               </Select>
//                             </FormControl>
//                             {/* } */}
//                           </h4>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" color="text.secondary">
//                             Coverage Amount
//                           </Typography>
//                           <h4 style={{ marginTop: "10px" }}>
//                             {offer?.offer_details?.COVERAGE_AMOUNT}
//                           </h4>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" color="text.secondary">
//                             Premium Amount
//                           </Typography>
//                           <h4 style={{ marginTop: "10px" }}>
//                             {" "}
//                             {offer?.offer_details?.premium_amount?.value}{" "}
//                           </h4>
//                         </Grid>
//                       </Grid>
//                       <Button
//                         onClick={() => handleCardSelect(offer)}
//                         variant="contained"
//                         color="primary"
//                       >
//                         Select Policy
//                       </Button>
//                       {offer?.offer_details?.error_details?.error_code !==
//                         null && (
//                         <p style={{ color: "#0000009e", marginBottom: "0" }}>
//                           {offer?.offer_details?.error_details?.error_message}
//                         </p>
//                       )}
//                     </CardContent>
//                   </Card>
//                   {/* <div style={{ textAlign: "center", padding: "5px", color: "#fff"}}>
//                               <a href={offer?.offer_details?.TNC_LINK} rel="noreferrer noopener" target='_blank' style={{ color: '#fff', textDecoration: "none" }}>
//                                   <p>Terms & Conditions* </p></a>
//                           </div> */}
//                 </div>
//               </Grid>
//             )
//         )}
//       </Grid>

//       <DialogContainer
//         open={openDialog}
//         onClose={handleCloseDialog}
//         fullWidth={true}
//         maxWidth={"sm"}
//       >
//         <AppBar sx={{ position: "relative" }}>
//           <Toolbar>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Offer Details
//             </Typography>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleCloseDialog}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <DialogContent>
//           {offerDetails && (
//             <>
//               <div>
//                 {/* <h3>Offer Details</h3> */}
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Annual Percentage Rate"
//                       value={offerDetails["ANNUAL_PERCENTAGE_RATE"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{
//                         WebkitTextFillColor: "#000000b0",
//                         color: "#eee",
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Application Fee"
//                       value={offerDetails["APPLICATION_FEE"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Cool Off Period"
//                       value={offerDetails["COOL_OFF_PERIOD"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Delay Penalty Fee"
//                       value={offerDetails["DELAY_PENALTY_FEE"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Foreclouser Fee"
//                       value={offerDetails["FORECLOSURE_FEE"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Installment Amount"
//                       value={offerDetails["INSTALLMENT_AMOUNT"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Interest Rate"
//                       value={offerDetails["INTEREST_RATE"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Interest Rate Conversion Charge"
//                       value={offerDetails["INTEREST_RATE_CONVERSION_CHARGE"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Interest Rate Type"
//                       value={offerDetails["INTEREST_RATE_TYPE"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Installments of Repayment"
//                       value={
//                         offerDetails["NUMBER_OF_INSTALLMENTS_OF_REPAYMENT"]
//                       }
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                 </Grid>
//               </div>
//               <br /> <br />
//               <div>
//                 <h3>GRO Information</h3>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="GRO Name"
//                       value={providerDetails["GRO_NAME"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="GRO Email"
//                       value={providerDetails["GRO_EMAIL"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="GRO Contact Number"
//                       value={providerDetails["GRO_CONTACT_NUMBER"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="GRO Designation"
//                       value={providerDetails["GRO_DESIGNATION"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="GRO Address"
//                       value={providerDetails["GRO_ADDRESS"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Customer Support Link"
//                       value={providerDetails["CUSTOMER_SUPPORT_LINK"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Customer Support Contact Number"
//                       value={providerDetails["CUSTOMER_SUPPORT_CONTACT_NUMBER"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Customer Support Email"
//                       value={providerDetails["CUSTOMER_SUPPORT_EMAIL"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                 </Grid>
//               </div>
//               <br /> <br />
//               <div>
//                 <h3>LSP Information</h3>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="LSP Name"
//                       value={providerDetails["LSP_NAME"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="LSP Email"
//                       value={providerDetails["LSP_EMAIL"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="LSP Contact Number"
//                       value={providerDetails["LSP_CONTACT_NUMBER"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="LSP Address"
//                       value={providerDetails["LSP_ADDRESS"]}
//                       InputLabelProps={{ shrink: true }}
//                       fullWidth
//                       disabled
//                       style={{ WebkitTextFillColor: "#000000b0" }}
//                     />
//                   </Grid>
//                 </Grid>
//               </div>
//             </>
//           )}
//         </DialogContent>
//         {/* <DialogActions>
//               <Button onClick={handleCloseDialog}>Close</Button>
//               </DialogActions> */}
//       </DialogContainer>
//     </OffersContainer>
//   );
// };

// export default InsuranceOfferPage;

import {
  Box,
  Divider,
  FormControl,
  RadioGroup,
  Stack,
  styled,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  DialogContentText,
  DialogActions,
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import { AudioDataContext } from "../../context/audioDataContext";
import { useDispatch } from "react-redux";
import { agentConversation } from "../CreditPage/audioAgent.slice";
import CustomLoader from "../../components/CustomLoader";
import CustomTimer from "../../components/CustomTimer";
import { MediaContext } from "../../context/mediaContext";
import { creditStatusCheck } from "../TransactionStatus/transactionStatus.Slice";
import RedirectionDialogComponent from "../../components/RedirectionDialogComponent";
import { insuranceOffer } from "../../assets/dump";

const AvailableOffersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const DocumentHeaderSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(4),
  gap: theme.spacing(4),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "95%",
}));

const SelectBoxContainer = styled("div")(({ theme }) => ({
  border: "1px solid #9E9E9E",
  padding: theme.spacing(4),
  borderRadius: "8px",
  width: "100%",
  backgroundColor: "#FFFFFF",
  flex: "0 0 auto",
}));

const SelectBoxHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}));

const SelectBoxDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const DetailRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}));

const ScrollContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  overflowX: "auto",
  scrollBehavior: "smooth",
  maxWidth: "100%",
  boxSizing: "border-box",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const ButtonContainer = styled(IconButton)(({ theme, disabled }) => ({
  height: "30px",
  width: "30px",
  justifyContent: "center",
  border: disabled ? "2px solid #00000042" : "2px solid #000000",
  alignItems: "center",
  padding: theme.spacing(2),
  cursor: disabled ? "not-allowed" : "pointer",
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(5),
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(23, 23, 23, 0.8)",
    backdropFilter: "blur(16px)",
  },
  "& .MuiDialog-paper": {
    boxShadow: "none",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  minWidth: "600px",
  minHeight: "400px",
  maxHeight: "600px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
    minHeight: "100%",
  },
}));

const useStyles = {
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  planeImage: {
    width: "50px",
    height: "50px",
    transition: "transform 1s ease-in-out",
  },
  planeImageFlying: {
    transform: "translateX(250px) rotate(-20deg)",
  },
};

const InsuranceOfferPage = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const {
    nextState,
    setError,
    setAudioResponse,
    setMessageResponse,
    setUserResponse,
    setProcessing,
    setProgressValue,
  } = useContext(MediaContext);
  const { aaRedirectUrl, offerDetails } = useContext(AudioDataContext);
  const [offers, setOffers] = useState(insuranceOffer);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [redirectionVal, setRedirectionVal] = useState(false);
  const [allAddOns, setAllAddOns] = useState(
    JSON.parse(sessionStorage.getItem("selectedAddOns")) || {}
  );

  let form_aa_URL;

  useEffect(() => {
    console.log(offerDetails);
  });

  useEffect(() => {
    if (nextState === "resume_after_aa_redirect") {
      setConfirmationDialog(true);
    }
  }, [nextState]);

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.children[index].offsetLeft;
      setCurrentSlide(index);
    }
  };

  const next = () => {
    if (currentSlide < offers.length - 1) {
      scrollTo(currentSlide + 1);
    }
  };

  const previous = () => {
    if (currentSlide > 0) {
      scrollTo(currentSlide - 1);
    }
  };

  const handleCloseViewDetails = () => {
    setOpenViewDetails(false);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, children } = scrollRef.current;
      const newIndex = Array.from(children).findIndex(
        (child) => child.offsetLeft >= scrollLeft
      );
      setCurrentSlide(newIndex);
    }
  };

  const handleAddOnChange = (event, name) => {
    setAllAddOns((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddOnBlur = (offerId, name) => {
    //   setShowLoader(true);
    //   let addOn_obj = [];
    //   sessionStorage.setItem("selectedAddOns", JSON.stringify(allAddOns));
    //   Object.entries(allAddOns).forEach(([key, value]) => {
    //     if (key === name.toString()) {
    //       value.map((item) => {
    //         addOn_obj.push({
    //           add_on_id: item,
    //           add_on_count: 1,
    //         });
    //       });
    //     }
    //   });
    //   const payload = {
    //     txnId: txnId,
    //     offerId: offerId,
    //     addOnData: {
    //       add_on_obj: addOn_obj,
    //     },
    //   };
    //   dispatch(insuranceSelect(payload)).then((response) => {
    //     if (response?.error && Object.keys(response?.error)?.length > 0) {
    //       setShowLoader(false);
    //       return;
    //     } else if (
    //       response?.payload &&
    //       response?.payload[0]?.ack_status === "ACK"
    //     ) {
    //       const fetchData = async (retryCount = 0) => {
    //         if (retryCount >= 3) {
    //           console.log(
    //             "Maximum retry limit reached. Unable to get desired response."
    //           );
    //           return;
    //         }
    //         const id = setInterval(() => {
    //           setShowLoader(true);
    //           dispatch(creditStatusCheck(payload)).then((res) => {
    //             const response = res?.payload;
    //             if (response.current_action === "ON_SELECT_KYC") {
    //               console.log("Success");
    //               setShowLoader(false);
    //               clearInterval(id);
    //               dispatch(insuranceOfferDetails({ txnId: txnId })).then(
    //                 (res) => {
    //                   if (
    //                     res?.payload &&
    //                     res?.payload?.transaction_details?.current_action ===
    //                       "ON_SELECT_KYC"
    //                   ) {
    //                     setOffers(res?.payload?.offer_list);
    //                     console.log("Desired response received:");
    //                     setShowLoader(false);
    //                   } else {
    //                     console.log("Response received:"); // Make the API call again with incremented retryCount
    //                     fetchData(retryCount + 1);
    //                   }
    //                 }
    //               );
    //             } else {
    //               console.log("Error");
    //             }
    //           });
    //         }, 3000);
    //       };
    //       fetchData();
    //     } else {
    //       setShowLoader(false);
    //       setShowSnackbar(true);
    //       return;
    //     }
    //   });
  };

  // const fetchTransactionStatus = async (retryCount = 0) => {
  //   setTimeout(() => {
  //     setRedirectionVal(true);
  //   }, 1100);
  //   if (retryCount >= 50) {
  //     console.log(
  //       "Maximum retry limit reached. Unable to get desired response."
  //     );
  //     return;
  //   }

  //   setTimeout(() => {
  //     const payload = {
  //       txnId: sessionStorage.getItem("txn_id"),
  //     };
  //     dispatch(creditStatusCheck(payload)).then((res) => {
  //       if (res?.error && Object.keys(res?.error)?.length > 0) {
  //         setError(true);
  //         return;
  //       }
  //       setError(false);
  //       if (res?.payload?.redirection_status === "AA_APPROVED") {
  //         console.log("Desired response received:");
  //         form_aa_URL.close();
  //         setRedirectionVal(false);
  //         setShowLoader(true);
  //         setProcessing(true);
  //         const secondpayload = {
  //           uploadFlag: sessionStorage.getItem("document_upload_flag"),
  //           state: sessionStorage.getItem("next_state"),
  //           language: sessionStorage.getItem("activeLanguage"),
  //         };
  //         dispatch(agentConversation(secondpayload)).then((res) => {
  //           if (res?.error && Object.keys(res?.error)?.length > 0) {
  //             setError(true);
  //             setProcessing(false);
  //             return;
  //           }
  //           setError(false);
  //           setShowLoader(false);
  //           setProgressValue(30);
  //           setProcessing(false);
  //           sessionStorage.setItem(
  //             "next_state",
  //             res?.payload?.data?.next_state
  //           );
  //           setAudioResponse(res?.payload?.data?.agent_audio_data);
  //           setMessageResponse(res?.payload?.data?.agent_message);
  //           setUserResponse(res?.payload?.data?.user_message);
  //           sessionStorage.setItem("showTimer", true);
  //           navigate("/credit/availableOffers");
  //         });
  //       } else if (res?.payload?.redirection_status === "AA_REJECTED") {
  //         form_aa_URL.close();
  //         setConfirmationDialog(true);
  //       } else {
  //         console.log("Not AA_APPROVED");
  //         fetchTransactionStatus(retryCount + 1);
  //       }
  //     });
  //   }, 5000);
  // };

  // const handleDialogSubmit = (value) => {
  //   if (value === "YES") {
  //     setIsFlying(true);
  //     setTimeout(() => {
  //       setConfirmationDialog(false);
  //       setIsFlying(false);
  //     }, 1000);
  //     setTimeout(() => {
  //       form_aa_URL = window.open(aaRedirectUrl, "_blank");
  //     }, 1800);
  //     fetchTransactionStatus();
  //   } else {
  //     setRedirectionVal(false);
  //     setConfirmationDialog(false);
  //     return;
  //   }
  // };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => {
        ref.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (offers?.length > 0) {
      sessionStorage.setItem(
        "selected_offer",
        JSON.stringify(offers?.[currentSlide])
      );
      sessionStorage.setItem(
        "offer_item_id",
        offers?.[currentSlide]?.offer_details?.offer_item_id
      );
    }
  }, [currentSlide, offers]);

  const initialShowTimer =
    sessionStorage.getItem("showTimer") === "true" ? true : false;
  const [showTimer, setShowTimer] = useState(initialShowTimer);
  const [showLoader, setShowLoader] = useState(false);
  const activeLanguage = sessionStorage.getItem("activeLanguage");
  useEffect(() => {
    sessionStorage.setItem("showTimer", showTimer);
  }, [showTimer]);

  return (
    <>
      <CustomLoader open={showLoader} />
      <RedirectionDialogComponent
        open={redirectionVal}
        setRedirectionVal={setRedirectionVal}
      />
      <AvailableOffersContainer>
        <DocumentHeaderSection>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
          >
            {activeLanguage === "hi" ? "उपलब्ध ऑफर" : "Available Offers"}
          </Typography>
        </DocumentHeaderSection>
        <FormContainer>
          <FormControl component="fieldset">
            <RadioGroup>
              {offers && offers.length > 0 ? (
                <>
                  <ScrollContainer ref={scrollRef}>
                    {offers.map((offer, index) => (
                      <div
                        key={index}
                        style={{
                          minWidth: "95%",
                          border: "4px solid #6938f4",
                          margin: "12px 8px",
                          backgroundColor: "#6938f4",
                          borderRadius: "1%",
                          cursor: "pointer",
                        }}
                      >
                        <Card sx={{ borderRadius: "1%" }}>
                          <CardHeader
                            avatar={
                              <img
                                src={offer?.provider_details?.images[0]?.url}
                                width={70}
                                height="auto"
                                alt="logo"
                              />
                            }
                            title={offer?.provider_details?.name}
                            // action={
                            //     <Button  variant="contained" style={{ backgroundColor: "#20b281" }} onClick={() => handleCheckNow(index)}>Check Now</Button>
                            // }
                          />
                          <CardContent>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Policy Name
                                </Typography>
                                <h4 style={{ marginTop: "10px" }}>
                                  {" "}
                                  {offer?.offer_details?.policy_name}{" "}
                                </h4>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Add On
                                </Typography>
                                <h4 style={{ marginTop: "10px" }}>
                                  <FormControl fullWidth>
                                    <Select
                                      name={offer?.offer_details?.policy_name}
                                      multiple
                                      value={
                                        allAddOns[
                                          offer?.offer_details?.policy_name
                                        ] || []
                                      }
                                      onChange={(event) =>
                                        handleAddOnChange(
                                          event,
                                          offer?.offer_details?.policy_name
                                        )
                                      }
                                      renderValue={(selected) =>
                                        // <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        // selected.join(', ')
                                        // </Box>
                                        offer?.offer_details?.available_add_ons
                                          .filter((option) =>
                                            selected.includes(option.id)
                                          )
                                          .map(
                                            (option) => option?.descriptor?.name
                                          )
                                          .join(", ")
                                      }
                                      onBlur={() =>
                                        handleAddOnBlur(
                                          offer?.offer_details?.offer_item_id,
                                          offer?.offer_details?.policy_name
                                        )
                                      }
                                    >
                                      {offer?.offer_details?.available_add_ons.map(
                                        (option) => (
                                          <MenuItem
                                            key={option?.id}
                                            value={option?.id}
                                          >
                                            <Checkbox
                                              checked={
                                                allAddOns[
                                                  offer?.offer_details
                                                    ?.policy_name
                                                ]
                                                  ? allAddOns[
                                                      offer?.offer_details
                                                        ?.policy_name
                                                    ].indexOf(option?.id) > -1
                                                  : 0
                                              }
                                            />
                                            {/* indexOf(option?.id) */}
                                            <ListItemText
                                              primary={option?.descriptor?.name}
                                            />
                                            <ListItemText
                                              style={{ textAlign: "right" }}
                                              primary={
                                                option?.price?.currency +
                                                " " +
                                                option?.price?.value
                                              }
                                            />
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                  </FormControl>
                                  {/* } */}
                                </h4>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Coverage Amount
                                </Typography>
                                <h4 style={{ marginTop: "10px" }}>
                                  {offer?.offer_details?.COVERAGE_AMOUNT}
                                </h4>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Premium Amount
                                </Typography>
                                <h4 style={{ marginTop: "10px" }}>
                                  {" "}
                                  {
                                    offer?.offer_details?.premium_amount?.value
                                  }{" "}
                                </h4>
                              </Grid>
                            </Grid>
                            {/* <Button
                              onClick={() => handleCardSelect(offer)}
                              variant="contained"
                              color="primary"
                            >
                              Select Policy
                            </Button> */}
                            {offer?.offer_details?.error_details?.error_code !==
                              null && (
                              <p
                                style={{
                                  color: "#0000009e",
                                  marginBottom: "0",
                                }}
                              >
                                {
                                  offer?.offer_details?.error_details
                                    ?.error_message
                                }
                              </p>
                            )}
                          </CardContent>
                        </Card>
                        {/* <div style={{ textAlign: "center", padding: "5px", color: "#fff"}}>
                                  <a href={offer?.offer_details?.TNC_LINK} rel="noreferrer noopener" target='_blank' style={{ color: '#fff', textDecoration: "none" }}>
                                      <p>Terms & Conditions* </p></a>
                              </div> */}
                      </div>
                    ))}
                  </ScrollContainer>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"row"}
                    gap={2}
                    m={4}
                  >
                    <ButtonContainer
                      disabled={currentSlide === 0}
                      onClick={previous}
                    >
                      <KeyboardArrowLeftIcon />
                    </ButtonContainer>

                    <Typography variant="body2" color="textSecondary">
                      {currentSlide + 1} / {offers.length}
                    </Typography>

                    <ButtonContainer
                      disabled={currentSlide >= offers.length - 1}
                      onClick={next}
                    >
                      <ChevronRightIcon />
                    </ButtonContainer>
                  </Stack>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    Please try reloading the page by clicking the reload button.
                  </Typography>
                </Box>
              )}
            </RadioGroup>
          </FormControl>
        </FormContainer>
      </AvailableOffersContainer>

      <BootstrapDialog
        onClose={handleCloseViewDetails}
        aria-labelledby="customized-dialog-title"
        open={openViewDetails}
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          id="customized-dialog-title"
        >
          <Typography
            textAlign={"center"}
            alignContent={"center"}
            fontFamily={"Plus Jakarta Sans Bold"}
            fontSize={20}
          >
            Offer Details
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseViewDetails}
            sx={{
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <StyledDialogContent dividers>
          {/* {accordionList.map((accordion, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}a-content`}
                id={`panel${index + 1}a-header`}
                sx={{ padding: 4 }}
              >
                <Typography>{accordion.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{accordion.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))} */}
        </StyledDialogContent>
      </BootstrapDialog>
      <Dialog
        open={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
        fullWidth
        maxWidth={"xs"}
      >
        <DialogContent style={useStyles.dialogContent}>
          <img
            src="https://pngfre.com/wp-content/uploads/Airplane-4.png"
            alt="Plane"
            style={{
              ...useStyles.planeImage,
              ...(isFlying ? useStyles.planeImageFlying : {}),
            }}
          />
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            {activeLanguage === "hi"
              ? "कृपया बाहर न निकलें या वापस न जाएं ।"
              : "Please don't exit or press back."}
            <br />

            {activeLanguage === "hi"
              ? "कृपया प्रतीक्षा करें, हम आपको एए वेरिफिकेशन पृष्ठ पर पुनः निर्देशित कर रहे हैं ।"
              : "Please wait while we are redirecting you to the AA Verification Page."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => handleDialogSubmit("YES")}>
            {activeLanguage === "hi" ? "आगे बढ़ें" : "Proceed"}
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InsuranceOfferPage;
