import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

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

const ProfessionalDetailsPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    officialEmail: "",
    employmentType: "",
    income: "",
    udyamNumber: "",
  });

  const [formData3, setFormData3] = useState({
    aa_id: "",
    bureauConsent: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
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
        <FormControl fullWidth>
          <FormLabel htmlFor="udyamNumber">Udyam Number</FormLabel>
          <TextField
            type="text"
            id="udyamNumber"
            name="udyamNumber"
            value={formData.udyamNumber}
            onChange={handleInputChange}
          />
        </FormControl>
      </FormContainer>
    </ProfessionalDetailsContainer>
  );
};

export default ProfessionalDetailsPage;
