import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AudioDataContext } from "../../context/audioDataContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CustomStepperAccordion from "../../components/StepperAccordian";

const PersonalDetailsContainer = styled(Box)(({ theme }) => ({
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

const PersonalDetailsPage = () => {
  const [refreshState, setRefreshState] = useState(false);
  const { customerDetails } = useContext(AudioDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    contactNumber: "",
    pan: "",
    pincode: "",
    city: "",
    state: "",
    email: "",
    gender: "",
    addressL1: "",
    addressL2: "",
    endUse: "",
  });

  useEffect(() => {
    if (customerDetails) {
      const dobParts = customerDetails.dob
        ? customerDetails.dob.split("-")
        : null;
      const formattedDob = dobParts
        ? `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}` // Convert to YYYY-MM-DD
        : "";
      setFormData({
        firstName: customerDetails.firstName ?? "",
        lastName: customerDetails.lastName ?? "",
        dob: formattedDob,
        contactNumber: customerDetails.contactNumber ?? "",
        pan: customerDetails.pan ?? "",
        pincode: customerDetails.pincode ?? "",
        city: customerDetails.city ?? "",
        state: customerDetails.state ?? "",
        email: customerDetails.email ?? "",
        gender: customerDetails.gender ?? "",
        addressL1: customerDetails.addressL1 ?? "",
        addressL2: customerDetails.addressL2 ?? "",
        endUse: customerDetails.endUse ?? "",
      });
    }
  }, [customerDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setRefreshState(!refreshState);
  };

  const checkError = (index) => {
    switch (index) {
      case 0: // Personal Details
        return !(
          formData.firstName &&
          formData.lastName &&
          formData.dob &&
          formData.gender
        );
      case 1: // Contact Information
        return !(formData.email && formData.contactNumber && formData.pan);
      case 2: // Address Information
        return !(
          formData.addressL1 &&
          formData.addressL2 &&
          formData.city &&
          formData.state &&
          formData.pincode
        );
      default:
        return true; // Default to error if the index is not recognized
    }
  };

  const steps = [
    {
      accordionSummary: "Personal Details",
      accordionDetail: (
        <>
          <FormControl fullWidth>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <TextField
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <TextField
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="dob">Date of Birth</FormLabel>
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
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <TextField
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </FormControl>
        </>
      ),
    },
    {
      accordionSummary: "Contact Information",
      accordionDetail: (
        <>
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
            <TextField
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="pan">PAN</FormLabel>
            <TextField
              type="text"
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={handleInputChange}
            />
          </FormControl>
        </>
      ),
    },
    {
      accordionSummary: "Address Information",
      accordionDetail: (
        <>
          <FormControl fullWidth>
            <FormLabel htmlFor="addressL1">Address Line 1</FormLabel>
            <TextField
              type="text"
              id="addressL1"
              name="addressL1"
              value={formData.addressL1}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="addressL2">Address Line 2</FormLabel>
            <TextField
              type="text"
              id="addressL2"
              name="addressL2"
              value={formData.addressL2}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="city">City</FormLabel>
            <TextField
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="state">State</FormLabel>
            <TextField
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="pincode">Pincode</FormLabel>
            <TextField
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </FormControl>
        </>
      ),
    },
  ];

  return (
    <>
      <PersonalDetailsContainer>
        <DocumentHeaderSection>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
          >
            Personal Details
          </Typography>
          <Typography
            sx={{ fontSize: "1rem", color: "#535353", textAlign: "left" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </DocumentHeaderSection>
        <FormContainer>
          <CustomStepperAccordion
            steps={steps}
            checkError={checkError}
            refreshState={refreshState}
          />

          <FormControl fullWidth>
            <FormLabel htmlFor="endUse">End Use</FormLabel>
            <Select
              id="endUse"
              name="endUse"
              value={formData.endUse}
              onChange={handleInputChange}
            >
              <MenuItem value={"Consumer Durable Purchase"}>
                Consumer Durable Purchase
              </MenuItem>
              <MenuItem value={"education"}>Education</MenuItem>
              <MenuItem value={"travel"}>Travel</MenuItem>
              <MenuItem value={"health"}>Health</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </FormContainer>
        <Stack justifyContent="flex-end" mb={4}>
          <Button
            onClick={() => navigate("/credit/professionalDetails")}
            variant="contained"
          >
            Proceed for Professional Details
          </Button>
        </Stack>
      </PersonalDetailsContainer>
    </>
  );
};

export default PersonalDetailsPage;
