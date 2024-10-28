import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Dialog,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ondcLogo from "../../assets/v4DesignImages/Patners/5.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Eli3 from "../../assets/v4DesignImages/EligibilityIcons/Eli3";
import Eli2 from "../../assets/v4DesignImages/EligibilityIcons/Eli2";
import Eli1 from "../../assets/v4DesignImages/EligibilityIcons/Eli1";
import Doc1 from "../../assets/v4DesignImages/EligibilityIcons/Doc1";
import Doc2 from "../../assets/v4DesignImages/EligibilityIcons/Doc2";
import Doc3 from "../../assets/v4DesignImages/EligibilityIcons/Doc3";

const PageContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(10),
}));

const SahayakHeaderWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

const SahayakLogo = styled(Typography)(({ theme }) => ({
  fontFamily: "Red Hat Display",
  fontWeight: 700,
  fontSize: "1.6rem",
  marginLeft: 1,
  letterSpacing: "2px",
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
}));

const Heading = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const BodyContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(6),
}));

const ONDCBoxContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(2, 4),
  border: "1px solid rgba(0, 84, 186, 0.32)",
  borderRadius: "4px",
  background:
    "linear-gradient(to right, rgba(40, 136, 252, 0.04), rgba(0, 84, 186, 0.04))",
}));

function CustomAccordion({ acordianHeading, acordianContentList, expanded }) {
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
        {acordianContentList.map((content, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                minHeight: "40px",
                minWidth: "40px",
                borderRadius: "50%",
                background: "#DFEAFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {content.icon}
            </Box>
            <Typography
              fontFamily={"Source Sans Pro"}
              fontSize={16}
              lineHeight={"150%"}
              color={"black"}
            >
              {content.content}
            </Typography>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

const EligibilityCriteriaComponent = () => {
  const [openDialog, setOpenDialog] = useState(true);

  const EligibilityList = [
    {
      icon: <Eli3 height={20} width={20} />,
      content: "You must be a resident of India",
    },
    {
      icon: <Eli1 height={20} width={20} />,
      content: "You must be between the ages of 21 - 55 years",
    },
    {
      icon: <Eli2 height={20} width={20} />,
      content: "You must have a stable source of income",
    },
  ];

  const DocumentsList = [
    {
      icon: <Doc1 height={20} width={20} />,
      content: "A selfie: A clear picture of yours with proper lighting",
    },
    {
      icon: <Doc2 height={18} width={18} />,
      content:
        "Proof of address: Passport/Rent Agreement/Utility Bills/Voter’s ID",
    },
    {
      icon: <Doc3 height={20} width={20} />,
      content: "Proof of identity: Passport/Aadhar/PAN/Driver’s License",
    },
  ];

  return (
    <Dialog fullScreen onClose={() => setOpenDialog(false)} open={openDialog}>
      <PageContainer>
        <SahayakHeaderWrapper>
          <SahayakLogo>Sahayak</SahayakLogo>
          <IconButton onClick={() => setOpenDialog(false)}>
            <CloseOutlinedIcon sx={{ color: "black", fontSize: "2rem" }} />
          </IconButton>
        </SahayakHeaderWrapper>
        <ContentContainer>
          <Heading>
            <Typography
              fontFamily={"Plus Jakarta Sans SemiBold"}
              fontSize={28}
              lineHeight={"140%"}
            >
              HealthTech Financing: Eligibility & Docs
            </Typography>

            <Typography
              fontFamily={"Source Sans Pro"}
              fontSize={18}
              lineHeight={"150%"}
              color={"#535353"}
            >
              Review eligibility and document requirements for HealthTech
              financing.
            </Typography>
          </Heading>
          <BodyContainer>
            <CustomAccordion
              expanded={true}
              acordianHeading={"Eligibility Criteria"}
              acordianContentList={EligibilityList}
            />
            <CustomAccordion
              acordianHeading={"Documents Required"}
              acordianContentList={DocumentsList}
            />
          </BodyContainer>
        </ContentContainer>
        <ONDCBoxContainer>
          <img src={ondcLogo} alt="ondcLogo" height={"25px"} />
          <Typography
            fontFamily={"Source Sans Pro"}
            fontSize={14}
            lineHeight={"150%"}
            color={"black"}
          >
            ONDC is a Gov backed project and we are partnered with RBI licensed
            lenders only!
          </Typography>
        </ONDCBoxContainer>
      </PageContainer>
    </Dialog>
  );
};

export default EligibilityCriteriaComponent;
