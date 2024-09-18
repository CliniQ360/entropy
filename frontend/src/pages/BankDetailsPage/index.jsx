import React, { useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import AgentHeader from "../../components/AgentHeaderComponent";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

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

const BankDetailsPage = () => {
  const [formData, setFormData] = useState({
    accHolderName: "",
    acctype: "",
    accNo: "",
    ifscCode: "",
    re_num: "",
  });

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
    console.log(formData);
  });
  return (
    <>
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
            <FormControl
              fullWidth
              //   error={!formData.accHolderName && textFieldError}
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
                  Account Holder Name
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="accHolderName"
                value={formData.accHolderName}
                placeholder="Enter Your Bank Name"
                // error={!formData.accHolderName && textFieldError}
              />
              {/* {!formData.accHolderName && textFieldError && (
                <ErrorMessageBox>Enter Your Bank Name</ErrorMessageBox>
              )} */}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12} width={"100%"}>
            <FormControl
              fullWidth
              //   error={!formData.acctype && textFieldError}
            >
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
              <RadioGroup
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
              </RadioGroup>

              {/* {!formData.acctype && textFieldError && (
                <ErrorMessageBox>Select Account Type</ErrorMessageBox>
              )} */}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl
              fullWidth
              //   error={!formData.accHolderName && textFieldError}
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
                  IFSC Code
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="ifscCode"
                value={formData.ifscCode}
                placeholder="Enter Your IFSC Code"
                // error={!formData.accHolderName && textFieldError}
              />
              {/* {!formData.accHolderName && textFieldError && (
                <ErrorMessageBox>Enter Your Bank Name</ErrorMessageBox>
              )} */}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl
              fullWidth
              //   error={!formData.accHolderName && textFieldError}
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
                  Account Number
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="accNo"
                value={formData.accNo}
                placeholder="Enter Your Account Number"
                // error={!formData.accHolderName && textFieldError}
              />
              {/* {!formData.accHolderName && textFieldError && (
                <ErrorMessageBox>Enter Your Bank Name</ErrorMessageBox>
              )} */}
            </FormControl>
          </BankFormWrapperItem>
          <BankFormWrapperItem sm={12} xs={12}>
            <FormControl
              fullWidth
              //   error={!formData.accHolderName && textFieldError}
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
                  Re-enter Account Number
                </Typography>
              </FormLabel>
              <TextField
                onChange={handleInputChange}
                name="re_num"
                value={formData.re_num}
                placeholder="Enter Your Re-Account Number"
                // error={!formData.accHolderName && textFieldError}
              />
              {/* {!formData.accHolderName && textFieldError && (
                <ErrorMessageBox>Enter Your Bank Name</ErrorMessageBox>
              )} */}
            </FormControl>
          </BankFormWrapperItem>
        </BankFormWrapper>
      </BankDetailWrapper>
    </>
  );
};

export default BankDetailsPage;
