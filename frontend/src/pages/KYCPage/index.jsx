import React, { useContext, useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import AgentHeader from "../../components/AgentHeaderComponent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { agentConversation } from "../CreditPage/audioAgent.slice";
import { useDispatch } from "react-redux";
import { creditStatusCheck } from "../TransactionStatus/transactionStatus.Slice";
import CustomLoader from "../../components/CustomLoader";
import { AudioDataContext } from "../../context/audioDataContext";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../../context/mediaContext";
import RedirectionDialogComponent from "../../components/RedirectionDialogComponent";

const KYCWrapper = styled("div")(({ theme }) => ({
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
const KYCPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [redirectionVal, setRedirectionVal] = useState(false);
  const { kycRedirectUrl } = useContext(AudioDataContext);
  const { setAudioResponse, setMessageResponse, setError } =
    useContext(MediaContext);

  let kyc_url;

  useEffect(() => {
    if (sessionStorage.getItem("next_state") === "resume_after_kyc_redirect") {
      setTimeout(() => {
        setConfirmationDialog(true);
      }, 4000);
    }
  }, [kycRedirectUrl]);

  const handleDialogSubmit = (value) => {
    if (value === "YES") {
      setIsFlying(true);
      setTimeout(() => {
        setConfirmationDialog(false);
        setIsFlying(false);
      }, 1000);
      setTimeout(() => {
        kyc_url = window.open(kycRedirectUrl, "_blank");
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
        if (selectResponse?.redirection_status === "KYC_APPROVED") {
          kyc_url.close();
          setRedirectionVal(false);
          setShowLoader(true);
          clearInterval(id);
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
              return;
            }

            setShowLoader(false);
            sessionStorage.setItem(
              "next_state",
              res?.payload?.data?.next_state
            );
            setAudioResponse(res?.payload?.data?.audio_file);
            setMessageResponse(res?.payload?.data?.agent_message);
            if (
              res?.payload?.data?.next_state ===
              "human_account_details_feedback"
            ) {
              navigate("/credit/account-details");
            }
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
      <RedirectionDialogComponent open={redirectionVal} />
      <KYCWrapper>
        <Stack gap={4}>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontFamily: "Plus Jakarta Sans bold",
            }}
          >
            KYC
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
      </KYCWrapper>

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

export default KYCPage;
