import {
  Box,
  Divider,
  FormControl,
  RadioGroup,
  Stack,
  styled,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { AudioDataContext } from "../../context/audioDataContext";
import { useDispatch } from "react-redux";
import CustomLoader from "../../components/CustomLoader";
import { MediaContext } from "../../context/mediaContext";
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

const AddOnCard = styled(Card)(({ theme, selected }) => ({
  border: `1px solid ${selected ? "#4caf50" : "#D2D2D2"}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "none",
  backgroundColor: `${selected ? "#4caf5029" : "#FFFFFF"}`,
  transition: "background-color 0.3s ease, border-color 0.3s ease",
  margin: theme.spacing(0, 3),
}));

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
  const { aaRedirectUrl, insuranceOfferList } = useContext(AudioDataContext);
  const [offers, setOffers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [redirectionVal, setRedirectionVal] = useState(false);
  const [allAddOns, setAllAddOns] = useState(
    sessionStorage.getItem("selectedAddOns") || ""
  );
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [finalPrice, setFinalPrice] = useState(
    parseInt(offers?.[currentSlide]?.offer_details?.premium_amount?.value)
  );

  let form_aa_URL;

  const handleToggleAddOn = (addOnId) => {
    setSelectedAddOns((prevSelected) => {
      const updatedSelected = prevSelected.includes(addOnId)
        ? prevSelected.filter((id) => id !== addOnId)
        : [...prevSelected, addOnId];
      sessionStorage.setItem("selectedAddOns", updatedSelected.join(","));
      return updatedSelected;
    });
  };

  useEffect(() => {
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = offers?.[
        currentSlide
      ]?.offer_details?.available_add_ons?.find((item) => item.id === addOnId);
      return addOn ? total + parseInt(addOn.price.value) : total;
    }, 0);
    setFinalPrice(
      parseInt(offers?.[currentSlide]?.offer_details?.premium_amount?.value) +
        addOnsPrice
    );
  }, [selectedAddOns, currentSlide]);

  useEffect(() => {
    // console.log(insuranceOfferList);
    setOffers(insuranceOfferList);
    // setOffers(insuranceOffer);
  }, [insuranceOfferList]);

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
      const { scrollLeft, clientWidth } = scrollRef.current;
      const newIndex = Math.round(scrollLeft / clientWidth);
      setCurrentSlide(newIndex);
    }
  };

  const handleAddOnChange = (event, name) => {
    setAllAddOns((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
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
    if (offers?.length > 0) {
      sessionStorage.setItem(
        "selected_offer",
        JSON.stringify(offers?.[currentSlide])
      );

      sessionStorage.setItem(
        "offer_item_id",
        offers?.[currentSlide]?.offer_details?.offer_item_id
      );
      sessionStorage.setItem("final_selected_premium_amt", finalPrice);
    }
  }, [currentSlide, offers, finalPrice]);

  useEffect(() => {
    sessionStorage.removeItem("selectedAddOns");
    setSelectedAddOns([]);
  }, [currentSlide]);

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
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  width={"-webkit-fill-available"}
                >
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
                                width={80}
                                height="auto"
                                alt="logo"
                              />
                            }
                            title={
                              <Typography
                                fontFamily={"Plus Jakarta Sans Bold"}
                                fontSize={20}
                              >
                                {offer?.provider_details?.name}
                              </Typography>
                            }
                            // action={
                            //     <Button  variant="contained" style={{ backgroundColor: "#20b281" }} onClick={() => handleCheckNow(index)}>Check Now</Button>
                            // }
                          />
                          <CardContent>
                            <Grid container justifyContent={"center"}>
                              <Grid item xs={12}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  fontSize={20}
                                  textAlign={"center"}
                                >
                                  Policy Name
                                </Typography>
                                <h4
                                  style={{
                                    marginTop: "10px",
                                    textAlign: "center",
                                    fontSize: "20px",
                                  }}
                                >
                                  {" "}
                                  {offer?.offer_details?.policy_name}{" "}
                                </h4>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  textAlign={"center"}
                                  fontSize={20}
                                >
                                  Coverage Amount
                                </Typography>
                                <h4
                                  style={{
                                    marginTop: "10px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                  }}
                                >
                                  {offer?.offer_details?.COVERAGE_AMOUNT}
                                </h4>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  textAlign={"center"}
                                  fontSize={20}
                                >
                                  Premium Amount
                                </Typography>
                                <h4
                                  style={{
                                    marginTop: "10px",
                                    fontSize: "20px",
                                    textAlign: "center",
                                  }}
                                >
                                  {finalPrice ||
                                    offer?.offer_details?.premium_amount?.value}
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

                  {offers.map((offer, index) => (
                    <Grid container key={index} spacing={3} mt={1}>
                      {offer.offer_details.available_add_ons.map(
                        (addOn) =>
                          offers?.[currentSlide]?.offer_details
                            ?.offer_item_id ===
                            offer?.offer_details?.offer_item_id && (
                            <Grid item xs={12} sm={5.8} pl={0} key={addOn.id}>
                              <AddOnCard
                                selected={selectedAddOns.includes(addOn.id)}
                                onClick={() => handleToggleAddOn(addOn.id)}
                                sx={{ cursor: "pointer" }}
                              >
                                <CardContent
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                    padding: "16px !important",
                                  }}
                                >
                                  <Typography
                                    fontSize={"1.1rem"}
                                    fontWeight={700}
                                  >
                                    {addOn.descriptor.name}
                                  </Typography>
                                  <Typography
                                    fontSize={"1.1rem"}
                                    color="text.secondary"
                                  >
                                    ₹{addOn.price.value}
                                  </Typography>
                                </CardContent>
                              </AddOnCard>
                            </Grid>
                          )
                      )}
                    </Grid>
                  ))}
                </Stack>
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
