import { Grid, Stack, Typography, Box } from "@mui/material";
import React from "react";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import ArticleIcon from "@mui/icons-material/Article";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import BgImg from "../../../assets/v4DesignImages/bg/bgEligibility.png";
import { styled } from "@mui/system";

const CriteriaBodyContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(10, 5),
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
    flexDirection: "column",
  },
}));

const CriteriaBody = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: theme.spacing(5),
  backgroundImage: `url(${BgImg})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "70%",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "100%",
  },
}));

const CriteriaBodyHeader = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(2),
  width: "35%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    alignItems: "center",
  },
}));

const CriteriaBodyContent = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(5),
  backgroundColor: "white",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
  maxWidth: "400px",
}));

const CriteriaBoxHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CriteriaContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing(2),
  height: "90%",
}));

const criteriaData = [
  {
    icon: <CameraFrontIcon />,
    text: "You must be between the ages of 21 to 55 years.",
  },
  {
    icon: <ArticleIcon />,
    text: "You must be a resident of India.",
  },
  {
    icon: <PermIdentityIcon />,
    text: "You must have a stable source of income.",
  },
];

const documentsData = [
  {
    icon: <CameraFrontIcon />,
    text: "A Selfie: A clear picture of yours with proper lighting.",
  },
  {
    icon: <ArticleIcon />,
    text: "Proof of Identity: Passport/ Aadhar card/PAN card/Driver's license.",
  },
  {
    icon: <PermIdentityIcon />,
    text: "Proof of Address: Passport/rent agreement/utility bills/voter's ID.",
  },
];

const Criteria = () => {
  return (
    <>
      <CriteriaBodyContainer>
        <CriteriaBodyHeader>
          <Typography fontSize={"40px"} fontWeight={700}>
            Eligibility & Documents
            <br /> Required for
            <br /> HealthTech Financing
          </Typography>
          <Typography variant="body1" color={"#525a6b"}>
            No complications, no hassles - just straightforward
            <br /> access to best-in-class medical services on EMIs. Check{" "}
            <br /> your eligibility and with a few basic documents avail of
            <br /> the medical treatment you deserve.
          </Typography>
        </CriteriaBodyHeader>
        <CriteriaBody>
          <CriteriaBodyContent>
            <CriteriaBoxHeader>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Eligibility Criteria
              </Typography>
            </CriteriaBoxHeader>
            <CriteriaContentBox>
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                }}
              >
                {criteriaData.map((item, index) => (
                  <li key={index}>
                    <Typography fontSize={"16px"} color={"#525a6b"} my={2}>
                      {item.text}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CriteriaContentBox>
          </CriteriaBodyContent>
          <CriteriaBodyContent>
            <CriteriaBoxHeader>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Documents Required
              </Typography>
            </CriteriaBoxHeader>
            <CriteriaContentBox>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                {documentsData.map((item, index) => (
                  <li key={index}>
                    <Typography fontSize={"16px"} color={"#525a6b"} my={2}>
                      {item.text}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CriteriaContentBox>
          </CriteriaBodyContent>
        </CriteriaBody>
      </CriteriaBodyContainer>
    </>
  );
};

export default Criteria;
