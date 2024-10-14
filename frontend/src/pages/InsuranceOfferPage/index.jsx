import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Toolbar,
  IconButton,
  AppBar,
  styled,
  List,
  ListItem,
  Select,
  FormControl,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";
import CustomSnackbar from "../../components/CustomSnackbar";
import { insuranceOffer } from "../../assets/dump";

const OffersContainer = styled("div")(({ theme }) => ({}));

const DialogContainer = styled(Dialog)(({ theme }) => ({
  "& .MuiOutlinedInput-input.Mui-disabled": {
    WebkitTextFillColor: "#000000b0", //#000000c2
  },
}));

const InsuranceOfferPage = () => {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [offers, setOffers] = useState(insuranceOffer);
  const [offerDetails, setOfferDetails] = useState([]);
  const [providerDetails, setProviderDetails] = useState([]);
  const navigate = useNavigate();
  const txnId = sessionStorage.getItem("txnId");
  const [openDialog, setOpenDialog] = useState(false);
  const [allAddOns, setAllAddOns] = useState(
    JSON.parse(sessionStorage.getItem("selectedAddOns")) || {}
  );
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   setShowLoader(true);
  //   setShowLoader(true);
  //   setTimeout(() => {
  //     dispatch(insuranceOfferDetails({ txnId: txnId })).then((res) => {
  //       if (res?.error && Object.keys(res?.error)?.length > 0) {
  //         setErrorMessage("Error while fetching offers");
  //         setShowSnackbar(true);
  //         setShowLoader(false);
  //         return;
  //       } else {
  //         setOffers(res?.payload?.offer_list);
  //         setShowLoader(false);
  //       }
  //     });
  //   }, 2000);
  // }, []);

  const handleCardSelect = (offer) => {
    sessionStorage.setItem("offer_id", offer?.offer_details?.offer_item_id);
    navigate("/home/policy-details");
  };

  const handleCheckNow = (index) => {
    setOfferDetails(offers[index]?.offer_details);
    setProviderDetails(offers[index]?.provider_details);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

  const onSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <OffersContainer>
      <CustomLoader open={showLoader} />
      <CustomSnackbar
        message={errorMessage || "Something went wrong"}
        open={showSnackbar}
        status={"error"}
        onClose={onSnackbarClose}
      />
      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
        {offers?.map(
          (offer, index) =>
            offer?.offer_details && (
              <Grid item xs={12} sm={6} lg={4}>
                <div
                  key={index}
                  style={{
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
                          <Typography variant="body2" color="text.secondary">
                            Policy Name
                          </Typography>
                          <h4 style={{ marginTop: "10px" }}>
                            {" "}
                            {offer?.offer_details?.policy_name}{" "}
                          </h4>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
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
                                    .map((option) => option?.descriptor?.name)
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
                                            offer?.offer_details?.policy_name
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
                          <Typography variant="body2" color="text.secondary">
                            Coverage Amount
                          </Typography>
                          <h4 style={{ marginTop: "10px" }}>
                            {offer?.offer_details?.COVERAGE_AMOUNT}
                          </h4>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Premium Amount
                          </Typography>
                          <h4 style={{ marginTop: "10px" }}>
                            {" "}
                            {offer?.offer_details?.premium_amount?.value}{" "}
                          </h4>
                        </Grid>
                      </Grid>
                      <Button
                        onClick={() => handleCardSelect(offer)}
                        variant="contained"
                        color="primary"
                      >
                        Select Policy
                      </Button>
                      {offer?.offer_details?.error_details?.error_code !==
                        null && (
                        <p style={{ color: "#0000009e", marginBottom: "0" }}>
                          {offer?.offer_details?.error_details?.error_message}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  {/* <div style={{ textAlign: "center", padding: "5px", color: "#fff"}}>
                              <a href={offer?.offer_details?.TNC_LINK} rel="noreferrer noopener" target='_blank' style={{ color: '#fff', textDecoration: "none" }}>
                                  <p>Terms & Conditions* </p></a>
                          </div> */}
                </div>
              </Grid>
            )
        )}
      </Grid>

      <DialogContainer
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Offer Details
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {offerDetails && (
            <>
              <div>
                {/* <h3>Offer Details</h3> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Annual Percentage Rate"
                      value={offerDetails["ANNUAL_PERCENTAGE_RATE"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{
                        WebkitTextFillColor: "#000000b0",
                        color: "#eee",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Application Fee"
                      value={offerDetails["APPLICATION_FEE"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cool Off Period"
                      value={offerDetails["COOL_OFF_PERIOD"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Delay Penalty Fee"
                      value={offerDetails["DELAY_PENALTY_FEE"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Foreclouser Fee"
                      value={offerDetails["FORECLOSURE_FEE"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Installment Amount"
                      value={offerDetails["INSTALLMENT_AMOUNT"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Interest Rate"
                      value={offerDetails["INTEREST_RATE"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Interest Rate Conversion Charge"
                      value={offerDetails["INTEREST_RATE_CONVERSION_CHARGE"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Interest Rate Type"
                      value={offerDetails["INTEREST_RATE_TYPE"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Installments of Repayment"
                      value={
                        offerDetails["NUMBER_OF_INSTALLMENTS_OF_REPAYMENT"]
                      }
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                </Grid>
              </div>
              <br /> <br />
              <div>
                <h3>GRO Information</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="GRO Name"
                      value={providerDetails["GRO_NAME"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="GRO Email"
                      value={providerDetails["GRO_EMAIL"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="GRO Contact Number"
                      value={providerDetails["GRO_CONTACT_NUMBER"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="GRO Designation"
                      value={providerDetails["GRO_DESIGNATION"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="GRO Address"
                      value={providerDetails["GRO_ADDRESS"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Customer Support Link"
                      value={providerDetails["CUSTOMER_SUPPORT_LINK"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Customer Support Contact Number"
                      value={providerDetails["CUSTOMER_SUPPORT_CONTACT_NUMBER"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Customer Support Email"
                      value={providerDetails["CUSTOMER_SUPPORT_EMAIL"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                </Grid>
              </div>
              <br /> <br />
              <div>
                <h3>LSP Information</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="LSP Name"
                      value={providerDetails["LSP_NAME"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="LSP Email"
                      value={providerDetails["LSP_EMAIL"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="LSP Contact Number"
                      value={providerDetails["LSP_CONTACT_NUMBER"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="LSP Address"
                      value={providerDetails["LSP_ADDRESS"]}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      disabled
                      style={{ WebkitTextFillColor: "#000000b0" }}
                    />
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </DialogContent>
        {/* <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions> */}
      </DialogContainer>
    </OffersContainer>
  );
};

export default InsuranceOfferPage;
