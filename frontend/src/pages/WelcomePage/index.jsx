import {
  Stack,
  styled,
  Typography,
  Button,
  Grid,
  IconButton,
  Dialog,
  Slide,
  TextField,
  FormControl,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import SahayakHeader from "../../components/SahayakHeader";
import femaleAst from "../../assets/v4DesignImages/Patners/femalenewAst.png";
import { useNavigate } from "react-router-dom";
import adityaCapital from "../../assets/v4DesignImages/Patners/1.png";
import Karnataka from "../../assets/v4DesignImages/Patners/4.png";
import dmi from "../../assets/v4DesignImages/Patners/3.png";
import Marquee from "react-marquee-slider";
import SahayakFooter from "../../components/SahayakFooter";
import WavesVector from "../../assets/v4DesignImages/bg/wavesVectorPng.png";
import bg4 from "../../assets/v4DesignImages/bg/bg4.png";
import InsuranceIcon from "../../assets/v4DesignImages/Icons/insuranceIcon.png";
import handIndexIcon from "../../assets/v4DesignImages/Icons/1.png";
import HealthLoanIcon from "../../utils/CustomIcons/healthLoanIcon";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EducationIcon from "../../utils/CustomIcons/EducationIcon";
import TravelIcon from "../../utils/CustomIcons/TravelIcon";
import MedicalEmergencyIcon from "../../utils/CustomIcons/medicalEmergency";
import MarraigeIcon from "../../utils/CustomIcons/marraigeIcon";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import SpeedIcon from "@mui/icons-material/Speed";
import NavigationIcon from "@mui/icons-material/Navigation";
import Is1 from "../../assets/v4DesignImages/innovationSectionSVG/1";
import Is2 from "../../assets/v4DesignImages/innovationSectionSVG/2";
import Is3 from "../../assets/v4DesignImages/innovationSectionSVG/3";
import Is4 from "../../assets/v4DesignImages/innovationSectionSVG/4";
import Is5 from "../../assets/v4DesignImages/innovationSectionSVG/5";
import ArrowDownSvg from "../../assets/v4DesignImages/Icons/ArrowDown";

const WelcomePageWrapper = styled("div")(({ theme }) => ({}));

const WelcomePageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  lineHeight: "150%",
  fontFamily: "Source Sans Pro",
  color: "#535353",
  marginTop: theme.spacing(2),
}));

const FinancialContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundImage: `url(${WavesVector})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center bottom 40px",
  position: "relative",
}));

const ServiceTypesWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(3),
  margin: "32px 0 24px",
}));

const ServiceTypesContainer = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(4),
  padding: theme.spacing(4.5),
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
  color: "white",
  fontFamily: "source sans pro semibold",
  padding: theme.spacing(3),
  margin: (2, 0),
  textTransform: "none",
  letterSpacing: "0.8px",
  fontSize: "1.2rem",
  "&:hover": {
    backgroundColor: "#0054BA", // Optional: hover background color
  },
  "&:active": {
    backgroundColor: "#0054BA", // Background color when clicked
  },
}));

const MeetOurAgentWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  justifyContent: "space-between",
  alignItems: "center",
  height: "570px",
  width: "100%",
  backgroundImage: `url(${femaleAst})`,
  // backgroundRepeat: "no-repeat",
  backgroundSize: "100% 570px",
}));

const AssistantChangeSectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(7),
}));

const ActionChangeSectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  width: "248px",
  height: "43px", // Adjust height as needed
  borderRadius: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.14)",
  padding: 1,
}));

const SlidingBackground = styled("div")(({ theme, activeButton }) => ({
  position: "absolute",
  top: 5,
  left: activeButton === 0 ? 5 : "50%",
  width: "48%",
  height: "80%",
  backgroundColor: "rgba(255, 255, 255, 0.14)",
  borderRadius: "24px",
  transition: "left 0.3s ease-in-out",
  boxShadow: "inset 0 4px 12px 0px rgba(204, 204, 204, 0.24)", // Corrected boxShadow syntax
  zIndex: 1,
}));

const ToggleButton = styled(Button)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  backgroundColor: "transparent",
  color: "#FFFFFF",
  width: "50%",
  height: "100%",
  textTransform: "none",
  fontFamily: "Source Sans Pro",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "120%",
  textAlign: "center",
  padding: theme.spacing(0),
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&:focus": {
    backgroundColor: "transparent",
  },
}));

const AssistantNameChangeWrapper = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(6),
  padding: theme.spacing(6, 4),
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
  gap: theme.spacing(8),
  margin: "48px 0px",
}));

const TrustedPatnerContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const PatnerLogoContainer = styled("div")(({ theme }) => ({
  height: "60px",
  width: "168px",
  borderRadius: "10px",
  boxShadow: "8px 8px 24px 0px rgba(0, 0, 0, 0.08)",
  display: "flex",
  justifyContent: "center",
  margin: theme.spacing(4),
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(1, 2),
  },
}));

const PatnersLogo = styled("img")(({ theme }) => ({
  height: "30px",
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
  backgroundColor: "#0054ba1a",
  gap: theme.spacing(1),
  width: "fit-content",
  border: "2px solid #f4f4f4",
  borderRadius: "10px",
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "32px 16px",
}));

const ContactUsContainer = styled(Stack)(({ theme }) => ({
  // width: "80%",
  padding: theme.spacing(10, 8),
  gap: theme.spacing(6),
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

const FaqWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(8, 4),
  gap: theme.spacing(6),
  backgroundColor: "white",
}));

const CustomAccordianContainer = styled(Accordion)(({ theme }) => ({
  "&:first-of-type": {
    borderRadius: "10px 10px 0 0",
  },
  "&:last-of-type": {
    borderRadius: " 0 0 10px 10px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "4px 0px !important",
  },
}));

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
    title: "Instant 6 Minute Loans",
    body: "Get approved and funded in less than 6 minutes!",
    src: <Is1 />,
  },
  {
    title: "Collateral-Free Convenience",
    body: "Borrow with confidence, no collateral needed.",
    src: <Is2 />,
  },
  {
    title: "Trusted Lending Partners",
    body: "Backed by RBI-licensed lenders for secure financing",
    src: <Is3 />,
  },
  {
    title: "Fully Digital, Paper-Free Journey",
    body: "Apply, approve, and receive funds seamlessly.",
    src: <Is4 />,
  },
  {
    title: "Your Loan, Your Terms ",
    body: "Customizable options tailored for every need.",
    src: <Is5 />,
  },
];

const creditServicesArr = [
  {
    serviceType: "Education",
    serviceIcon: <EducationIcon />,
  },
  {
    serviceType: "Travel",
    serviceIcon: <TravelIcon />,
  },
  {
    serviceType: "Healthcare",
    serviceIcon: <HealthLoanIcon />,
  },
  {
    serviceType: "Medical Emergency",
    serviceIcon: <MedicalEmergencyIcon />,
  },
  {
    serviceType: "Marriage",
    serviceIcon: <MarraigeIcon />,
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
    <CustomAccordianContainer defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={<ArrowDownSvg sx={{ color: "black", fontSize: 24 }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          padding: "16px 24px",
          display: "flex",
          flexDirection: "row",
          gap: 6,
        }}
      >
        <Typography
          fontFamily={"Plus Jakarta Sans SemiBold"}
          fontSize={17}
          lineHeight={"140%"}
        >
          {acordianHeading}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
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
    </CustomAccordianContainer>
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
      navigate("/initiate-journey");
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
      faqQuestion: "What is Sahayak?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion: " How does it work?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion: "How does Sahayak help users with no credit history?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion:
        "What makes Sahayak different from other financial platforms?",
      faqAnswer: "abcd answer",
    },
    {
      faqQuestion: "Who are the typical users of Sahayak?",
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
                lineHeight: "140%",
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
                fontFamily={"Plus Jakarta Sans semibold"}
              >
                Our Trusted Partners
              </Typography>
            </TrustedPatnerContainer>
            <Stack
              width={"-webkit-fill-available"}
              direction={"column"}
              gap={4}
            >
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
            </Stack>
          </PatnersContainer>
          <MeetOurAgentWrapper>
            <AssistantChangeSectionWrapper>
              <ActionChangeSectionContainer>
                <SlidingBackground activeButton={activeButton} />
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
              <Stack direction={"column"} alignItems={"center"} gap={2}>
                <Typography
                  sx={{
                    fontFamily: "Source Sans Pro SemiBold",
                    fontSize: "24px",
                    color: "#FFFFFF",
                    lineHeight: "120%",
                  }}
                >
                  Meet Name
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Source Sans Pro ",
                    fontSize: "18px",
                    color: "#D2D2D2",
                    textAlign: "center",
                    lineHeight: "150%",
                  }}
                >
                  Get personalized credit advice and quick support to find the
                  right coverage effortlessly.
                </Typography>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#0054BA !important",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontFamily: "Source Sans Pro SemiBold",
                  fontSize: "20px",
                  fontWeight: 300,
                  py: 3,
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
                      fontSize: "1.1rem",
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
                  fontSize: "24px",
                  lineHeight: "120%",
                }}
              >
                Innovations that Empower Your Journey
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Source Sans pro",
                  fontSize: "19px",
                  color: "#535353",
                  lineHeight: "150%",
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
                        fontSize: "16px",
                        fontFamily: "Plus Jakarta Sans Bold",
                        lineHeight: "150%",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontFamily: "Source Sans pro",
                        color: "#535353",
                        lineHeight: "150%",
                      }}
                    >
                      {item.body}
                    </Typography>
                  </EmpowerTextContainer>
                </EmpowerCardContainer>
              ))}
            </Stack>
          </EmpowerWrapper>
          <FaqWrapper>
            <Stack mt={6} gap={2}>
              <Typography
                sx={{
                  fontFamily: "Plus Jakarta Sans SemiBold",
                  fontSize: "24px",
                  lineHeight: "120%",
                }}
              >
                Frequently asked questions
              </Typography>
            </Stack>
            <Stack
              sx={{
                boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.08)",
              }}
              mt={4}
            >
              {Faq?.map((faq, index) => (
                <CustomAccordion
                  key={index}
                  acordianHeading={faq.faqQuestion}
                  acordianContent={faq.faqAnswer}
                />
              ))}
            </Stack>
          </FaqWrapper>
          <ContactUsWrapper>
            <ContactUsContainer>
              <Stack direction={"column"} justifyContent={"center"} gap={2}>
                <Typography
                  sx={{
                    fontFamily: "Source Sans Pro SemiBold",
                    fontSize: "24px",
                    color: "White",
                    textAlign: "center",
                    lineHeight: "120%",
                  }}
                >
                  We're Here to Help{" "}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Source Sans Pro ",
                    fontSize: "18px",
                    color: "#D2D2D2",
                    textAlign: "center",
                    lineHeight: "150%",
                  }}
                >
                  Our team is ready to assist you with all your credit and
                  insurance needs.
                </Typography>
              </Stack>
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
