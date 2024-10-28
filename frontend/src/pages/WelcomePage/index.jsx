import {
  Stack,
  styled,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SahayakHeader from "../../components/SahayakHeader";
import { TypeAnimation } from "react-type-animation";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import femaleAst from "../../assets/v4DesignImages/Patners/femaleast.png";
import { useNavigate } from "react-router-dom";
import adityaCapital from "../../assets/v4DesignImages/Patners/1.png";
import ADBM from "../../assets/v4DesignImages/Patners/2.png";
import adityaBirlaInsurance from "../../assets/v4DesignImages/Patners/6.png";
import Karnataka from "../../assets/v4DesignImages/Patners/4.avif";
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
import financeIcon from "../../assets/v4DesignImages/Icons/1.png";
import repaymentIcon from "../../assets/v4DesignImages/Icons/2.png";
import hospitalIcon from "../../assets/v4DesignImages/Icons/3.png";
import handIndexIcon from "../../assets/v4DesignImages/Icons/4.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WelcomePageWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const WelcomePageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
const WelcomeTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "pacifico",
  fontSize: "3rem",
  textAlign: "center",
  color: "#1976d2",
}));
const WelcomeTypeTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "pacifico",
  fontSize: "3rem",
  textAlign: "center",
  color: "#1976d2",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#535353",
  marginTop: theme.spacing(2),
  fontWeight: 400,
}));
const FinancialContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  // backgroundColor: "#F2F2F2",
  borderRadius: "10px",
  marginTop: "15px",
}));
const MeetOurAgentWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  gap: theme.spacing(1),
  marginTop: "20px",
}));

const MeetOurAgentContainer = styled(Stack)(({ theme }) => ({
  height: "150px",
  width: "45%",
  direction: "row",
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

const AgentImageContainer = styled(Grid)(({ theme, type }) => ({
  height: "170px",
  width: "100%",
  backgroundImage: type === "male" ? `url(${maleAst})` : `url(${femaleAst})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const CustomizedButton = styled(Button)(({ theme, type }) => ({
  boxShadow: "none",
  backgroundColor: "#000000",
  margin: (2, 0),
  textTransform: "none",
  fontSize: "1rem",
  letterSpacing: "1px",
}));

const PatnersContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-around",
  gap: theme.spacing(2),
}));

const TrustedPatnerContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const PatnerLogoContainer = styled("div")(({ theme }) => ({
  height: "76px",
  width: "168px",
  boxShadow: "1px 3px 9px 5px #b9b9b930 ",
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
  padding: theme.spacing(2),
}));

const ServiceInfoWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(2, 0),
}));

const ServiceInfoContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  // background:
  //   "linear-gradient(89deg, rgb(21, 74, 189) 0.1%, rgb(26, 138, 211) 51.5%, rgb(72, 177, 234) 100.2%)",
  backgroundImage: `url("https://img.freepik.com/free-vector/bubbles-blue-background_331749-688.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  marginBottom: "20px",
}));

const ServiceInfoSection = styled("div")(({ theme }) => ({
  width: "70%", // Adjusted width for text section
  flex: 1,
}));

const ServiceImageSectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end", // Ensure image is aligned to the right
  width: "30%", // Allocate proper width for the image section
}));

const ServiceImageSection = styled("div")(({ theme, type }) => ({
  height: "100px",
  width: "100px",
  backgroundImage: type === "credit" ? `url(${credit})` : `url(${insurance})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const CreditInsuranceServiceWrapper = styled("div")(({ theme, type }) => ({
  display: "flex",
  flexDirection: "column",
  margin: theme.spacing(3, 0),
  // backgroundColor: "#f4f4f4",
}));

const CreditServicesInfoWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  overflowX: "scroll",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundImage: `url(${bg1})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const InsuranceServiceInfoWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
}));

const ServiceCard = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  backgroundColor: "white",
  gap: theme.spacing(1),
  width: "120px",
  border: "2px solid #f4f4f4",
  borderRadius: "5px",
  flexShrink: 0,
}));

const InsuranceServiceContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(3),
  gap: theme.spacing(1),
  width: "100%",
  height: "150px",
  border: "2px solid #f4f4f4",
  borderRadius: "10px",
  backgroundImage: `url(${bg2})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const IconContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "white",
}));

const CustomDot = styled("div")(({ isActive }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: isActive ? "#1976d2" : "#ccc",
  border: "2px solid #fff",
  margin: "5px 5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const agentList = [
  {
    name: "Rajesh",
    specialist: "Loan / Insurance Specialist",
    img: "male",
    navigation: "/service-info",
  },
  {
    name: "Rani",
    specialist: "Loan / Insurance Specialist",
    img: "female",
    navigation: "/service-info",
  },
];

const partners = [
  { id: 2, image: adityaCapital },
  { id: 4, image: Karnataka },
  { id: 5, image: dmi },
  { id: 2, image: adityaCapital },
  { id: 4, image: Karnataka },
  { id: 5, image: dmi },
];

const serviceInfoCard = [
  {
    content:
      "Start Your Credit Journey Today and Unlock Financial Opportunities with Flexible, Easy-to-Access Solutions!",
    navigation: "/route-2",
    type: "credit",
  },
  {
    content:
      "Secure Your Future Today with Comprehensive Insurance Solutions, Tailored to Protect What Matters Most!",
    navigation: "/route-2",
    type: "insurance",
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

const insuranceServiceArr = [
  {
    title: "24/7 Assistance",
    body: "Get instant support anytime, anywhere.",
    src: financeIcon,
  },
  {
    title: "Personalized Solutions",
    body: "Tailored recommendations based on your unique needs.",
    src: repaymentIcon,
  },
  {
    title: "Quick Issue Resolution",
    body: "Solve problems and get answers fast.",
    src: hospitalIcon,
  },
  {
    title: "Easy Navigation",
    body: "Intuitive design for a smooth user experience.",
    src: handIndexIcon,
  },
];

const serviceStyling = {
  fontSize: "2rem",
};

const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleAgentClick = (type, navigation) => {
    console.log(navigation);

    sessionStorage.setItem("serviceType", type);
    navigate(navigation);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => <CustomDot isActive={i === currentSlide} />,
  };

  return (
    <>
      <SahayakHeader />
      <WelcomePageWrapper>
        <WelcomePageContainer>
          <WelcomeTypography>Welcome To </WelcomeTypography>
          <WelcomeTypeTypography>
            {" "}
            <TypeAnimation
              sequence={["Sahayak ", 1000, "Sahayak Assistant", 1000, "", 1000]}
              speed={50}
              wrapper="span"
              repeat={Infinity}
            />{" "}
          </WelcomeTypeTypography>
          {/* <FinancialContainer>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "plus jakarta sans bold",
                color: "black",
                fontSize: "2.2rem",
              }}
            >
              Simplify Your Financial Journey
            </Typography>
            <StyledTypography>
              Find solutions for your insurance and credit needs quickly and
              easily. Our smart agent delivers personalized assistance, helping
              you take action and stay in control of your financial journey.
            </StyledTypography>
          </FinancialContainer> */}
          <ServiceInfoWrapper>
            {serviceInfoCard.map((item, index) => (
              <ServiceInfoContainer
                key={index}
                onClick={() => handleAgentClick(item.type, item.navigation)}
              >
                <ServiceInfoSection>
                  <Typography
                    sx={{ fontFamily: "plus jakarta sans bold", color: "#fff" }}
                  >
                    {item?.content}
                  </Typography>
                </ServiceInfoSection>
                <ServiceImageSectionWrapper>
                  <ServiceImageSection type={item.type} />
                </ServiceImageSectionWrapper>
              </ServiceInfoContainer>
            ))}
          </ServiceInfoWrapper>
          <CreditInsuranceServiceWrapper>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "plus jakarta sans bold",
                color: "#1976d2",
                fontSize: "1.8rem",
                marginBottom: "10px",
              }}
            >
              Innovations That Empower Your Journey
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "plus jakarta sans bold",
                color: "#000000",
                fontSize: "1.6rem",
                marginBottom: "10px",
              }}
            >
              Loan{" "}
            </Typography>
            <CreditServicesInfoWrapper>
              {creditServicesArr.map((item, index) => (
                <ServiceCard key={index}>
                  <IconButton>{item?.serviceIcon}</IconButton>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "plus jakarta sans bold",
                      fontSize: "1.2rem",
                      marginBottom: "10px",
                      color: "#535353",
                    }}
                  >
                    {item?.serviceType}
                  </Typography>
                </ServiceCard>
              ))}
            </CreditServicesInfoWrapper>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "plus jakarta sans bold",
                color: "#000000",
                fontSize: "1.6rem",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              Insurance{" "}
            </Typography>
            <InsuranceServiceInfoWrapper>
              <Slider {...settings}>
                {insuranceServiceArr.map((item, index) => (
                  <InsuranceServiceContainer>
                    <IconContainer>
                      <img src={item?.src} style={{ height: "40px" }} />
                    </IconContainer>
                    <Typography
                      variant="body1"
                      fontFamily={"plus jakarta sans bold"}
                      fontSize={"1.4rem"}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={"1.2rem"}
                      fontFamily={"Plus Jakarta Sans"}
                      fontWeight={700}
                      color={"#535353"}
                    >
                      {item?.body}
                    </Typography>
                  </InsuranceServiceContainer>
                ))}
              </Slider>
            </InsuranceServiceInfoWrapper>
          </CreditInsuranceServiceWrapper>
          <MeetOurAgentWrapper>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "plus jakarta sans bold",
                color: "#1976d2",
                fontSize: "1.8rem",
                marginBottom: "10px",
              }}
            >
              Meet Our Agents
            </Typography>
            <Grid container gap={2}>
              {agentList.map((agent, index) => (
                <AgentImageContainer item xs={5.8} sm={5.8} type={agent.img} />
              ))}
            </Grid>
          </MeetOurAgentWrapper>
          <PatnersContainer>
            <TrustedPatnerContainer>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "1.8rem",
                  color: "#1976d2",
                }}
                fontFamily={"Plus Jakarta Sans bold"}
              >
                Our Trusted Partners
              </Typography>
              <StyledTypography textAlign={"center"}>
                We work with top industry leaders to provide you with the best
                insurance and credit solutions, ensuring exceptional service
                tailored to your needs.
              </StyledTypography>
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
        </WelcomePageContainer>
      </WelcomePageWrapper>
      <SahayakFooter />
    </>
  );
};

export default WelcomePage;

// <MeetOurAgentContainer>
//   <MeetOurAgentContainerBody key={index}>
//     <AgentImageContainer type={agent.img} alt={agent.name} />
//     <Stack justifyContent={"center"} mt={1}>
//       <Typography
//         sx={{
//           fontFamily: "plus jakarta sans bold",
//           color: "black",
//           fontSize: "1.4rem",
//           textAlign: "center",
//         }}
//       >
//         {agent.name}
//       </Typography>
//       <Typography
//         sx={{
//           color: "#535353",
//           fontSize: "1.1rem",
//         }}
//       >
//         {agent.specialist}
//       </Typography>
//     </Stack>
//     <Stack width={"90%"}>
//       <CustomizedButton
//         variant="contained"
//         onClick={() =>
//           handleAgentClick(
//             agent.name === "Rajesh" ? "male" : "female",
//             agent.navigation
//           )
//         }
//       >
//         Let's Get Started
//       </CustomizedButton>
//     </Stack>
//   </MeetOurAgentContainerBody>
// </MeetOurAgentContainer>
