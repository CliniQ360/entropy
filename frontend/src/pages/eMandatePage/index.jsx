import {
  Stack,
  styled,
  Typography,
  Slide,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import AgentHeader from "../../components/AgentHeaderComponent";
import SubmitDialogBox from "../../components/SubmitDialogComponent";
import { AudioDataContext } from "../../context/audioDataContext";
import { useDispatch } from "react-redux";
import { creditStatusCheck } from "../TransactionStatus/transactionStatus.Slice";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../../context/mediaContext";
import { agentConversation } from "../CreditPage/audioAgent.slice";
import CustomLoader from "../../components/CustomLoader";
import RedirectionDialogComponent from "../../components/RedirectionDialogComponent";

const EMandateWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
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
const EmandatePage = () => {
  const { eMandateRedirectUrl, setOfferList } = useContext(AudioDataContext);
  const {
    setAudioResponse,
    setMessageResponse,
    setError,
    setProgressValue,
    setUserResponse,
    setProcessing,
  } = useContext(MediaContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [redirectionVal, setRedirectionVal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  let emandate_url;
  let payment_url;

  useEffect(() => {
    if (sessionStorage.getItem("next_state") === "resume_after_emdt_redirect") {
      setTimeout(() => {
        setConfirmationDialog(true);
      }, 4000);
    }
  }, [eMandateRedirectUrl]);

  const handleDialogSubmit = (value) => {
    if (value === "YES") {
      setIsFlying(true);
      setTimeout(() => {
        setConfirmationDialog(false);
        setIsFlying(false);
      }, 1000);
      setTimeout(() => {
        emandate_url = window.open(eMandateRedirectUrl, "_blank");
      }, 1800);
      fetchTransactionStatus();
    } else {
      setRedirectionVal(false);
      setConfirmationDialog(false);
      return;
    }
  };

  /* handlePaymentDialogSubmit*/

  const handlePaymentDialogSubmit = (value) => {
    if (value === "YES") {
      setTimeout(() => {
        setConfirmation(false);
      }, 1000);
      setTimeout(() => {
        payment_url = window.open(paymentUrl, "_blank");
      }, 1800);
      fetchEmandateTransactionStatus();
    } else {
      setRedirectionVal(false);
      setConfirmation(false);
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
        if (selectResponse?.redirection_status === "EMNDT_APPROVED") {
          emandate_url.close();
          setRedirectionVal(false);
          setShowLoader(true);
          clearInterval(id);
          setProcessing(true);
          const secondpayload = {
            threadId: sessionStorage.getItem("thread_id"),
            uploadFlag: sessionStorage.getItem("document_upload_flag"),
            state: sessionStorage.getItem("next_state"),
            offer_item_id: sessionStorage.getItem("offer_item_id"),
            selected_loan_amount: sessionStorage.getItem("selected_amt"),
          };
          dispatch(agentConversation(secondpayload)).then((res) => {
            if (res?.error && Object.keys(res?.error)?.length > 0) {
              setShowLoader(false);
              setError(true);
              setProcessing(false);
              return;
            }
            setProgressValue(80);
            setError(false);
            setShowLoader(false);
            setProcessing(false);
            sessionStorage.setItem(
              "next_state",
              res?.payload?.data?.next_state
            );
            setAudioResponse(res?.payload?.data?.agent_audio_data);
            setMessageResponse(res?.payload?.data?.agent_message);
            setUserResponse(res?.payload?.data?.user_message);
            setPaymentUrl(res?.payload?.data?.loan_signing_redirect_url);
            setTimeout(() => {
              setConfirmation(true);
            }, 5000);
          });
        } else {
          console.log("Error Occured");
        }
      });
    }, 3000);
  };

  const fetchEmandateTransactionStatus = () => {
    setTimeout(() => {
      setRedirectionVal(true);
    }, 200);
    const payload = {
      txnId: sessionStorage.getItem("txn_id"),
      offerId: sessionStorage.getItem("offer_item_id"),
    };
    const id = setInterval(() => {
      dispatch(creditStatusCheck(payload)).then((res) => {
        const selectResponse = res?.payload;
        if (selectResponse?.redirection_status === "LOAN_AGRMT_APPROVED") {
          payment_url.close();
          setRedirectionVal(false);
          setShowLoader(true);
          clearInterval(id);
          setProgressValue(90);
          setProcessing(true);
          const secondpayload = {
            threadId: sessionStorage.getItem("thread_id"),
            uploadFlag: sessionStorage.getItem("document_upload_flag"),
            state: sessionStorage.getItem("next_state"),
            offer_item_id: sessionStorage.getItem("offer_item_id"),
            selected_loan_amount: sessionStorage.getItem("selected_amt"),
          };
          dispatch(agentConversation(secondpayload)).then((res) => {
            if (res?.error && Object.keys(res?.error)?.length > 0) {
              setShowLoader(false);
              setProcessing(false);
              setError(true);
              return;
            }
            setError(false);
            setProgressValue(100);
            setShowLoader(false);
            setProcessing(false);
            sessionStorage.setItem(
              "next_state",
              res?.payload?.data?.next_state
            );
            setAudioResponse(res?.payload?.data?.agent_audio_data);
            setMessageResponse(res?.payload?.data?.agent_message);
            setUserResponse(res?.payload?.data?.user_message);
            setOfferList(res?.payload?.data?.final_offer);
            sessionStorage.setItem("cracker_animation", true);
            navigate("/credit/offer-page", {
              state: res?.payload?.data?.loan_agreement_url,
            });
          });
        } else {
          console.log("Error Occured");
        }
      });
    }, 3000);
  };

  return (
    <>
      <CustomLoader open={showLoader} />
      <RedirectionDialogComponent
        open={redirectionVal}
        setOpen={setRedirectionVal}
      />
      <SubmitDialogBox
        confirmation={confirmation}
        setConfirmation={setConfirmation}
        handlePaymentDialogSubmit={handlePaymentDialogSubmit}
      />
      <EMandateWrapper>
        <Stack gap={4}>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 700,
              fontFamily: "Plus Jakarta Sans bold",
            }}
          >
            E-Mandate
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "#535353",
              fontFamily: "source sans pro",
            }}
          >
            I, hereby declare that I am voluntarily sharing my Aadhaar Number
            and demographic information issued by UIDAI, with National Health
            Authority (NHA) for the sole purpose of creation of ABHA number . I
            understand that my ABHA number can be used and shared for purposes
            as may be notified by ABDM from time to time including provision of
            healthcare services.
          </Typography>
        </Stack>
      </EMandateWrapper>
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
            Please wait while we are redirecting you to the E-Mandate Page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogSubmit("YES")}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmandatePage;
