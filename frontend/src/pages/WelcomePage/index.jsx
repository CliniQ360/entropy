import {
  Stack,
  styled,
  Typography,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SahayakHeader from "../../components/SahayakHeader";
import { TypeAnimation } from "react-type-animation";
import femaleAst from "../../assets/v4DesignImages/Patners/femalenewAst.png";
import { useNavigate } from "react-router-dom";
import adityaCapital from "../../assets/v4DesignImages/Patners/1.png";
import ADBM from "../../assets/v4DesignImages/Patners/2.png";
import adityaBirlaInsurance from "../../assets/v4DesignImages/Patners/6.png";
import Karnataka from "../../assets/v4DesignImages/Patners/4.png";
import ondc from "../../assets/v4DesignImages/Patners/5.png";
import dmi from "../../assets/v4DesignImages/Patners/3.png";
import Marquee from "react-marquee-slider";
import SahayakFooter from "../../components/SahayakFooter";
import credit from "../../assets/v4DesignImages/Patners/Credit.png";
import insurance from "../../assets/v4DesignImages/Patners/insurance.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SchoolIcon from "@mui/icons-material/School";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AodIcon from "@mui/icons-material/Aod";
import bg1 from "../../assets/v4DesignImages/bg/bgEligibility.png";
import bg2 from "../../assets/v4DesignImages/bg/loanImg.png";
import bg3 from "../../assets/v4DesignImages/bg/SahayakHeader.png";
import bg4 from "../../assets/v4DesignImages/bg/bg4.png";
import InsuranceIcon from "../../assets/v4DesignImages/Icons/insuranceIcon.png";
import handIndexIcon from "../../assets/v4DesignImages/Icons/1.png";
import HealthLoanIcon from "../../utils/CustomIcons/healthLoanIcon";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WelcomePageWrapper = styled("div")(({ theme }) => ({}));

const WelcomePageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: 1.6,
  fontFamily: "Source Sans Pro",
  color: "#535353",
  marginTop: theme.spacing(2),
}));

const FinancialContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundImage: `url(${bg3})`,
  // backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center bottom",
  position: "relative",
}));

const ServiceTypesWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(3),
  margin: "30px 0",
}));

const ServiceTypesContainer = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffffdb",
  borderRadius: "10px",
}));

const ServiceIcon = styled("div")(({ theme, img, index }) => ({
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: index === 1 ? "22px" : "30px",
  width: index === 1 ? "22px" : "30px",
}));

const CustomizedButton = styled(Button)(({ theme, type }) => ({
  boxShadow: "none",
  backgroundColor: "#0054BA",
  width: "92%",
  position: "absolute",
  color: "white",
  padding: theme.spacing(2),
  bottom: -20,
  margin: (2, 0),
  textTransform: "none",
  fontSize: "1rem",
}));

const MeetOurAgentWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginTop: "40px",
  justifyContent: "space-between",
  alignItems: "center",
  height: "550px",
  width: "100%",
  backgroundImage: `url(${femaleAst})`,
  // backgroundRepeat: "no-repeat",
  backgroundSize: "100% 550px",
}));

const AssistantChangeSectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(5),
}));

const ActionChangeSectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  borderRadius: "30px",
  backgroundColor: "#ffffff4a",
  width: "250px",
  height: "40px", // Increase height slightly if needed
  position: "relative",
}));

const Slider = styled("div")(({ activeButton }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 2,
  position: "absolute",
  top: 4,
  left: activeButton === 0 ? 0 : "50%",
  width: "47%", // Slightly smaller than 50% to add padding space on the edges
  height: "80%", // Adjust height to create space for ToggleButton padding
  backgroundColor: "#ffffff4a",
  boxShadow: "inset 0 0 6px 1px #5f5a5a",
  borderRadius: "30px",
  transition: "left 0.3s ease-in-out",
}));

const ToggleButton = styled(Button)(({ theme, isActive }) => ({
  zIndex: 1,
  backgroundColor: "transparent",
  color: "white",
  width: "50%",
  height: "100%",
  textTransform: "none",
  fontFamily: "Source Sans pro",
  fontWeight: isActive ? 400 : 200,
  fontSize: "1.3rem",
  transition: "color 0.3s ease-in-out",
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const AssistantNameChangeWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
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
  padding: theme.spacing(2),
}));

// const MeetOurAgentContainer = styled(Stack)(({ theme }) => ({
//   borderRadius: "10px",
//   border: "3px solid #f4f4f4",
// }));

// const MeetOurAgentContainerBody = styled(Stack)(({ theme, type }) => ({
//   padding: theme.spacing(3),
//   gap: theme.spacing(1),
//   justifyContent: "center",
//   alignItems: "center",
// }));

const PatnersContainer = styled("div")(({ theme }) => ({
  // padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-around",
  gap: theme.spacing(2),
  marginTop: "50px",
}));

const TrustedPatnerContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const PatnerLogoContainer = styled("div")(({ theme }) => ({
  height: "70px",
  width: "168px",
  borderRadius: "10px",
  boxShadow: "0px 6px 7px 5px #b9b9b930",
  display: "flex",
  justifyContent: "center",
  margin: theme.spacing(3),
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    marginRight: "30px",
  },
}));

const PatnersLogo = styled("img")(({ theme }) => ({
  height: "60px",
  width: "100px",
  filter: "saturate(1%)",
  // WebkitFilter: "grayscale(100%)",
  objectFit: "contain",
}));

const PatnerLogoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  overflow: "hidden",
  width: "100%",
}));

const OuterWrapper = styled("div")({
  width: "100%",
  overflow: "hidden",
  margin: "30px 0px",
});

const CreditServicesInfoWrapper = styled(Stack)(({ theme }) => ({
  overflowX: "scroll",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  paddingInline: theme.spacing(4), // Padding inside scroll area without extra space
  boxSizing: "border-box",
}));

const ServiceCard = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
  backgroundColor: "#0054ba2b",
  gap: theme.spacing(1),
  width: "fit-content",
  border: "2px solid #f4f4f4",
  borderRadius: "5px",
  flexShrink: 0,
}));

const ServiceIconContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "white",
}));

const EmpowerWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  backgroundColor: "#F8F8F8",
}));

const EmpowerCardContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  padding: theme.spacing(6),
  gap: theme.spacing(3),
  borderRadius: "5px",
  boxShadow: "0px 6px 7px 5px #b9b9b930",
  backgroundColor: "white",
}));

const EmpowerIconContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "white",
  border: "1px solid #f4f4f4",
  flexShrink: 0,
}));

const EmpowerTextContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginLeft: theme.spacing(2),
}));

const ContactUsWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: "#FBFBFB",
  padding: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "40px",
}));

const ContactUsContainer = styled(Stack)(({ theme }) => ({
  width: "80%",
  padding: theme.spacing(6),
  gap: theme.spacing(2),
  backgroundImage: `url(${bg4})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center ",
  borderRadius: "6px",
  justifyContent: "center",
  alignItem: "center",
}));

const ContactButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "#0054BA",
  textTransform: "none",
  fontFamily: "Source Sans Pro SemiBold",
  fontSize: "1.3rem",
  margin: "20px 0",
  padding: theme.spacing(2),
  width: "100%",
  "&:hover": {
    backgroundColor: "#f0f0f0", // Optional: hover background color
  },
  "&:active": {
    backgroundColor: "#d0e6ff", // Background color when clicked
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    minWidth: "90%", // Ensures the minimum width of the dialog is 80% of the viewport
    width: "90%", // Sets the initial width to 80%
    maxWidth: "none",
    borderRadius: "10px", // Prevents Material-UI's maxWidth from overriding it
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogHeaderContent = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
}));

const DialogFormContent = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3),
  flexDirection: "column",
}));

const ErrorMessageBox = styled(FormHelperText)(({ theme }) => ({
  margin: "4px 0",
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const partners = [
  { id: 2, image: adityaCapital },
  { id: 4, image: Karnataka },
  { id: 5, image: dmi },
  { id: 2, image: adityaCapital },
  { id: 4, image: Karnataka },
  { id: 5, image: dmi },
];

const empowerInfoCard = [
  {
    title: "24/7 Assistance",
    body: "Get instant support anytime, anywhere.",
    src: <HealthLoanIcon />,
  },
  {
    title: "Personalized Solutions",
    body: "Tailored recommendations based on your unique needs.",
    src: <HealthLoanIcon />,
  },
  {
    title: "Quick Issue Resolution",
    body: "Solve problems and get answers fast.",
    src: <HealthLoanIcon />,
  },
  {
    title: "Easy Navigation",
    body: "Intuitive design for a smooth user experience.",
    src: <HealthLoanIcon />,
  },
];

const creditServicesArr = [
  {
    serviceType: "Health",
    serviceIcon: <FavoriteBorderIcon sx={{ fontSize: "2.1rem" }} />,
  },
  {
    serviceType: "Education",
    serviceIcon: <SchoolIcon sx={{ fontSize: "2.1rem" }} />,
  },
  {
    serviceType: "Travel",
    serviceIcon: <FlightTakeoffIcon sx={{ fontSize: "2.1rem" }} />,
  },
  {
    serviceType: "Others",
    serviceIcon: <AodIcon sx={{ fontSize: "2.1rem" }} />,
  },
];

const financialService = [
  {
    title: "Personal Loan",
    src: handIndexIcon,
  },
  {
    title: "Health Insurance",
    src: InsuranceIcon,
  },
];

const serviceStyling = {
  fontSize: "2rem",
};

function CustomAccordion({ acordianHeading, acordianContent, expanded }) {
  return (
    <Accordion defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "black", fontSize: 24 }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          padding: "16px",
        }}
      >
        <Typography
          fontFamily={"Plus Jakarta Sans SemiBold"}
          fontSize={18}
          lineHeight={"110%"}
        >
          {acordianHeading}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          p: "24px 12px",
        }}
      >
        <Typography
          fontFamily={"Source Sans Pro"}
          fontSize={16}
          lineHeight={"150%"}
          color={"black"}
        >
          {acordianContent}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeButton, setActiveButton] = useState(0);
  const [open, setOpen] = useState(false);
  const [validateError, setValidateError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    mobile_number: "",
    first_name: "",
    last_name: "",
    message: "",
  });

  const checkError = () => {
    if (
      !formData.mobile_number ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.message
    ) {
      setValidateError(true);
      return true;
    }
    return false;
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
    if (index === 0) {
      sessionStorage.setItem("serviceType", "insurance");
    } else if (index === 1) {
      sessionStorage.setItem("serviceType", "credit");
    }
  };

  const handleNavigate = () => {
    if (activeButton === 0) {
      console.log("navigating to insurance");
    } else if (activeButton === 1) {
      console.log("navigating to credit");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasError = checkError();
    if (hasError) {
      return;
    }
    const payload = {
      ...formData,
      lead_category: "HIMS",
    };
    console.log(payload);
  };

  const handleFormData = (event) => {
    const { name, value } = event.target;

    if (name === "mobile_number" && value.length > 10) {
      return;
    }

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const Faq = [
    {
      faqQuestion: "What is CliniQ360?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion: "What is ABDM?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion: "What is PRM?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion: "What is connected Health care?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion: "How do I participate?",
      faqAnswer: "abcd answer",
    },
  ];

  return (
    <>
      <SahayakHeader />
      <WelcomePageWrapper>
        <WelcomePageContainer>
          <FinancialContainer>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "plus jakarta sans bold",
                color: "black",
                fontSize: "1.8rem",
              }}
            >
              Start your Financial Journey with our{" "}
              <span
                style={{
                  background: "linear-gradient(-75deg, #0054BA, #2888FC)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Smart Agents.
              </span>
            </Typography>
            <StyledTypography>
              Our smart agent delivers personalized assistance, helping you take
              action and stay in control of your financial journey.
            </StyledTypography>
            <ServiceTypesWrapper container>
              {financialService.map((item, index) => (
                <ServiceTypesContainer key={index} item xs={5.8} sm={5.8}>
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ height: "30px" }}
                  >
                    <ServiceIcon img={item?.src} index={index}></ServiceIcon>
                  </Stack>
                  <Typography sx={{ fontFamily: "plus jakarta sans bold" }}>
                    {item.title}
                  </Typography>
                </ServiceTypesContainer>
              ))}
            </ServiceTypesWrapper>
            <CustomizedButton>Meet Our Agents</CustomizedButton>
          </FinancialContainer>

          <PatnersContainer>
            <TrustedPatnerContainer>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "1.4rem",
                  color: "#000000",
                }}
                fontFamily={"Plus Jakarta Sans bold"}
              >
                Our Trusted Partners
              </Typography>
            </TrustedPatnerContainer>
            <PatnerLogoWrapper>
              <Marquee velocity={10}>
                {partners.concat(partners).map((item, index) => (
                  <PatnerLogoContainer key={index}>
                    <PatnersLogo src={item?.image}></PatnersLogo>
                  </PatnerLogoContainer>
                ))}
              </Marquee>
            </PatnerLogoWrapper>
            <PatnerLogoWrapper>
              <Marquee velocity={10} direction="reverse">
                {partners.concat(partners).map((item, index) => (
                  <PatnerLogoContainer key={index}>
                    <PatnersLogo src={item?.image}></PatnersLogo>
                  </PatnerLogoContainer>
                ))}
              </Marquee>
            </PatnerLogoWrapper>
          </PatnersContainer>
          <MeetOurAgentWrapper>
            <AssistantChangeSectionWrapper>
              <ActionChangeSectionContainer>
                <Slider activeButton={activeButton} />
                <ToggleButton
                  onClick={() => handleButtonClick(0)}
                  isActive={activeButton === 0}
                >
                  Insurance
                </ToggleButton>
                <ToggleButton
                  onClick={() => handleButtonClick(1)}
                  isActive={activeButton === 1}
                >
                  Credit
                </ToggleButton>
              </ActionChangeSectionContainer>
            </AssistantChangeSectionWrapper>
            <AssistantNameChangeWrapper>
              <Typography
                sx={{
                  fontFamily: "Source Sans Pro SemiBold",
                  fontSize: "2rem",
                  color: "White",
                }}
              >
                Meet Name
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Source Sans Pro ",
                  fontSize: "1rem",
                  color: "#D2D2D2",
                  textAlign: "center",
                }}
              >
                Get personalized credit advice and quick support to find the
                right coverage effortlessly.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#0054BA",
                  textTransform: "none",
                  fontFamily: "Source Sans Pro ",
                  fontSize: "1.1rem",
                  marginBottom: 3,
                }}
                onClick={handleNavigate}
              >
                Get {activeButton === 0 ? "Insurance" : "Credit"}
              </Button>
            </AssistantNameChangeWrapper>
          </MeetOurAgentWrapper>
          <OuterWrapper>
            <CreditServicesInfoWrapper>
              {creditServicesArr.map((item, index) => (
                <ServiceCard key={index}>
                  <ServiceIconContainer>
                    <IconButton>{item?.serviceIcon}</IconButton>
                  </ServiceIconContainer>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "Source Sans Pro SemiBold",
                      fontSize: "1.3rem",
                      marginLeft: 2,
                    }}
                  >
                    {item?.serviceType}
                  </Typography>
                </ServiceCard>
              ))}
            </CreditServicesInfoWrapper>
          </OuterWrapper>
          <EmpowerWrapper>
            <Stack mt={6} gap={2}>
              <Typography
                sx={{
                  fontFamily: "plus jakarta sans semibold",
                  fontSize: "1.8rem",
                }}
              >
                Innovations that Empower Your Journey
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Source Sans pro",
                  fontSize: "1.2rem",
                  color: "#535353",
                }}
              >
                Discover the powerful features that make managing your insurance
                and credit effortless.
              </Typography>
            </Stack>
            <Stack mt={4} gap={4}>
              {empowerInfoCard.map((item, index) => (
                <EmpowerCardContainer key={index}>
                  <EmpowerIconContainer>
                    <IconButton>{item.src}</IconButton>
                  </EmpowerIconContainer>
                  <EmpowerTextContainer>
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        fontFamily: "plus jakarta sans bold",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontFamily: "Source Sans pro",
                        color: "#535353",
                      }}
                    >
                      {item.body}
                    </Typography>
                  </EmpowerTextContainer>
                </EmpowerCardContainer>
              ))}
            </Stack>
          </EmpowerWrapper>
          {Faq?.map((faq, index) => (
            <CustomAccordion
              acordianHeading={faq.faqQuestion}
              acordianContent={faq.faqAnswer}
            />
          ))}
          <ContactUsWrapper>
            <ContactUsContainer>
              <Typography
                sx={{
                  fontFamily: "Source Sans Pro SemiBold",
                  fontSize: "1.7rem",
                  color: "White",
                  textAlign: "center",
                }}
              >
                We're Here to Help{" "}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Source Sans Pro ",
                  fontSize: "1rem",
                  color: "#D2D2D2",
                  textAlign: "center",
                }}
              >
                Get personalized credit advice and quick support to find the
                right coverage effortlessly.
              </Typography>
              <ContactButton variant="contained" onClick={handleClickOpen}>
                Contact Us
              </ContactButton>
            </ContactUsContainer>
          </ContactUsWrapper>
        </WelcomePageContainer>
      </WelcomePageWrapper>
      <SahayakFooter />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        TransitionComponent={Transition}
      >
        <DialogHeaderContent>
          <Stack>
            <Typography
              sx={{
                fontFamily: "plus jakarta sans semibold",
                fontSize: "1.5rem",
              }}
            >
              Contact Us
            </Typography>
          </Stack>
          <Stack>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon sx={{ fontSize: "2rem", color: "#000000" }} />
            </IconButton>
          </Stack>
        </DialogHeaderContent>
        <DialogFormContent>
          <FormContainer>
            <FormBox id="personal-details">
              <Stack mb={5}>
                <FormControl
                  fullWidth
                  error={!formData.first_name && validateError}
                >
                  <FormLabel
                    htmlFor="first_name"
                    sx={{ marginBottom: "5px", color: "#171717" }}
                  >
                    First Name
                  </FormLabel>
                  <TextField
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    placeholder="First name"
                    onChange={handleFormData}
                    fullWidth
                    error={!formData.first_name && validateError}
                  />

                  {!formData.first_name && validateError && (
                    <ErrorMessageBox>Enter Your First Name</ErrorMessageBox>
                  )}
                </FormControl>
              </Stack>
              <Stack mb={5}>
                <FormControl
                  fullWidth
                  error={!formData.last_name && validateError}
                >
                  <FormLabel sx={{ marginBottom: "5px", color: "#171717" }}>
                    Last Name
                  </FormLabel>
                  <TextField
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    placeholder="Last name"
                    onChange={handleFormData}
                    fullWidth
                    error={!formData.last_name && validateError}
                  />
                  {!formData.last_name && validateError && (
                    <ErrorMessageBox>Enter Your Last Name</ErrorMessageBox>
                  )}
                </FormControl>
              </Stack>
              <Stack mb={5}>
                <FormControl
                  fullWidth
                  error={!formData.mobile_number && validateError}
                >
                  <FormLabel sx={{ marginBottom: "5px", color: "#171717" }}>
                    Phone
                  </FormLabel>
                  <TextField
                    type="text"
                    id="mobile_number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    placeholder="Enter Your Phone"
                    onChange={handleFormData}
                    fullWidth
                    error={!formData.mobile_number && validateError}
                  />
                  {!formData.mobile_number && validateError && (
                    <ErrorMessageBox>Enter Your Mobile Number </ErrorMessageBox>
                  )}
                </FormControl>
              </Stack>
              <Stack mb={5}>
                <FormControl
                  fullWidth
                  error={!formData.message && validateError}
                >
                  <FormLabel sx={{ marginBottom: "5px", color: "#171717" }}>
                    Message
                  </FormLabel>
                  <TextField
                    type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    placeholder="Enter Your Message"
                    onChange={handleFormData}
                    fullWidth
                    multiline
                    rows={6}
                    error={!formData.message && validateError}
                  />
                  {!formData.message && validateError && (
                    <ErrorMessageBox>Enter Your Message </ErrorMessageBox>
                  )}
                </FormControl>
              </Stack>
              <Stack mb={5}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#0054BA",
                    textTransform: "none",
                    color: "white",
                    fontFamily: "source sans pro semibold",
                    padding: 2,
                    fontSize: "1.1rem",
                  }}
                >
                  Request Callback
                </Button>
              </Stack>
            </FormBox>
          </FormContainer>
        </DialogFormContent>
      </BootstrapDialog>
    </>
  );
};

export default WelcomePage;
