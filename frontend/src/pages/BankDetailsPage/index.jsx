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
  const [error, setError] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /* USE DISPATCH */
  const dispatch = useDispatch();
  const { setAudioResponse, setMessageResponse } = useContext(MediaContext);

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
      setError(true);
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
        user_message: [JSON.stringify(formData)],
        state: sessionStorage.getItem("next_state"),
      };
      dispatch(bankLoanDataResumeConversion(payload)).then((res) => {
        setShowLoader(false);
        sessionStorage.setItem("next_state", res?.payload?.next_state);
        setAudioResponse(res?.payload?.data?.audio_file);
        setMessageResponse(res?.payload?.data?.agent_message);
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
            Bank Details
          </Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "#535353",
              fontFamily: "source sans pro",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry{" "}
          </Typography>
        </BankDetailHeader>
        <BankFormWrapper container>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl fullWidth error={!formData.accHolderName && error}>
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
                  Account Holder Name
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="accHolderName"
                value={formData.accHolderName}
                placeholder="Enter Your Bank Name"
                error={!formData.accHolderName && error}
              />
              {!formData.accHolderName && error && (
                <ErrorMessageBox>Enter Your Bank Name</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12} width={"100%"}>
            <FormControl fullWidth error={!formData.acctype && error}>
              <FormLabel>
                <Typography
                  sx={{
                    fontFamily: "source sans pro",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  Account Type
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
                      height: "40px",
                      width: "40%",
                      border:
                        !formData.acctype && error
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
                      label="Saving"
                    />
                  </Box>
                  <Box
                    sx={{
                      height: "40px",
                      width: "40%",
                      border:
                        !formData.acctype && error
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
                      label="Current"
                    />
                  </Box>
                </Box>
              </RadioGroup>
              {!formData.acctype && error && (
                <ErrorMessageBox>Select Account Type</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl fullWidth error={!formData.ifscCode && error}>
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
                  IFSC Code
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="ifscCode"
                value={formData.ifscCode}
                placeholder="Enter Your IFSC Code"
                error={!formData.ifscCode && error}
              />
              {!formData.ifscCode && error && (
                <ErrorMessageBox>Enter IFSC Number</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl fullWidth error={!formData.accNo && error}>
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
                  Account Number
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="accNo"
                value={formData.accNo}
                placeholder="Enter Your Account Number"
                error={!formData.accNo && error}
              />
              {!formData.accNo && error && (
                <ErrorMessageBox>Enter Account Number</ErrorMessageBox>
              )}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl fullWidth error={!re_num && error}>
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
                  Re-enter Account Number
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleReNumChange}
                name="re_num"
                value={re_num}
                placeholder="Enter Your Re-Account Number"
                error={!re_num && error}
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
            Submit
          </Button>
        </Stack>
      </BankDetailWrapper>
    </>
  );
};

export default BankDetailsPage;
