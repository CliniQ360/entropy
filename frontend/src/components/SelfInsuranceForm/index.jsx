import React, { useContext, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Box,
  FormLabel,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { submitInsuranceForm } from "../../pages/InsuranceRegistration/insurance.slice";
import { insuranceSearch } from "../../pages/InsuranceRegistration/insurance.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../CustomLoader";
import CustomSnackbar from "../CustomSnackbar";
import { Element, scroller } from "react-scroll";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { MediaContext } from "../../context/mediaContext";
import { AudioDataContext } from "../../context/audioDataContext";

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 10,
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "-webkit-fill-available",
  gap: theme.spacing(4),
}));

const SelfInsuranceForm = () => {
  const environment = sessionStorage.getItem("environment");
  const { messageResponse } = useContext(MediaContext);
  const { insuranceCustomerRegistration } = useContext(AudioDataContext);
  const txnId = sessionStorage.getItem("txnId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const activeLanguage = sessionStorage.getItem("activeLanguage");
  const personalDetailsRef = React.useRef(null);
  const contactDetailsRef = React.useRef(null);
  const addressInfoRef = React.useRef(null);
  const medicalInfoRef = React.useRef(null);
  const financialInfoRef = React.useRef(null);
  const physicalInfoRef = React.useRef(null);

  const [individualInfo, setIndividualInfo] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    dob: "",
    relation: "self",
    email: "",
    phone: "",
    address: "",
    panIndia: false,
    pincode: "",
    PED: "No",
    diabetes: "No",
    bloodPressure: "No",
    heartAilments: "No",
    other: "No",
    heightfoot: "",
    heightinch: "",
    weight: "",
    amount: "",
    politicallyExposedPerson: false,
    gstin: "",
  });

  useEffect(() => {
    if (insuranceCustomerRegistration) {
      const dobParts = insuranceCustomerRegistration.dob
        ? insuranceCustomerRegistration.dob.split("-")
        : null;
      const formattedDob = dobParts
        ? `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}` // Convert to YYYY-MM-DD
        : "";

      console.log(
        "insuranceCustomerRegistration",
        insuranceCustomerRegistration
      );

      setIndividualInfo({
        firstName: insuranceCustomerRegistration.firstName ?? "",
        lastName: insuranceCustomerRegistration.lastName ?? "",
        gender: insuranceCustomerRegistration.gender ?? "M",
        dob: insuranceCustomerRegistration.dob ?? "",
        relation: insuranceCustomerRegistration.relation ?? "self",
        email: insuranceCustomerRegistration.email ?? "",
        phone: insuranceCustomerRegistration.phone ?? "",
        address: insuranceCustomerRegistration.address ?? "",
        panIndia: insuranceCustomerRegistration.panIndia ?? false,
        pincode: insuranceCustomerRegistration.pincode ?? "",
        PED: insuranceCustomerRegistration.any_pre_existing_disease ?? "No",
        diabetes: insuranceCustomerRegistration.diabetes ?? "No",
        bloodPressure: insuranceCustomerRegistration.bloodPressure ?? "No",
        heartAilments: insuranceCustomerRegistration.heartAilments ?? "No",
        other: insuranceCustomerRegistration.other ?? "No",
        heightfoot: insuranceCustomerRegistration.heightfoot ?? "",
        heightinch: insuranceCustomerRegistration.heightinch ?? "",
        weight: insuranceCustomerRegistration.weight ?? "",
        amount: insuranceCustomerRegistration.amount ?? "",
        politicallyExposedPerson:
          insuranceCustomerRegistration.politicallyExposedPerson ?? "No",
        gstin: insuranceCustomerRegistration.gstin ?? "",
      });
    }
  }, [insuranceCustomerRegistration]);

  const handleScrollToSection = (sectionName) => {
    console.log(`Scrolling to ${sectionName}`);
    scroller.scrollTo(sectionName, {
      duration: 1200,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50,
    });
  };

  useEffect(() => {
    if (!messageResponse) return;
    const personalKeywords = [
      "personal details",
      "first name",
      "last name",
      "dob",
      "gender",
      "पहला नाम",
      "अंतिम नाम",
      "जन्म तिथि",
      "लिंग बताएं",
      "लिंग",
    ];

    const contactKeywords = [
      "contact information",
      "email",
      "phone",
      "mobile",
      "contact",
      "व्यक्तिगत ईमेल आईडी",
      "पैन नंबर",
      "फ़ोन",
      "संपर्क नंबर",
      "संपर्क",
    ];

    const medicalKeyword = [
      "diabetes",
      "heartAilments",
      "bloodPressure",
      "pre-existing diseases",
    ];

    const addressKeywords = ["pincode", "address", "पता", "पिन कोड"];
    const financialKeywords = ["amount", "sum "];
    const physicalKeywords = ["height", "weight "];

    const includesKeyword = (keywords) =>
      keywords.some((keyword) =>
        messageResponse.toLowerCase().includes(keyword)
      );

    // Scroll logic only when a specific keyword is detected
    if (includesKeyword(personalKeywords)) {
      handleScrollToSection("personal-details");
    } else if (includesKeyword(addressKeywords)) {
      handleScrollToSection("address-info");
    } else if (includesKeyword(contactKeywords)) {
      handleScrollToSection("contact-details");
    } else if (includesKeyword(physicalKeywords)) {
      handleScrollToSection("physical-info");
    } else if (includesKeyword(medicalKeyword)) {
      handleScrollToSection("medical-info");
    } else if (includesKeyword(financialKeywords)) {
      handleScrollToSection("financial-info");
    }
  }, [messageResponse]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? (checked ? value : "") : value;
    setIndividualInfo((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const checkError = (index) => {
    const isNA = (value) => value === "N/A";

    switch (index) {
      case 0: // Personal Details
        return (
          !(
            individualInfo.firstName &&
            individualInfo.lastName &&
            individualInfo.dob &&
            individualInfo.gender &&
            individualInfo.relation
          ) ||
          [
            individualInfo.firstName,
            individualInfo.lastName,
            individualInfo.dob,
            individualInfo.gender,
            individualInfo.relation,
          ].some(isNA)
        );

      case 1: // Contact Information
        return (
          !(individualInfo.email && individualInfo.phone) ||
          [individualInfo.email, individualInfo.phone].some(isNA)
        );

      case 2: // Address Information
        return (
          !(individualInfo.address && individualInfo.pincode) ||
          [individualInfo.address, individualInfo.pincode].some(isNA)
        );

      case 3: // Medical Details
        return !(
          individualInfo.PED &&
          typeof individualInfo.diabetes &&
          typeof individualInfo.bloodPressure &&
          typeof individualInfo.heartAilments &&
          typeof individualInfo.other
        );

      case 4: // Physical Details
        return (
          !(
            individualInfo.heightfoot &&
            individualInfo.heightinch &&
            individualInfo.weight
          ) ||
          [
            individualInfo.heightfoot,
            individualInfo.heightinch,
            individualInfo.weight,
          ].some(isNA)
        );

      case 5: // Financial Information
        return !(
          (
            individualInfo.amount &&
            typeof individualInfo.politicallyExposedPerson
          )
          // && individualInfo.panIndia
        );

      default:
        return true; // Default to error if the index is not recognized
    }
  };

  const steps = [
    {
      accordionSummary:
        activeLanguage === "hi" ? "व्यक्तिगत विवरण" : "Personal Details",
      accordionDetail: (
        <Element name="personal-details">
          <FormBox ref={personalDetailsRef} id="personal-details">
            <FormControl fullWidth>
              <FormLabel htmlFor="firstName">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.firstName ? "success" : "disabled"}
                  />
                  First Name
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="firstName"
                name="firstName"
                value={individualInfo.firstName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="lastName">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.lastName ? "success" : "disabled"}
                  />
                  Last Name
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="lastName"
                name="lastName"
                value={individualInfo.lastName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="dob">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.dob ? "success" : "disabled"}
                  />
                  Date of Birth
                </Stack>
              </FormLabel>
              <TextField
                type="date"
                id="dob"
                name="dob"
                value={individualInfo.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="gender">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.gender ? "success" : "disabled"}
                  />
                  Gender
                </Stack>
              </FormLabel>
              <Stack flexDirection={"row"} alignItems={"center"} mx={5} gap={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={individualInfo.gender === "Male"}
                      onChange={handleChange}
                      name="gender"
                      value="Male"
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={individualInfo.gender === "Female"}
                      onChange={handleChange}
                      name="gender"
                      value="Female"
                    />
                  }
                  label="Female"
                />
              </Stack>
            </FormControl>
          </FormBox>
        </Element>
      ),
    },
    {
      accordionSummary:
        activeLanguage === "hi" ? "पता जानकारी" : "Address Information",
      accordionDetail: (
        <Element name="address-info">
          <FormBox ref={addressInfoRef} id="address-info">
            <FormControl fullWidth>
              <FormLabel htmlFor="address">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.address ? "success" : "disabled"}
                  />
                  Address
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="address"
                name="address"
                value={individualInfo.address}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="pincode">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.pincode ? "success" : "disabled"}
                  />
                  Pincode
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="pincode"
                name="pincode"
                value={individualInfo.pincode}
                onChange={handleChange}
              />
            </FormControl>
          </FormBox>
        </Element>
      ),
    },
    {
      accordionSummary:
        activeLanguage === "hi" ? "संपर्क जानकारी" : "Contact Information",
      accordionDetail: (
        <Element name="contact-details">
          <FormBox ref={contactDetailsRef} id="contact-details">
            <FormControl fullWidth>
              <FormLabel htmlFor="email">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.email ? "success" : "disabled"}
                  />
                  Email
                </Stack>
              </FormLabel>
              <TextField
                type="email"
                id="email"
                name="email"
                value={individualInfo.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="phone">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.phone ? "success" : "disabled"}
                  />
                  Phone
                </Stack>
              </FormLabel>
              <TextField
                type="tel"
                id="phone"
                name="phone"
                value={individualInfo.phone}
                onChange={handleChange}
              />
            </FormControl>
          </FormBox>
        </Element>
      ),
    },
    {
      accordionSummary:
        activeLanguage === "hi" ? "चिकित्सा जानकारी" : "Physical Information",
      accordionDetail: (
        <Element name="physical-info">
          <FormBox ref={physicalInfoRef} id="physical-info">
            <FormControl fullWidth>
              <FormLabel htmlFor="heightfoot">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.heightfoot ? "success" : "disabled"}
                  />
                  Height (Foot)
                </Stack>
              </FormLabel>
              <TextField
                type="number"
                id="heightfoot"
                name="heightfoot"
                value={individualInfo.heightfoot}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="heightinch">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.heightinch ? "success" : "disabled"}
                  />
                  Height (Inch)
                </Stack>
              </FormLabel>
              <TextField
                type="number"
                id="heightinch"
                name="heightinch"
                value={individualInfo.heightinch}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="weight">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.weight ? "success" : "disabled"}
                  />
                  Weight
                </Stack>
              </FormLabel>
              <TextField
                type="number"
                id="weight"
                name="weight"
                value={individualInfo.weight}
                onChange={handleChange}
              />
            </FormControl>
          </FormBox>
        </Element>
      ),
    },
    {
      accordionSummary:
        activeLanguage === "hi" ? "चिकित्सा जानकारी" : "Medical Information",
      accordionDetail: (
        <Element name="medical-info">
          <FormBox ref={medicalInfoRef} id="medical-info">
            <FormControl fullWidth>
              <FormLabel htmlFor="PED">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.PED ? "success" : "disabled"}
                  />
                  Pre-Existing Diseases (PED)
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="PED"
                name="PED"
                value={individualInfo.PED}
                onChange={handleChange}
              />
            </FormControl>

            {/* TextField for Diabetes */}
            <FormControl fullWidth>
              <FormLabel htmlFor="diabetes">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.diabetes ? "success" : "disabled"}
                  />
                  Diabetes
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="diabetes"
                name="diabetes"
                value={individualInfo.diabetes}
                onChange={handleChange}
              />
            </FormControl>

            {/* TextField for Blood Pressure */}
            <FormControl fullWidth>
              <FormLabel htmlFor="bloodPressure">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={
                      individualInfo.bloodPressure ? "success" : "disabled"
                    }
                  />
                  Blood Pressure
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="bloodPressure"
                name="bloodPressure"
                value={individualInfo.bloodPressure}
                onChange={handleChange}
              />
            </FormControl>

            {/* TextField for Heart Ailments */}
            <FormControl fullWidth>
              <FormLabel htmlFor="heartAilments">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={
                      individualInfo.heartAilments ? "success" : "disabled"
                    }
                  />
                  Heart Ailments
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="heartAilments"
                name="heartAilments"
                value={individualInfo.heartAilments}
                onChange={handleChange}
              />
            </FormControl>

            {/* TextField for Other Conditions */}
            <FormControl fullWidth>
              <FormLabel htmlFor="other">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.other ? "success" : "disabled"}
                  />
                  Other Conditions
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="other"
                name="other"
                value={individualInfo.other}
                onChange={handleChange}
              />
            </FormControl>
          </FormBox>
        </Element>
      ),
    },

    {
      accordionSummary:
        activeLanguage === "hi" ? "वित्तीय जानकारी" : "Financial Information",
      accordionDetail: (
        <Element name="financial-info">
          <FormBox ref={financialInfoRef} id="financial-info">
            <FormControl fullWidth>
              <FormLabel htmlFor="amount">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.amount ? "success" : "disabled"}
                  />
                  Amount
                </Stack>
              </FormLabel>
              <TextField
                type="number"
                id="amount"
                name="amount"
                value={individualInfo.amount}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="panIndia">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.panIndia ? "success" : "disabled"}
                  />
                  pan India
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="panIndia"
                name="panIndia"
                value={individualInfo.panIndia}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="politicallyExposedPerson">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.other ? "success" : "disabled"}
                  />
                  Political Exposure
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="politicallyExposedPerson"
                name="politicallyExposedPerson"
                value={individualInfo.politicallyExposedPerson}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="gstin">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={individualInfo.gstin ? "success" : "disabled"}
                  />
                  GSTIN
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="gstin"
                name="gstin"
                value={individualInfo.gstin}
                onChange={handleChange}
              />
            </FormControl>
          </FormBox>
        </Element>
      ),
    },
  ];

  return (
    <Box>
      <CustomLoader open={showLoader} />
      <CustomSnackbar
        open={showSnackbar}
        message={"Something Went Wrong"}
        status={"error"}
        onClose={() => setShowSnackbar(false)}
      />

      <FormContainer>
        {steps.map((step, index) => (
          <Stack flexDirection={"column"} gap={5} mb={5}>
            <Stack flexDirection={"row"} alignItems={"center"}>
              <Box mr={2}>
                {!checkError(index) ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CheckCircleIcon color="disabled" />
                )}
              </Box>
              <Typography
                fontSize={"18px"}
                fontWeight={"bold"}
                fontFamily={"Plus Jakarta Sans Bold"}
              >
                {step.accordionSummary}
              </Typography>
            </Stack>
            <Stack flexDirection={"column"} gap={2}>
              {step.accordionDetail}
            </Stack>
          </Stack>
        ))}
      </FormContainer>
    </Box>
  );
};

export default SelfInsuranceForm;
