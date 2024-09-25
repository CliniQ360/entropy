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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomLoader from "../../components/CustomLoader";
import CelebrationIcon from "@mui/icons-material/Celebration";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

  const handleSliderChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const formatNumber = (num) => {
    const parsedNum = parseFloat(num);
    return parsedNum % 1 === 0 ? parsedNum.toFixed(0) : parsedNum.toFixed(2);
  };

  useEffect(() => {
    setLoanAmount(maxLoanAmount / 2);
  }, [maxLoanAmount]);

  useEffect(() => {
    setNewOfferValues({
      LOAN_AMOUNT: loanAmount,
    });
  }, [loanAmount]);

  /*APIS FOR REFERESH OFFER */
  // useEffect(() => {
  // const payload = {
  // };

  // dispatch(agentConversation(payload)).then((res) => {
  //   setOfferDetails(res?.payload?.data?.offer_list);
  // });
  // }, []);

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
            type="number"
            label="Loan Amount"
            value={loanAmount}
            variant="outlined"
            fullWidth
            margin="normal"
            // onChange={(e) => setLoanAmount(e.target.value)}

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
        </FormContainer>
      </AvailableOffersContainer>
    </>
  );
};

export default CustomizeOfferPage;
