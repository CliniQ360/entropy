import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

const BuyerFormWrapper = styled("div")(({ theme }) => ({
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

const BuyerFormPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    politicallyExposedPerson: false,
    gstin: "",
  });
  const activeLanguage = sessionStorage.getItem("activeLanguage");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <BuyerFormWrapper>
      <DocumentHeaderSection>
        <Typography
          sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
        >
          {activeLanguage === "hi" ? "खरीदार फॉर्म" : "Buyer Form"}
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
            <FormLabel htmlFor="lastName">
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <CheckIcon
                  fontSize="8px"
                  color={formData.email ? "success" : "disabled"}
                />
                Email
              </Stack>
            </FormLabel>
            <TextField
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="lastName">
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
            <FormLabel htmlFor="dob">
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <CheckIcon
                  fontSize="8px"
                  color={formData.address ? "success" : "disabled"}
                />
                Address
              </Stack>
            </FormLabel>
            <TextField
              type="text"
              id="address"
              name="address"
              multiline
              maxRows={3}
              value={formData.address}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="dob">
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <CheckIcon
                  fontSize="8px"
                  color={formData.dob ? "success" : "disabled"}
                />
                Date of Birth
              </Stack>
            </FormLabel>
            <TextField
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="gender">
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <CheckIcon
                  fontSize="8px"
                  color={formData.gender ? "success" : "disabled"}
                />
                Gender
              </Stack>
            </FormLabel>
            <TextField
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="gstin">
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <CheckIcon
                  fontSize="8px"
                  color={formData.gstin ? "success" : "disabled"}
                />
                GSTIN
              </Stack>
            </FormLabel>
            <TextField
              type="text"
              id="gstin"
              name="gstin"
              value={formData.gstin}
              onChange={handleInputChange}
            />
          </FormControl>
        </FormBox>
      </FormContainer>
    </BuyerFormWrapper>
  );
};

export default BuyerFormPage;
