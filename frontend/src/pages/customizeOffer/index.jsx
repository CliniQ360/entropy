import {
  Box,
  Divider,
  Stack,
  styled,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Slider,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomLoader from "../../components/CustomLoader";
import CelebrationIcon from "@mui/icons-material/Celebration";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RedirectionDialogComponent from "../../components/RedirectionDialogComponent";
import { json, useNavigate } from "react-router-dom";
import { AudioDataContext } from "../../context/audioDataContext";
import { MediaContext } from "../../context/mediaContext";
import { agentConversation } from "../CreditPage/audioAgent.slice";

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

const SliderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 0),
}));

const CustomizeOfferPage = () => {
  const dispatch = useDispatch();
  const [offerDetails, setOfferDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [newOfferValues, setNewOfferValues] = useState({});
  const maxLoanAmount = offerDetails?.quote_details?.PRINCIPAL;
  const minLoanAmount = offerDetails?.offer_details?.MIN_LOAN_AMOUNT;
  const [loanAmount, setLoanAmount] = useState(0);
  const {
    setError,
    setAudioResponse,
    setMessageResponse,
    setProgressValue,
    setUserResponse,
    setProcessing,
  } = useContext(MediaContext);
  const { setKycRedirectUrl } = useContext(AudioDataContext);
  const navigate = useNavigate();

  const handleSliderChange = (event, newValue) => {
    setLoanAmount(newValue);
    sessionStorage.setItem("selected_amt", newValue);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  useEffect(() => {
    setLoanAmount(maxLoanAmount / 2);
    sessionStorage.setItem("selected_amt", maxLoanAmount / 2);
  }, [maxLoanAmount]);

  useEffect(() => {
    setNewOfferValues({
      LOAN_AMOUNT: loanAmount,
    });
  }, [loanAmount]);

  /*APIS FOR REFERESH OFFER */
  useEffect(() => {
    const offer = JSON.parse(sessionStorage.getItem("selected_offer"));
    setOfferDetails(offer);
  }, []);

  const handleSubmit = () => {
    setShowLoader(true);
    setProcessing(true);
    const payload = {
      thread_id: sessionStorage.getItem("thread_id"),
      uploadFlag: sessionStorage.getItem("document_upload_flag"),
      offer_item_id: sessionStorage.getItem("offer_item_id"),
      selected_loan_amount: loanAmount,
      state: sessionStorage.getItem("next_state"),
    };
    dispatch(agentConversation(payload)).then((res) => {
      if (res?.error && Object.keys(res?.error)?.length > 0) {
        setShowLoader(false);
        setError(true);
        setProcessing(false);
        return;
      }
      setProgressValue(50);
      setProcessing(false);
      setError(false);
      setShowLoader(false);
      sessionStorage.setItem("next_state", res?.payload?.next_state);
      setAudioResponse(res?.payload?.agent_audio_data);
      setMessageResponse(res?.payload?.agent_message);
      setUserResponse(res?.payload?.user_message);
      if (res?.payload?.data?.next_state === "resume_after_kyc_redirect") {
        navigate("/credit/kyc-page");
        setKycRedirectUrl(res?.payload?.data?.kyc_redirect_url);
      }
    });
  };

  return (
    <>
      <CustomLoader open={showLoader} />
      <AvailableOffersContainer>
        <DocumentHeaderSection>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
          >
            Available Offers
          </Typography>
          <Typography
            sx={{ fontSize: "1rem", color: "#535353", textAlign: "left" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </DocumentHeaderSection>
        <FormContainer>
          <Stack
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{
              marginY: 2,
              padding: 2,
              backgroundColor: "rgba(0, 137, 233, 0.1)",
            }}
          >
            <CelebrationIcon sx={{ color: "#0561A0" }} />
            <Typography variant="body1">
              Congratulations! You have been approved a loan of ₹
              {formatNumber(maxLoanAmount)}
            </Typography>
          </Stack>
          <Typography variant="body2">
            {offerDetails?.provider_details?.name}
          </Typography>
          <TextField
            type="text"
            label="Loan Amount"
            value={formatNumber(loanAmount)}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />

          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            You can enter up to ₹{formatNumber(maxLoanAmount)}
          </Typography>
          <SliderBox sx={{ flexGrow: 1 }}>
            <Typography variant="body2">
              ₹{formatNumber(minLoanAmount)}
            </Typography>
            <Slider
              value={Number(loanAmount)}
              onChange={handleSliderChange}
              aria-labelledby="loan-amount-slider"
              min={Number(minLoanAmount)}
              max={Number(maxLoanAmount)}
              step={1000}
              sx={{ marginX: 2, flexGrow: 1 }}
            />
            <Typography variant="body2">
              ₹{formatNumber(maxLoanAmount)}
            </Typography>
          </SliderBox>
          <Divider sx={{ marginY: 2 }} />
          <Stack
            flexDirection="row"
            gap={2}
            sx={{
              marginBottom: 1,
              backgroundColor: "#F8F8F8",
              padding: 2,
              alignItems: "center",
            }}
          >
            <InfoOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" fontSize={12} fontWeight={550}>
              The displayed EMI amount is indicative in nature, the final EMI
              amount and associated repayment details will be shown after
              proceed
            </Typography>
          </Stack>
          <Stack
            flexDirection="row"
            gap={2}
            sx={{
              backgroundColor: "#F8F8F8",
              padding: 2,
              alignItems: "center",
            }}
          >
            <InfoOutlinedIcon fontSize="small" />
            <Typography variant="subtitle2" fontSize={12} fontWeight={550}>
              You will not be able to reselect the offer amount and tenure after
              you submitted the details
            </Typography>
          </Stack>
          <Stack
            justifyContent={"center"}
            alignItems={"flex-end"}
            sx={{ marginY: "20px" }}
          >
            <Button
              sx={{ backgroundColor: "#0054BA" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </Stack>
        </FormContainer>
      </AvailableOffersContainer>
    </>
  );
};

export default CustomizeOfferPage;
