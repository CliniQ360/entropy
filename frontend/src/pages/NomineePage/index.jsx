import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { AudioDataContext } from "../../context/audioDataContext";
import { Button } from "react-scroll";
import { creditStatusCheck } from "../TransactionStatus/transactionStatus.Slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../../context/mediaContext";
import { agentConversationForInsurance } from "../InsurancePage/audioAgent.slice";
import RedirectionDialogComponent from "../../components/RedirectionDialogComponent";

const NomineeFormWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: theme.spacing(0, 4),
  gap: theme.spacing(6),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(4),
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 10,
}));

const DocumentHeaderSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
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

const NomineeFormPage = () => {
  const { insuranceNomineeForm, insurancePaymentUrl } =
    useContext(AudioDataContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    relation: "",
  });
  const activeLanguage = sessionStorage.getItem("activeLanguage");
  const {
    setAudioResponse,
    setMessageResponse,
    setError,
    setProgressValue,
    setUserResponse,
    setProcessing,
  } = useContext(MediaContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (insuranceNomineeForm) {
      setFormData(insuranceNomineeForm);
    }
  }, [insuranceNomineeForm]);

  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [redirectionVal, setRedirectionVal] = useState(false);
  let kyc_url;

  useEffect(() => {
    if (sessionStorage.getItem("next_state") === "human_payment_redirect") {
      setTimeout(() => {
        setConfirmationDialog(true);
      }, 4000);
    }
  }, [insurancePaymentUrl]);

  const handleDialogSubmit = (value) => {
    if (value === "YES") {
      setIsFlying(true);
      setTimeout(() => {
        setConfirmationDialog(false);
        setIsFlying(false);
      }, 1000);
      setTimeout(() => {
        kyc_url = window.open(insurancePaymentUrl, "_blank");
      }, 1800);
      fetchTransactionStatus();
    } else {
      setRedirectionVal(false);
      setConfirmationDialog(false);
      return;
    }
  };

  const fetchTransactionStatus = () => {
    setTimeout(() => {
      setRedirectionVal(true);
    }, 1100);
    const payload = {
      txnId: sessionStorage.getItem("txn_id"),
      offerId: sessionStorage.getItem("offer_item_id"),
    };
    const id = setInterval(() => {
      dispatch(creditStatusCheck(payload)).then((res) => {
        const selectResponse = res?.payload;
        if (selectResponse?.redirection_status === "PAYMENT_APPROVED") {
          kyc_url.close();
          setRedirectionVal(false);
          setShowLoader(true);
          clearInterval(id);
          setProcessing(true);
          const secondpayload = {
            threadId: sessionStorage.getItem("thread_id"),
            uploadFlag: sessionStorage.getItem("document_upload_flag"),
            state: sessionStorage.getItem("next_state"),
            language: sessionStorage.getItem("activeLanguage"),
          };
          dispatch(agentConversationForInsurance(secondpayload)).then((res) => {
            if (res?.error && Object.keys(res?.error)?.length > 0) {
              setShowLoader(false);
              setError(true);
              setProcessing(false);
              return;
            }
            setError(false);
            setShowLoader(false);
            setProcessing(false);
            setProgressValue(60);
            sessionStorage.setItem(
              "next_state",
              res?.payload?.data?.next_state
            );
            setAudioResponse(res?.payload?.data?.agent_audio_data);
            setMessageResponse(res?.payload?.data?.agent_message);
            setUserResponse(res?.payload?.data?.user_message);

            navigate("/insurance/insurance-order-detail");
          });
        } else {
          console.log("Error Occured");
        }
      });
    }, 3000);
  };

  return (
    <>
      <RedirectionDialogComponent
        open={redirectionVal}
        setOpen={setRedirectionVal}
      />
      <NomineeFormWrapper>
        <DocumentHeaderSection>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
          >
            {activeLanguage === "hi" ? "नामित फॉर्म" : "Nominee Form"}
          </Typography>
        </DocumentHeaderSection>
        <FormContainer>
          <FormBox id="personal-details">
            <FormControl fullWidth>
              <FormLabel htmlFor="firstName">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.firstName ? "success" : "disabled"}
                  />
                  First Name
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="lastName">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.lastName ? "success" : "disabled"}
                  />
                  Last Name
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="phone_number">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.email ? "success" : "disabled"}
                  />
                  Phone Number
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="relation">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.relation ? "success" : "disabled"}
                  />
                  Relation
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormBox>
        </FormContainer>
      </NomineeFormWrapper>
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
              ? "कृपया प्रतीक्षा करें, हम आपको केवाईसी पेज पर रीडायरेक्ट कर रहे हैं।"
              : " Please wait while we are redirecting you to the KYC Page."}
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

export default NomineeFormPage;
