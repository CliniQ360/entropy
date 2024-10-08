import React, { useContext, useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import AgentHeader from "../../components/AgentHeaderComponent";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { bankLoanDataResumeConversion } from "../CreditPage/audioAgent.slice";
import CustomLoader from "../../components/CustomLoader";
import { MediaContext } from "../../context/mediaContext";
import { AudioDataContext } from "../../context/audioDataContext";
import { useNavigate } from "react-router-dom";

const BankDetailWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(5),
}));
const BankDetailHeader = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));
const BankFormWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const BankFormWrapperItem = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const RadioItemGroup = styled(Stack)(({ theme }) => ({
  width: "40%",
  height: "40px",
  padding: theme.spacing(2),
  marginRight: theme.spacing(4),
  marginTop: 4,
  display: "flex",
  flexDirection: "row",
  //   alignItems: "center",
  justifyContent: "flex-start",
  border: "1px solid #D2D2D2",
  borderRadius: "5px",
}));

const ErrorMessageBox = styled(FormHelperText)(({ theme }) => ({
  margin: "4px 0",
}));

const BankDetailsPage = () => {
  const [formData, setFormData] = useState({
    accHolderName: "",
    acctype: "",
    accNo: "",
    ifscCode: "",
  });
  const [re_num, setRe_num] = useState("");
  const [validateError, setValidateError] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const activeLanguage = sessionStorage.getItem("activeLanguage");
  const navigate = useNavigate();

  /* USE DISPATCH */
  const dispatch = useDispatch();
  const {
    setAudioResponse,
    setMessageResponse,
    setError,
    setProgressValue,
    setUserResponse,
  } = useContext(MediaContext);
  const { setEMandateRedirectUrl } = useContext(AudioDataContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      acctype: value,
    }));
  };

  useEffect(() => {
    if (formData.accNo === re_num) {
      setIsMatched(false);
    } else {
      setIsMatched(true);
    }
  });

  const checkError = () => {
    if (
      !formData.accHolderName ||
      !formData.acctype ||
      !formData.accNo ||
      !formData.ifscCode ||
      formData.accNo !== re_num
    ) {
      setValidateError(true);
      return true;
    }
    return false;
  };

  const handleReNumChange = (event) => {
    setRe_num(event.target.value);
  };

  const handleSubmit = () => {
    let isError = checkError();
    if (!isError) {
      setShowLoader(true);
      const payload = {
        thread_id: sessionStorage.getItem("thread_id"),
        user_message: [
          `My Account Holder Name is ${formData?.accHolderName}, my account type is ${formData?.acctype}, my ifsc code is ${formData?.ifscCode} and my ACCOUNT NUMBER IS ${formData?.accNo}.`,
        ],
        state: sessionStorage.getItem("next_state"),
        language: sessionStorage.getItem("activeLanguage"),
      };
      dispatch(bankLoanDataResumeConversion(payload)).then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setShowLoader(false);
          setError(true);
          return;
        }
        setProgressValue(70);
        setError(false);
        setShowLoader(false);
        sessionStorage.setItem("next_state", res?.payload?.next_state);
        setAudioResponse(res?.payload?.agent_audio_data);
        setMessageResponse(res?.payload?.agent_message);
        setUserResponse(res?.payload?.user_message);
        sessionStorage.setItem(
          "customer_details",
          JSON.stringify(res?.payload?.customer_details)
        );
        if (res?.payload?.next_state === "resume_after_emdt_redirect") {
          navigate("/credit/emandate-page");
          setEMandateRedirectUrl(res?.payload?.emndt_redirect_url);
        }
      });
    } else {
      console.log("Not Matched");
    }
  };

  return (
    <>
      <CustomLoader open={showLoader} />
      <BankDetailWrapper>
        <BankDetailHeader>
          <Typography
            sx={{
              fontSize: "1.43rem",
              fontWeight: 700,
              fontFamily: "plus jakarta sans bold",
            }}
          >
            {activeLanguage === "hi" ? "बैंक विवरण" : "Bank Details"}
          </Typography>
        </BankDetailHeader>
        <BankFormWrapper container>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl
              fullWidth
              error={!formData.accHolderName && validateError}
            >
              <FormLabel
                sx={{
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "source sans pro",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  {activeLanguage === "hi"
                    ? "खाता धारक का नाम"
                    : "Account Holder Name"}
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="accHolderName"
                value={formData.accHolderName}
                placeholder={
                  activeLanguage === "hi"
                    ? "अपने बैंक का नाम दर्ज क"
                    : "Enter Your Bank Name"
                }
                error={!formData.accHolderName && validateError}
              />
              {!formData.accHolderName && validateError && (
                <ErrorMessageBox>Enter Your Bank Name</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12} width={"100%"}>
            <FormControl fullWidth error={!formData.acctype && validateError}>
              <FormLabel>
                <Typography
                  sx={{
                    fontFamily: "source sans pro",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  {activeLanguage === "hi" ? "खाता प्रकार" : "Account Type"}
                </Typography>
              </FormLabel>
              {/* <RadioGroup
                onChange={handleRadioChange}
                value={formData.acctype}
                row
              >
                <RadioItemGroup>
                  <FormControlLabel
                    sx={{ height: "100%", mr: 0, ml: "1px" }}
                    value="Savings"
                    name="Savings"
                    control={<Radio />}
                  />
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography
                      sx={{ fontSize: "1.2rem", fontFamily: "source sans pro" }}
                    >
                      Saving
                    </Typography>
                  </Stack>
                </RadioItemGroup>
                <RadioItemGroup>
                  <FormControlLabel
                    sx={{ height: "100%", mr: 0, ml: "1px" }}
                    value="current"
                    name="current"
                    control={<Radio />}
                  />
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography
                      sx={{ fontSize: "1.2rem", fontFamily: "source sans pro" }}
                    >
                      Current
                    </Typography>
                  </Stack>
                </RadioItemGroup>
              </RadioGroup> */}
              <RadioGroup
                onChange={handleRadioChange}
                value={formData.acctype}
                row
              >
                <Box
                  sx={{
                    height: "56px",
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "row", sm: "row" },
                    marginBottom: { xs: "10px", sm: "0px" },
                  }}
                >
                  <Box
                    sx={{
                      height: "50px",
                      width: "40%",
                      border:
                        !formData.acctype && validateError
                          ? "1px solid red"
                          : "1px solid lightGray",
                      padding: "5px 10px",
                      margin: {
                        xs: "10px 15px 10px 5px",
                        sm: "0px 15px 0px 5px",
                      },
                      borderRadius: "5px",
                    }}
                  >
                    <FormControlLabel
                      value="Savings"
                      name="Savings"
                      control={<Radio />}
                      label={activeLanguage === "hi" ? "बचत" : "Saving"}
                    />
                  </Box>
                  <Box
                    sx={{
                      height: "50px",
                      width: "40%",
                      border:
                        !formData.acctype && validateError
                          ? "1px solid red"
                          : "1px solid lightGray",
                      padding: "5px 10px",
                      margin: {
                        xs: "10px 15px 10px 5px",
                        sm: "0px 15px 0px 5px",
                      },
                      borderRadius: "5px",
                    }}
                  >
                    <FormControlLabel
                      value="current"
                      name="current"
                      control={<Radio />}
                      label={activeLanguage === "hi" ? "चालू" : "Current"}
                    />
                  </Box>
                </Box>
              </RadioGroup>
              {!formData.acctype && validateError && (
                <ErrorMessageBox>Select Account Type</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl fullWidth error={!formData.ifscCode && validateError}>
              <FormLabel
                sx={{
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "source sans pro",
                    fontSize: "1.2rem",
                  }}
                >
                  {activeLanguage === "hi" ? "आईएफएससी कोड" : "IFSC Code "}
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="ifscCode"
                value={formData.ifscCode}
                placeholder={
                  activeLanguage === "hi"
                    ? "अपना आईएफएससी कोड दर्ज करें"
                    : "Enter Your IFSC Code"
                }
                error={!formData.ifscCode && validateError}
              />
              {!formData.ifscCode && validateError && (
                <ErrorMessageBox>Enter IFSC Number</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl fullWidth error={!formData.accNo && validateError}>
              <FormLabel
                sx={{
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "source sans pro",
                    fontSize: "1.2rem",
                  }}
                >
                  {activeLanguage === "hi" ? "खाता संख्या" : "Account Number"}
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="accNo"
                value={formData.accNo}
                placeholder={
                  activeLanguage === "hi"
                    ? "अपनी खाता संख्या दर्ज करें"
                    : "Enter Your Account Number"
                }
                error={!formData.accNo && validateError}
              />
              {!formData.accNo && validateError && (
                <ErrorMessageBox>Enter Account Number</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl fullWidth error={!re_num && validateError}>
              <FormLabel
                sx={{
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "source sans pro",
                    fontSize: "1.2rem",
                  }}
                >
                  {activeLanguage === "hi"
                    ? "खाता संख्या पुनः दर्ज करें"
                    : "Re-enter Account Number"}
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleReNumChange}
                name="re_num"
                value={re_num}
                placeholder={
                  activeLanguage === "hi"
                    ? "अपनी खाता संख्या पुनः दर्ज करें"
                    : "Enter Your Re-Account Number"
                }
                error={!re_num && validateError}
              />
              <Typography color={"red"}>
                {isMatched && re_num !== "" && "Not matched"}
              </Typography>
            </FormControl>
          </BankFormWrapperItem>
        </BankFormWrapper>
        <Stack mt={5} justifyContent={"center"} alignItems={"flex-end"}>
          <Button
            sx={{
              backgroundColor: "#0054BA",
              boxShadow: "none",
              textTransform: "none",
              fontWeight: 500,
              letterSpacing: "2px",
              fontSize: "1.2rem",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            {activeLanguage === "hi" ? "आगे बढ़े" : "Proceed"}
          </Button>
        </Stack>
      </BankDetailWrapper>
    </>
  );
};

export default BankDetailsPage;
