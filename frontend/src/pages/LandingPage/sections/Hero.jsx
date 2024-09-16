import React from "react";
import { Typography, styled } from "@mui/material";
import bgImage from "../../../assets/v4DesignImages/bg/bgImage.png";
import ondcwhite from "../../../assets/v4DesignImages/logo/ondcwhite.png";

const HeroContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "350px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down("sm")]: {
    height: "300px",
  },
}));

const TextContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const OndcImage = styled("img")(({ theme }) => ({
  height: "30px",
  [theme.breakpoints.down("sm")]: {
    height: "40px",
  },
}));

const Hero = () => {
  return (
    <HeroContainer>
      <TextContainer>
        <Typography
          variant="h3"
          fontWeight={700}
          color={"white"}
          fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
          fontFamily={"Plus Jakarta Sans"}
        >
          Building Digital Health Care For Bharat
        </Typography>
        <Typography variant="body1" color={"white"} maxWidth="700px">
          Reimagining Health care by bridging the gap between Patient, Payor and
          Provider thus making health care systems more Affordable, Accessible
          and Interoperable
        </Typography>
        <OndcImage src={ondcwhite} alt="ONDC Logo" />
      </TextContainer>
    </HeroContainer>
  );
};

export default Hero;
