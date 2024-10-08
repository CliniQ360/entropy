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

const AvailableOffersPage = () => {
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [redirectionVal, setRedirectionVal] = useState(false);

  let form_aa_URL;

  /*APIS FOR REFERESH OFFER */
  // useEffect(() => {
  //   setShowLoader(true);
  //   const thread_id = sessionStorage.getItem("thread_id");
  //   const uploadFlag = sessionStorage.getItem("document_upload_flag");
  //   const next_state = sessionStorage.getItem("next_state");
  //   setProcessing(true);
  //   const payload = {
  //     threadId: thread_id,
  //     uploadFlag: uploadFlag,
  //     state: "refresh_offer",
  //     language: sessionStorage.getItem("activeLanguage"),
  //   };
  //   const setTimeoutSeconds = showTimer ? 48000 : 0;
  //   setTimeout(() => {
  //     setShowLoader(true);
  //     dispatch(agentConversation(payload)).then((res) => {
  //       if (res?.error && Object.keys(res?.error)?.length > 0) {
  //         setShowLoader(false);
  //         setError(true);
  //         setProcessing(false);
  //         return;
  //       }
  //       setError(false);
  //       setProcessing(false);
  //       setAudioResponse(res?.payload?.data?.agent_audio_data);
  //       setMessageResponse(res?.payload?.data?.agent_message);
  //       setOfferDetails(res?.payload?.data?.offer_list);
  //       setUserResponse(res?.payload?.data?.user_message);

  //       sessionStorage.setItem(
  //         "customer_details",
  //         JSON.stringify(res?.payload?.data?.customer_details)
  //       );
  //       setShowLoader(false);
  //       setTimeout(() => {
  //         sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
  //       }, 300);
  //     });
  //   }, setTimeoutSeconds);
  // }, []);

  useEffect(() => {
    console.log(offerDetails);
  });

  useEffect(() => {
    if (nextState === "resume_after_aa_redirect") {
      setConfirmationDialog(true);
    }
  }, [nextState]);

  const filteredLoanOffers = offerDetails?.filter((offer) =>
    offer?.provider_details?.name.toLowerCase().includes("")
  );

  const handleInputChange = (event, offer) => {
    event.preventDefault();
    setSelectedOfferId(offer.offer_details.offer_item_id); // Set the selected offer's ID
    sessionStorage.setItem("offer_item_id", offer.offer_details.offer_item_id);
    sessionStorage.setItem("selected_offer", JSON.stringify(offer));
    console.log(offer);
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.children[index].offsetLeft;
      setCurrentSlide(index);
    }
  };

  const next = () => {
    if (currentSlide < filteredLoanOffers.length - 1) {
      scrollTo(currentSlide + 1);
    }
  };

  const previous = () => {
    if (currentSlide > 0) {
      scrollTo(currentSlide - 1);
    }
  };

  const formatNumber = (num) => {
    const parsedNum = parseFloat(num);
    return parsedNum % 1 === 0 ? parsedNum.toFixed(0) : parsedNum.toFixed(2);
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

  const fetchTransactionStatus = async (retryCount = 0) => {
    setTimeout(() => {
      setRedirectionVal(true);
    }, 1100);
    if (retryCount >= 50) {
      console.log(
        "Maximum retry limit reached. Unable to get desired response."
      );
      return;
    }

    setTimeout(() => {
      const payload = {
        txnId: sessionStorage.getItem("txn_id"),
      };
      dispatch(creditStatusCheck(payload)).then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setError(true);
          return;
        }
        setError(false);
        if (res?.payload?.redirection_status === "AA_APPROVED") {
          console.log("Desired response received:");
          form_aa_URL.close();
          setRedirectionVal(false);
          setShowLoader(true);
          setProcessing(true);
          const secondpayload = {
            uploadFlag: sessionStorage.getItem("document_upload_flag"),
            state: sessionStorage.getItem("next_state"),
            language: sessionStorage.getItem("activeLanguage"),
          };
          dispatch(agentConversation(secondpayload)).then((res) => {
            if (res?.error && Object.keys(res?.error)?.length > 0) {
              setError(true);
              setProcessing(false);
              return;
            }
            setError(false);
            setShowLoader(false);
            setProgressValue(30);
            setProcessing(false);
            sessionStorage.setItem(
              "next_state",
              res?.payload?.data?.next_state
            );
            setAudioResponse(res?.payload?.data?.agent_audio_data);
            setMessageResponse(res?.payload?.data?.agent_message);
            setUserResponse(res?.payload?.data?.user_message);
            sessionStorage.setItem("showTimer", true);
            navigate("/credit/availableOffers");
          });
        } else if (res?.payload?.redirection_status === "AA_REJECTED") {
          form_aa_URL.close();
          setConfirmationDialog(true);
        } else {
          console.log("Not AA_APPROVED");
          fetchTransactionStatus(retryCount + 1);
        }
      });
    }, 5000);
  };

  const handleDialogSubmit = (value) => {
    if (value === "YES") {
      setIsFlying(true);
      setTimeout(() => {
        setConfirmationDialog(false);
        setIsFlying(false);
      }, 1000);
      setTimeout(() => {
        form_aa_URL = window.open(aaRedirectUrl, "_blank");
      }, 1800);
      fetchTransactionStatus();
    } else {
      setRedirectionVal(false);
      setConfirmationDialog(false);
      return;
    }
  };

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
    if (offerDetails?.length > 0) {
      sessionStorage.setItem(
        "selected_offer",
        JSON.stringify(offerDetails?.[currentSlide])
      );
      sessionStorage.setItem(
        "offer_item_id",
        offerDetails?.[currentSlide]?.offer_details?.offer_item_id
      );
      sessionStorage.setItem(
        "selected_offer",
        JSON.stringify(offerDetails?.[currentSlide])
      );
    }
  }, [currentSlide, offerDetails]);

  const pageName = "offerPage";

  const loanData =
    pageName !== "offerPage"
      ? selectedOffer?.offer_list[0]?.offer_details
      : selectedOffer?.offer_details;
  const GRO =
    pageName !== "offerPage"
      ? selectedOffer?.offer_list[0]?.provider_details
      : selectedOffer?.provider_details;

  const accordionList = [
    {
      title: "Loan Details",
      content: loanData ? (
        <Grid container spacing={2}>
          {Object.entries(loanData).map(([key, value]) => (
            <Grid item xs={12} md={6} key={key}>
              <TextField label={key} value={value} fullWidth disabled />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p style={{ color: "red" }}>Error While fetching Data</p>
      ),
    },
    {
      title: "GRO information",
      content: GRO ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Name"
              value={GRO?.GRO_NAME}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Email"
              value={GRO?.GRO_EMAIL}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Contact Number"
              value={GRO?.GRO_CONTACT_NUMBER}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Designation"
              value={GRO?.GRO_DESIGNATION}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GRO Address"
              value={GRO?.GRO_ADDRESS}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Support Link"
              value={GRO?.CUSTOMER_SUPPORT_LINK}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Support Contact Number"
              value={GRO?.CUSTOMER_SUPPORT_CONTACT_NUMBER}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Support Email"
              value={GRO?.CUSTOMER_SUPPORT_EMAIL}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              style={{ WebkitTextFillColor: "#000000b0" }}
            />
          </Grid>
        </Grid>
      ) : (
        <p style={{ color: "red" }}>Error While fetching Data</p>
      ),
    },
    {
      title: "LSP information",
      content: GRO ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Name"
              value={GRO?.LSP_NAME}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Email"
              value={GRO?.LSP_EMAIL}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Contact Number"
              value={GRO?.LSP_CONTACT_NUMBER}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LSP Address"
              value={GRO?.LSP_ADDRESS}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      ) : (
        <p style={{ color: "red" }}>Error While fetching Data</p>
      ),
    },
    {
      title: "Terms and Conditions",
      content: (
        <Stack flexDirection={"row"} gap={2}>
          <Typography>Please click the link to view the</Typography>
          <a
            style={{
              color: "red",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => window.open(loanData?.TNC_LINK, "_blank")}
          >
            Terms and Conditions
          </a>{" "}
        </Stack>
      ),
    },
  ];

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
              {filteredLoanOffers && filteredLoanOffers.length > 0 ? (
                <>
                  <ScrollContainer ref={scrollRef}>
                    {filteredLoanOffers.map((offer, index) => (
                      <SelectBoxContainer key={index}>
                        <SelectBoxHeader>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {offer.provider_details?.images?.[0]?.url && (
                              <img
                                src={offer.provider_details.images[0].url}
                                style={{ height: "24px", marginRight: "10px" }}
                                alt={"img"}
                              />
                            )}
                            <Typography
                              fontFamily={"Plus Jakarta Sans Bold"}
                              fontSize={16}
                              sx={{ textTransform: "initial" }}
                            >
                              {offer.provider_details.name}
                            </Typography>
                          </div>
                          {/* <div>
                            <FormControlLabel
                              value={offer.offer_details.offer_item_id}
                              control={
                                <Radio
                                  checked={
                                    selectedOfferId ===
                                    offer.offer_details.offer_item_id
                                  }
                                />
                              }
                              onChange={(e) => handleInputChange(e, offer)}
                              label=""
                              style={{ margin: 0 }}
                            />
                          </div> */}
                        </SelectBoxHeader>
                        <Divider
                          style={{ width: "100%", margin: "16px 0px" }}
                        />
                        <SelectBoxDetails>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              {activeLanguage === "hi"
                                ? "ऋण राशि"
                                : "Loan Amount"}
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              {activeLanguage === "hi" ? "रु." : "Rs."}
                              {formatNumber(offer.offer_details.item_price) ||
                                ""}
                            </Typography>
                          </DetailRow>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              {activeLanguage === "hi"
                                ? "ब्याज दर"
                                : "Interest Rate"}
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              {formatNumber(
                                offer.offer_details.INTEREST_RATE
                              ) || ""}{" "}
                              %
                            </Typography>
                          </DetailRow>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              {activeLanguage === "hi" ? "अवधि" : "Tenure"}
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              {formatNumber(offer.offer_details.TERM) || ""}{" "}
                              {activeLanguage === "hi" ? "महीने" : "Months"}
                            </Typography>
                          </DetailRow>
                          <DetailRow>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              color={"#5A5A5A"}
                              fontSize={16}
                            >
                              {activeLanguage === "hi"
                                ? "किस्त राशि"
                                : "Installment Amount"}
                            </Typography>
                            <Typography
                              fontFamily={"Source Sans Pro"}
                              fontSize={16}
                            >
                              Rs.{" "}
                              {formatNumber(
                                offer.offer_details.INSTALLMENT_AMOUNT
                              ) || ""}{" "}
                              {activeLanguage === "hi" ? "/माह" : "/Month"}
                            </Typography>
                          </DetailRow>
                        </SelectBoxDetails>
                        <Divider style={{ width: "100%", margin: "16px 0" }} />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            width: "100%",
                          }}
                        >
                          <Button
                            variant="text"
                            fontFamily={"Source Sans Pro SemiBold"}
                            fontSize={20}
                            sx={{ textTransform: "initial" }}
                            onClick={() => {
                              setSelectedOffer(offer);
                              setOpenViewDetails(true);
                            }}
                          >
                            {activeLanguage === "hi"
                              ? "विवरण देखें"
                              : "View Details"}
                          </Button>
                        </Box>
                      </SelectBoxContainer>
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
                      {currentSlide + 1} / {filteredLoanOffers.length}
                    </Typography>

                    <ButtonContainer
                      disabled={currentSlide >= filteredLoanOffers.length - 1}
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
          {accordionList.map((accordion, index) => (
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
          ))}
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
          <Button onClick={() => handleDialogSubmit("YES")}>
            {activeLanguage === "hi" ? "आगे बढ़ें" : "Proceed"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AvailableOffersPage;
