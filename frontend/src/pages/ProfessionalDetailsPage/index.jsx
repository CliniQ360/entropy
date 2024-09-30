import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  FormLabel,
  Slide,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "../../context/mediaContext";
import { AudioDataContext } from "../../context/audioDataContext";
import { creditStatusCheck } from "../TransactionStatus/transactionStatus.Slice";
import { useDispatch } from "react-redux";
import CustomLoader from "../../components/CustomLoader";
import { useNavigate } from "react-router-dom";
import { agentConversation } from "../CreditPage/audioAgent.slice";
import RedirectionDialogComponent from "../../components/RedirectionDialogComponent";

const ProfessionalDetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(6),
}));

const DocumentHeaderSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfessionalDetailsPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    officialEmail: "",
    employmentType: "",
    income: "",
    // udyamNumber: "",
  });
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const { customerDetails } = useContext(AudioDataContext);
  const {
    nextState,
    setError,
    setAudioResponse,
    setMessageResponse,
    setProgressValue,
    setUserResponse,
    setProcessing,
  } = useContext(MediaContext);
  const [showLoader, setShowLoader] = useState(false);
  const [redirectionVal, setRedirectionVal] = useState(false);
  const [aaRedirectUrl, setAaRedirectUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let form_aa_URL;

  useEffect(() => {
    console.log("The Next Step From Response is ", nextState);
    if (nextState === "submit_form") {
      setShowLoader(true);
      setProcessing(true);
      const payload = {
        threadId: sessionStorage.getItem("thread_id"),
        uploadFlag: sessionStorage.getItem("document_upload_flag"),
        state: sessionStorage.getItem("next_state"),
      };
      dispatch(agentConversation(payload)).then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setError(true);
          setProcessing(false);
          setShowLoader(false);
          return;
        }
        setError(false);
        setShowLoader(false);
        setProcessing(false);
        sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
        setAudioResponse(res?.payload?.data?.agent_audio_data);
        setMessageResponse(res?.payload?.data?.agent_message);
        setUserResponse(res?.payload?.data?.user_message);
        setAaRedirectUrl(res?.payload?.data?.aa_redirect_url);
        if (res?.payload?.data?.next_state === "resume_after_aa_redirect") {
          setConfirmationDialog(true);
        }
      });
    }
  }, [nextState]);

  useEffect(() => {
    if (customerDetails) {
      setFormData({
        companyName: customerDetails?.companyName ?? "",
        officialEmail: customerDetails?.officialEmail ?? "",
        employmentType: customerDetails?.employmentType ?? "",
        income: customerDetails?.income ?? "",
      });
    }
  }, [customerDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
            threadId: sessionStorage.getItem("thread_id"),
            uploadFlag: sessionStorage.getItem("document_upload_flag"),
            state: sessionStorage.getItem("next_state"),
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

  return (
    <>
      <CustomLoader open={showLoader} />
      <RedirectionDialogComponent
        open={redirectionVal}
        setOpen={setRedirectionVal}
      />
      <ProfessionalDetailsContainer>
        <DocumentHeaderSection>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
          >
            Professional Details
          </Typography>
          <Typography
            sx={{ fontSize: "1rem", color: "#535353", textAlign: "left" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </DocumentHeaderSection>
        <FormContainer>
          <FormControl fullWidth>
            <FormLabel htmlFor="companyName">Company Name</FormLabel>
            <TextField
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="officialEmail">Official Email</FormLabel>
            <TextField
              type="text"
              id="officialEmail"
              name="officialEmail"
              value={formData.officialEmail}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="employmentType">Employment Type</FormLabel>
            <TextField
              type="text"
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="contactNumber">Income</FormLabel>
            <TextField
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* <FormControl fullWidth>
          <FormLabel htmlFor="udyamNumber">Udyam Number</FormLabel>
          <TextField
            type="text"
            id="udyamNumber"
            name="udyamNumber"
            value={formData.udyamNumber}
            onChange={handleInputChange}
          />
        </FormControl> */}
        </FormContainer>
      </ProfessionalDetailsContainer>
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
            Please don't exit or press back.
            <br />
            Please wait while we are redirecting you to the Verification Page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogSubmit("YES")}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfessionalDetailsPage;
