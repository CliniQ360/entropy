import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import loanImg from "../../../assets/v4DesignImages/bg/loanImg.png";
import image1 from "../../../assets/v4DesignImages/Icons/01.png";
import image2 from "../../../assets/v4DesignImages/Icons/02.png";
import image3 from "../../../assets/v4DesignImages/Icons/03.png";
import image4 from "../../../assets/v4DesignImages/Icons/04.png";
import image5 from "../../../assets/v4DesignImages/Icons/05.png";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import { contactUs } from "./landingPage.slice";
import CloseIcon from "@mui/icons-material/Close";

const FeaturesContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0),
  },
}));
const FeatureImageContainer = styled("div")(({ theme }) => ({
  backgroundImage: `url(${loanImg})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "90%",
}));
const FeatureGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  gap: 2,
}));
const FeatureFirstCol = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));
const FeatureSecondCol = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));
const TypoWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  gap: theme.spacing(1),
  flexDirection: "column",
  margin: theme.spacing(1),
}));
const ProfileCardWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  gap: theme.spacing(2),
  flexDirection: "column",
  margin: theme.spacing(1),
  width: "80%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const ProfileCard = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  alignItems: "center",
  flexDirection: "row",
  height: "50px",
  backgroundColor: "white",
  borderRadius: "50px",
}));
const ProfileIconButton = styled(Stack)(({ theme, userImage, imgSize }) => ({
  padding: theme.spacing(1),
  marginRight: "10px",
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  backgroundColor: "#DFEAFF",
  backgroundImage: `url(${userImage})`,
  backgroundSize: imgSize ? imgSize : "20px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));
const ProfileTypo = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
}));
const FormWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  height: "40px",
  gap: 1,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

const FeaturesCarousal = ({ type }) => {
  const [typeIndex, setTypeIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "For Patient") {
      setTypeIndex(0);
    } else if (type === "For Doctor") {
      setTypeIndex(1);
    }
  }, [type]);

  const features = [
    [
      {
        feature: "️Under 6 min loan processing",
        image: image1,
      },
      {
        feature: "Paperless transactions",
        image: image2,
      },
      {
        feature: "Low interest rates",
        image: image3,
      },
      {
        feature: "Loans from RBI registered entities",
        image: image4,
      },
      {
        feature: "Loan amounts: ₹20k to ₹5 lakhs",
        image: image5,
        imageSize: "15px",
      },
    ],
    [
      {
        feature: "Clinical documentation with AI-assisted note-taking",
        image: image1,
      },
      {
        feature: "Usable on both mobile and laptop without installation",
        image: image5,
        imageSize: "15px", // Add corresponding image if available
      },
      {
        feature: "Increase patient retention with prompt follow-up messages",
        image: image3, // Add corresponding image if available
      },
      {
        feature:
          "Improve your digital presence with a professional profile page",
        image: image4, // Add corresponding image if available
      },
      {
        feature: "Boost Google Reviews by sending review links via WhatsApp",
        image: image2,
      },
    ],
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    typeIndex === 0
      ? window.open("https://fin.cliniq360.com/loan", "_blank")
      : window.open("https://doc.cliniq360.com/", "_blank");
    const payload = {
      lead_category: typeIndex === 0 ? "ONDC " : "HIMS",
      mobile_number: mobileNumber,
    };
    dispatch(contactUs(payload)).then((res) => {
      setMobileNumber("");
      setActiveStep(false);
    });
  };

  return (
    <>
      <FeaturesContainer>
        <FeatureImageContainer>
          <FeatureGrid container>
            <FeatureFirstCol item xs={12} md={5.1}>
              <TypoWrapper>
                <Typography
                  variant="h3"
                  fontSize={"2rem"}
                  fontWeight={600}
                  fontFamily={"Plus Jakarta Sans"}
                >
                  {typeIndex === 0
                    ? "CliniQ360 Healthcare Finance Powered By ONDC"
                    : "CliniQ360 Health Intelligence Powered By AI"}
                </Typography>
                <Typography variant="body">
                  {typeIndex === 0
                    ? "Affordable health loans to help you manage your healthcare costs."
                    : "Advanced clinical intelligence to improve healthcare outcomes."}
                </Typography>
                <Stack alignItems={"flex-start"}>
                  {!activeStep ? (
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(true)}
                      sx={{
                        backgroundColor: "#0054BA",
                        textTransform: "none",
                        marginTop: 2,
                        borderRadius: "5px",
                      }}
                    >
                      {" "}
                      {typeIndex === 0 ? "Apply For Loan" : "Signup Now"}
                    </Button>
                  ) : (
                    <>
                      <form onSubmit={handleSubmit}>
                        <Badge
                          badgeContent={
                            <>
                              <IconButton
                                sx={{
                                  backgroundColor: "#1976d2",
                                  color: "white",
                                  height: "5px",
                                  width: "5px",
                                }}
                                onClick={() => setActiveStep(false)}
                              >
                                <CloseIcon sx={{ fontSize: "1rem" }} />
                              </IconButton>
                            </>
                          }
                        >
                          <FormWrapper>
                            <TextField
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              placeholder="Enter your mobile number"
                              fullWidth
                              required
                              type="number"
                              sx={{
                                height: "100%",
                                "& .MuiInputBase-root": {
                                  height: "40px",
                                  backgroundColor: "white",
                                  color: "#1976d2",
                                },
                              }}
                            />
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{
                                height: "40px",
                                width: "150px",
                                whiteSpace: "nowrap",
                                borderRadius: "5px",
                              }}
                            >
                              Submit
                            </Button>
                          </FormWrapper>
                        </Badge>
                      </form>
                    </>
                  )}
                </Stack>
              </TypoWrapper>
            </FeatureFirstCol>
            <FeatureSecondCol item xs={12} md={6.5}>
              <ProfileCardWrapper>
                {features[typeIndex].map((item, index) => (
                  <ProfileCard key={index}>
                    <ProfileIconButton
                      userImage={item?.image}
                      imgSize={item?.imageSize}
                    />
                    <ProfileTypo>{item?.feature}</ProfileTypo>
                  </ProfileCard>
                ))}
              </ProfileCardWrapper>
            </FeatureSecondCol>
          </FeatureGrid>
        </FeatureImageContainer>
      </FeaturesContainer>
    </>
  );
};

export default FeaturesCarousal;
