import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AudioDataContext } from "../../context/audioDataContext";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { creditStatusCheck } from "../TransactionStatus/transactionStatus.Slice";
import { MediaContext } from "../../context/mediaContext";
import { agentConversation } from "../CreditPage/audioAgent.slice";
import { Element, scroller } from "react-scroll";
import CustomLoader from "../../components/CustomLoader";
import CustomTimer from "../../components/CustomTimer";

const PersonalDetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: theme.spacing(0, 4),
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

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 10,
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

const PersonalDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refreshState, setRefreshState] = useState(false);
  const {
    nextState,
    setError,
    setAudioResponse,
    setMessageResponse,
    messageResponse,
    setProgressValue,
    setUserResponse,
    setProcessing,
  } = useContext(MediaContext);
  const [showLoader, setShowLoader] = useState(false);
  const { customerDetails, setOfferDetails } = useContext(AudioDataContext);
  const personalDetailsRef = useRef(null);
  const contactDetailsRef = useRef(null);
  const addressInfoRef = useRef(null);
  const professionDetailsRef = useRef(null);
  const activeLanguage = sessionStorage.getItem("activeLanguage");

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
    companyName: "",
    officialEmail: "",
    employmentType: "",
    income: "",
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
      console.log(customerDetails?.endUse?.toLowerCase());

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
        companyName: customerDetails?.companyName ?? "",
        officialEmail: customerDetails?.officialEmail ?? "",
        employmentType: customerDetails?.employmentType ?? "",
        income: customerDetails?.income ?? "",
        endUse: customerDetails?.endUse?.toLowerCase() ?? "",
      });
    }
  }, [customerDetails]);

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

    const addressKeywords = [
      "address information",
      "address Line 1",
      "address Line 2",
      "city",
      "zip",
      "address",
      "pan",
      "पता",
      "पता लाइन 1",
      "पता लाइन 2",
      "शहर",
      "पिन कोड",
      "राज्य",
    ];

    const professionKeywords = [
      "professional details",
      "job",
      "occupation",
      "company",
      "work",
      "employment type",
      "income",
      "official email id",
      "रोजगार",
      "कंपनी",
      "व्यवसाय",
      "कंपनी",
      "कार्य",
      "रोजगार प्रकार",
      "आय",
      "आधिकारिक ईमेल आईडी",
    ];

    const includesKeyword = (keywords) =>
      keywords.some((keyword) =>
        messageResponse.toLowerCase().includes(keyword)
      );

    // Scroll logic only when a specific keyword is detected
    if (includesKeyword(personalKeywords)) {
      console.log("Personal Detected");
      handleScrollToSection("personal-details");
    } else if (includesKeyword(professionKeywords)) {
      console.log("Professional Detected");
      handleScrollToSection("profession-section");
    } else if (includesKeyword(contactKeywords)) {
      console.log("Contact Detected");
      handleScrollToSection("contact-details");
    } else if (includesKeyword(addressKeywords)) {
      console.log("Address Detected");
      handleScrollToSection("address-info");
    }
  }, [messageResponse]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setRefreshState(!refreshState);
  };

  useEffect(() => {
    console.log("The Next State is : ", nextState);
    if (
      nextState === "get_bureau_based_offers" ||
      sessionStorage.getItem("next_state") === "get_bureau_based_offers"
    ) {
      setShowLoader(true);
      setProcessing(true);
      const payload = {
        threadId: sessionStorage.getItem("thread_id"),
        uploadFlag: sessionStorage.getItem("document_upload_flag"),
        state: sessionStorage.getItem("next_state"),
        language: sessionStorage.getItem("activeLanguage"),
      };
      dispatch(agentConversation(payload)).then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setError(true);
          setProcessing(false);
          setShowLoader(false);
          return;
        }
        setError(false);
        setShowLoader(false);
        setProcessing(false);
        sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
        sessionStorage.setItem("txn_id", res?.payload?.data?.txn_id);
        setAudioResponse(res?.payload?.data?.agent_audio_data);
        setMessageResponse(res?.payload?.data?.agent_message);
        setUserResponse(res?.payload?.data?.user_message);
        setOfferDetails(res?.payload?.data?.offer_list);

        if (res?.payload?.data?.next_state === "human_bureau_offer_feedback") {
          navigate("/credit/availableOffers");
        }
      });
    }
  }, [nextState]);

  const checkError = (index) => {
    const isNA = (value) => value === "N/A";

    switch (index) {
      case 0: // Personal Details
        return (
          !(
            formData.firstName &&
            formData.lastName &&
            formData.dob &&
            formData.gender
          ) ||
          [
            formData.firstName,
            formData.lastName,
            formData.dob,
            formData.gender,
          ].some(isNA)
        );
      case 1: // Contact Information
        return (
          !(formData.email && formData.contactNumber && formData.pan) ||
          [formData.email, formData.contactNumber, formData.pan].some(isNA)
        );
      case 2: // Address Information
        return (
          !(
            formData.addressL1 &&
            formData.addressL2 &&
            formData.city &&
            formData.state &&
            formData.pincode
          ) ||
          [
            formData.addressL1,
            formData.addressL2,
            formData.city,
            formData.state,
            formData.pincode,
          ].some(isNA)
        );
      case 3: // Professional Details
        return (
          !(
            formData.companyName &&
            formData.officialEmail &&
            formData.employmentType &&
            formData.income
          ) ||
          [
            formData.companyName,
            formData.officialEmail,
            formData.employmentType,
            formData.income,
          ].some(isNA)
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
              <FormLabel htmlFor="contactNumber">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.contactNumber ? "success" : "disabled"}
                  />
                  Contact Number
                </Stack>
              </FormLabel>
              <TextField
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="pan">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.pan ? "success" : "disabled"}
                  />
                  PAN
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="pan"
                name="pan"
                value={formData.pan}
                onChange={handleInputChange}
              />
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
              <FormLabel htmlFor="addressL1">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.addressL1 ? "success" : "disabled"}
                  />
                  Address Line 1
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="addressL1"
                name="addressL1"
                value={formData.addressL1}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="addressL2">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.addressL2 ? "success" : "disabled"}
                  />
                  Address Line 2
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="addressL2"
                name="addressL2"
                value={formData.addressL2}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="city">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.city ? "success" : "disabled"}
                  />
                  City
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="state">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.state ? "success" : "disabled"}
                  />
                  State
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="pincode">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.pincode ? "success" : "disabled"}
                  />
                  Pincode
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormBox>
        </Element>
      ),
    },
    {
      accordionSummary:
        activeLanguage === "hi" ? "व्यावसायिक विवरण" : "Professional Details",
      accordionDetail: (
        <Element name="profession-section">
          <Box ref={professionDetailsRef} id="profession-section">
            <FormControl fullWidth>
              <FormLabel htmlFor="companyName">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.companyName ? "success" : "disabled"}
                  />
                  Company Name
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="officialEmail">
                {" "}
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.officialEmail ? "success" : "disabled"}
                  />
                  Official Email
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="officialEmail"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="employmentType">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.employmentType ? "success" : "disabled"}
                  />
                  Employment Type
                </Stack>
              </FormLabel>
              <TextField
                type="text"
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="contactNumber">
                <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                  <CheckIcon
                    fontSize="8px"
                    color={formData.income ? "success" : "disabled"}
                  />
                  Income
                </Stack>
              </FormLabel>
              <TextField
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
              />
            </FormControl>
            {/* <FormControl fullWidth>
          <FormLabel htmlFor="udyamNumber">Udyam Number</FormLabel>
          <TextField
            type="text"
            id="udyamNumber"
            name="udyamNumber"
            value={formData.udyamNumber}
            onChange={handleInputChange}
          />
        </FormControl> */}
          </Box>
        </Element>
      ),
    },
  ];

  return (
    <>
      <CustomTimer open={showLoader} />
      <PersonalDetailsContainer>
        <DocumentHeaderSection>
          <Typography
            sx={{ fontSize: "1.4rem", fontWeight: 700, textAlign: "left" }}
          >
            {activeLanguage === "hi" ? "ग्राहक विवरण" : "Customer Details"}
          </Typography>
        </DocumentHeaderSection>
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

          <FormControl fullWidth>
            <FormLabel htmlFor="endUse">
              {" "}
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <CheckIcon
                  fontSize="8px"
                  color={formData.endUse ? "success" : "disabled"}
                />
                End Use
              </Stack>
            </FormLabel>
            <Select
              id="endUse"
              name="endUse"
              value={formData.endUse}
              onChange={handleInputChange}
            >
              <MenuItem value={"Consumer Durable Purchase"}>
                Consumer Durable Purchase
              </MenuItem>
              <MenuItem value={"education" || "Education"}>Education</MenuItem>
              <MenuItem value={"travel" || "Travel"}>Travel</MenuItem>
              <MenuItem value={"health" || "Health"}>Health</MenuItem>
              <MenuItem value={"other" || "Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </FormContainer>
        {/* <Stack justifyContent="flex-end" mb={4}>
          <Button
            onClick={() => navigate("/credit/professionalDetails")}
            variant="contained"
          >
            Proceed for Professional Details
          </Button>
        </Stack> */}
      </PersonalDetailsContainer>
    </>
  );
};

export default PersonalDetailsPage;
