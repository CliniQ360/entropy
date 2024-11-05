import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slide,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ondcLogo from "../../assets/v4DesignImages/Patners/5.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Eli3 from "../../assets/v4DesignImages/EligibilityIcons/Eli3";
import Eli2 from "../../assets/v4DesignImages/EligibilityIcons/Eli2";
import Eli1 from "../../assets/v4DesignImages/EligibilityIcons/Eli1";
import Doc1 from "../../assets/v4DesignImages/EligibilityIcons/Doc1";
import Doc2 from "../../assets/v4DesignImages/EligibilityIcons/Doc2";
import Doc3 from "../../assets/v4DesignImages/EligibilityIcons/Doc3";
import GlobalIcon from "../../utils/CustomIcons/GlobalIcon";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MediaContext } from "../../context/mediaContext";
import { startConversion } from "../CreditPage/audioAgent.slice";

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
  marginBottom: "10%",
}));

const ActionButtonWrapper = styled(Grid)(({ theme }) => ({
  position: "fixed",
  bottom: "20px",
  gap: theme.spacing(1),
}));

const ActionButtonContainer = styled(Grid)(({ theme }) => ({}));

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const RadioButtonGroupContainer = styled(Stack)(({ theme, isSelected }) => ({
  padding: theme.spacing(2),
  flexDirection: "row",
  borderRadius: "3px",
  border: `1px solid ${isSelected ? "#0054BA" : "#D2D2D2"}`,
  alignItems: "center",
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

const EligibilityCriteriaPage = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const navigate = useNavigate();
  const {
    setAudioResponse,
    setMessageResponse,
    setNextState,
    setError,
    setProgressValue,
    setUserResponse,
  } = useContext(MediaContext);
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(false);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleInitiateJourney = () => {
    setShowLoader(true);
    const payload = {
      language: sessionStorage.getItem("activeLanguage"),
    };

    dispatch(startConversion(payload)).then((res) => {
      if (res?.error && Object.keys(res?.error)?.length > 0) {
        setError(true);
        return;
      }
      setShowLoader(false);
      setError(false);
      setProgressValue(10);
      setAudioResponse(res?.payload?.agent_audio_data);
      setMessageResponse(res?.payload?.agent_message);
      setUserResponse(res?.payload?.user_message);
      sessionStorage.setItem("next_state", res?.payload?.next_state);
      setNextState(res?.payload?.next_state);
      sessionStorage.setItem("thread_id", res?.payload?.thread_id);
      navigate("/credit/document-upload");
    });
  };

  useEffect(() => {
    sessionStorage.setItem("activeLanguage", selectedLanguage);
  }, []);

  return (
    <>
      <PageContainer>
        <SahayakHeaderWrapper>
          <SahayakLogo>Sahayak</SahayakLogo>
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
        <ActionButtonWrapper container>
          <ActionButtonContainer item xs={5.6}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClickOpen}
              sx={{
                padding: "10px",
                textTransform: "none",
                fontSize: "1rem",
                fontFamily: "inter semibold",
                border: "1.2px solid",
                backgroundColor: "white",
              }}
            >
              <GlobalIcon />
              <span style={{ marginLeft: 3 }}>Language</span>
            </Button>
          </ActionButtonContainer>
          <ActionButtonContainer item xs={5.6}>
            <Button
              fullWidth
              onClick={() => {
                handleInitiateJourney();
              }}
              variant="contained"
              sx={{
                padding: "10px",
                textTransform: "none",
                fontSize: "1rem",
                fontFamily: "inter semibold",
                border: "1.2px solid",
                boxShadow: "none",
              }}
            >
              Continue
            </Button>
          </ActionButtonContainer>
        </ActionButtonWrapper>
      </PageContainer>
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
              Choose Language
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
            <FormBox>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="en"
                name="radio-buttons-group"
                sx={{ gap: 3, mb: "10px", color: "red" }}
                onChange={handleChange}
              >
                <RadioButtonGroupContainer
                  isSelected={selectedLanguage === "en"}
                >
                  <FormControlLabel
                    value="en"
                    control={<Radio sx={{ color: "#0054BA" }} />}
                    sx={{
                      ml: 2,
                    }}
                  />
                  <Typography sx={{ fontSize: "1.2rem" }}>English</Typography>
                </RadioButtonGroupContainer>
                <RadioButtonGroupContainer
                  isSelected={selectedLanguage === "hi"}
                >
                  <FormControlLabel
                    value="hi"
                    control={<Radio sx={{ color: "#0054BA" }} />}
                    sx={{
                      ml: 2,
                    }}
                  />
                  <Typography sx={{ fontSize: "1.2rem" }}>हिन्दी</Typography>
                </RadioButtonGroupContainer>
              </RadioGroup>

              <Stack mb={5}>
                <Button
                  variant="contained"
                  onClick={() => {
                    sessionStorage.setItem("activeLanguage", selectedLanguage);
                    handleClose();
                  }}
                  sx={{
                    backgroundColor: "#0054BA",
                    textTransform: "none",
                    color: "white",
                    fontFamily: "source sans pro semibold",
                    padding: 2,
                    fontSize: "1.1rem",
                  }}
                >
                  Confirm
                </Button>
              </Stack>
            </FormBox>
          </FormContainer>
        </DialogFormContent>
      </BootstrapDialog>
    </>
  );
};

export default EligibilityCriteriaPage;
