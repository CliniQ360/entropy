import {
  FormControl,
  FormHelperText,
  IconButton,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "../../components/CustomLoader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateOTP, loginUsingOtp } from "./initiateJourney.slice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EligibilityCriteriaComponent from "../../components/EligibilityCriteriaComponent";

const PageContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(10),
}));

const SahayakHeaderWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const SahayakLogo = styled(Typography)(({ theme }) => ({
  fontFamily: "Red Hat Display",
  fontWeight: 700,
  fontSize: "1.6rem",
  marginLeft: 1,
  letterSpacing: "2px",
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
}));

const Heading = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const BodyContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
}));

const LoginComponent = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "300px",
  marginTop: "10px",
  "& .LoginFields": {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
  },
});

function CheckEmptyInput(Input) {
  // Check if phone number and password are not empty
  if (!Input) {
    return { valid: false, message: "All fields are required" };
  }
  return { valid: true, message: "" };
}

const InitiateJourneyPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [resendOTP, setResendOTP] = useState(false);
  const [isStartOtp, setIsStartOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const [txnId, setTxnId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    sessionStorage.setItem("assistantType", "female");
  }, []);

  const handleMobileNumberChange = (e) => {
    const { value } = e.target;
    if (value.toString().length <= 10) setMobileNumber(value);
  };

  const showToast = (message, type) => {
    toast(message, { type });
  };
  const handleLoginUsingOTP = (value) => {
    const { valid: isMobileValid } = CheckEmptyInput(mobileNumber);
    const { valid: isOtpValid } = CheckEmptyInput(value);
    if (!isOtpValid && !isMobileValid) {
      showToast("All Fields are Required", "error");
      return;
    } else if (!isMobileValid) {
      showToast("Mobile Number is Required", "error");
      return;
    } else if (!isOtpValid) {
      showToast("OTP is Required", "error");
      return;
    } else {
      setShowLoader(true);
      const payload = {
        txnId: txnId,
        otp: value,
      };
      dispatch(loginUsingOtp(payload)).then((res) => {
        setShowLoader(false);
        console.log(res?.payload);

        if (res?.payload?.verification_status === "SUCCESS") {
          showToast("Login Succesfull!!", "success");
          const verificationStatus = res?.payload?.verification_status;
          const name = res?.payload?.user_details?.name || "";
          const role = res?.payload?.user_details?.user_role || "customer";
          sessionStorage.setItem(
            "user_details",
            JSON.stringify(res?.payload?.user_details)
          );
          sessionStorage.setItem("user_role", role);
          sessionStorage.setItem("verificationStatus", verificationStatus);
          setMobileNumber("");
          setOtp("");
          setIsStartOtp(false);
          //navigate our employee to the home page
          navigate("/");
        } else if (res?.payload?.verification_status === "FAILED") {
          showToast(res?.payload?.message, "error");
          return;
        } else {
          showToast("Try Again!!", "error");
          console.log("Error while login using OTP", res);
          return;
        }
      });
    }
  };

  const handleSendOTP = () => {
    const { valid, message } = CheckEmptyInput(mobileNumber);
    setIsStartOtp(true);
    if (!valid) {
      showToast(message, "error");
      return;
    }
    const payload = {
      mobileNumber,
    };
    setSendingOtp(true);
    dispatch(generateOTP(payload)).then((res) => {
      if (res.error) {
        showToast("Try Again!!", "error");
        setSendingOtp(false);
        return;
      }
      if (res?.payload) {
        setTxnId(res?.payload?.txn_id);
        setSendingOtp(false);
        setResendOTP(true);
        setTimeLeft(30);
        showToast("OTP Sent Successfully", "success");
      }
    });
  };

  const handleEditMobileNumber = () => {
    setResendOTP(false);
    setIsStartOtp(false);
  };

  const mobileNumError = mobileNumber !== "" && mobileNumber?.length < 10;
  return (
    <>
      <EligibilityCriteriaComponent />
      <CustomLoader open={showLoader} />
      <ToastContainer />
      <PageContainer>
        <SahayakHeaderWrapper>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: "black", fontSize: "2rem" }} />
          </IconButton>
          <SahayakLogo>Sahayak</SahayakLogo>
        </SahayakHeaderWrapper>
        <ContentContainer>
          <Heading>
            <Typography
              fontFamily={"Plus Jakarta Sans SemiBold"}
              fontSize={28}
              lineHeight={"140%"}
            >
              Simplify Your Financial Journey
            </Typography>
            {resendOTP && isStartOtp ? (
              <Stack direction={"row"} alignItems={"center"}>
                <Typography
                  fontFamily={"Source Sans Pro"}
                  fontSize={18}
                  lineHeight={"150%"}
                  color={"#535353"}
                >
                  We’ve sent the OTP to +91 {mobileNumber}
                </Typography>
                <IconButton onClick={handleEditMobileNumber}>
                  <EditOutlinedIcon sx={{ color: "#0054BA" }} />
                </IconButton>
              </Stack>
            ) : (
              <Typography
                fontFamily={"Source Sans Pro"}
                fontSize={18}
                lineHeight={"150%"}
                color={"#535353"}
              >
                Please enter your mobile number to continue
              </Typography>
            )}
          </Heading>
          <BodyContainer>
            <LoginComponent>
              <div className="LoginFields">
                {resendOTP && isStartOtp ? (
                  <>
                    <div
                      style={{
                        fontFamily: "Source Sans Pro",
                        fontSize: 16,
                        color: "#171717",
                        marginBottom: "5px",
                      }}
                    >
                      OTP
                    </div>
                    <OtpInput
                      placeholder={"000000"}
                      containerStyle={{
                        marginBottom: "10px",
                        justifyContent: "space-between",
                      }}
                      inputStyle={{
                        width: 36,
                        height: 30,
                        padding: "12px",
                        fontSize: 16,
                        borderRadius: "4px",
                        border: "1px solid #D2D2D2",
                        fontFamily: "Source Sans Pro",
                      }}
                      value={otp}
                      onChange={(value) => {
                        setOtp(value);
                        if (value.length === 6) {
                          handleLoginUsingOTP(value);
                        }
                      }}
                      numInputs={6}
                      renderInput={(props) => <input {...props} />}
                    />
                  </>
                ) : (
                  <FormControl error={mobileNumError}>
                    <div className="LoginFields">
                      <div
                        style={{
                          fontFamily: "Source Sans Pro",
                          fontSize: 16,
                          color: "#171717",
                        }}
                      >
                        Mobile Number
                      </div>
                      <TextField
                        type="number"
                        id="mobile-number"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your mobile number"
                        size="medium"
                        sx={{
                          marginTop: "5px",
                          backgroundColor: "#FFFFFF",
                          borderColor: "#D2D2D2",
                        }}
                        value={mobileNumber}
                        onChange={handleMobileNumberChange}
                        error={mobileNumber !== "" && mobileNumber?.length < 10}
                        InputProps={{
                          readOnly: resendOTP,
                        }}
                      />
                    </div>
                    {mobileNumError && (
                      <FormHelperText sx={{ ml: "0px" }}>
                        Mobile Number Should Be a 10 Digit Number
                      </FormHelperText>
                    )}
                  </FormControl>
                )}

                {!resendOTP ? (
                  <Button
                    className="LoginFields"
                    variant="contained"
                    size="large"
                    onClick={handleSendOTP}
                    sx={{ backgroundColor: "#0054BA" }}
                  >
                    <Typography
                      fontFamily="Source Sans Pro SemiBold"
                      fontSize={18}
                      color={"white"}
                    >
                      Get OTP
                    </Typography>
                  </Button>
                ) : sendingOtp ? (
                  <Button
                    sx={{ backgroundColor: "#0054BA" }}
                    className="LoginFields"
                    variant="contained"
                    disabled
                  >
                    <Typography
                      fontFamily="Source Sans Pro SemiBold"
                      fontSize={18}
                      color={"white"}
                    >
                      Sending OTP...
                    </Typography>
                  </Button>
                ) : (
                  <Stack gap={4} direction={"column"}>
                    <Button
                      className="LoginFields"
                      variant="contained"
                      onClick={handleSendOTP}
                      sx={{ backgroundColor: "#0054BA" }}
                    >
                      <Typography
                        fontFamily="Source Sans Pro SemiBold"
                        fontSize={18}
                        color={"white"}
                      >
                        Submit
                      </Typography>
                    </Button>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={1}
                    >
                      <Button
                        variant="text"
                        sx={{ padding: 0 }}
                        onClick={handleSendOTP}
                        disabled={timeLeft > 0}
                      >
                        <Typography
                          fontFamily="Source Sans Pro SemiBold"
                          fontSize={18}
                          color={"#0054BA"}
                          lineHeight={"150%"}
                          textTransform={"none"}
                        >
                          Resend OTP
                        </Typography>
                      </Button>{" "}
                      {timeLeft > 0 && (
                        <Typography
                          fontFamily="Source Sans Pro"
                          fontSize={18}
                          color={"#535353"}
                          lineHeight={"150%"}
                        >
                          in {timeLeft}s
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                )}
              </div>
            </LoginComponent>
          </BodyContainer>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default InitiateJourneyPage;

/*

 */
