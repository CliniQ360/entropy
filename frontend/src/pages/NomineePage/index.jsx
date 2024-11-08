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

const NomineeFormPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    relation: "",
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
  );
};

export default NomineeFormPage;
