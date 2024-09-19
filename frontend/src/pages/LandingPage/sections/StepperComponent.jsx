import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Stack, useMediaQuery, useTheme } from "@mui/material";

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const steps = [
    {
      label: "Basic details",
      description:
        "Enter your basic personal information with the help of our AI assistant to kickstart your loan or insurance application.",
    },
    {
      label: "Select the Offer",
      description:
        "Choose the best offers from a selection of banks tailored to your financial needs and preferences.",
    },
    {
      label: "Start KYC Process",
      description:
        "Begin the Know Your Customer (KYC) process to verify your identity, ensuring a secure and compliant application.",
    },
    {
      label: "Fill Out the Bank Details",
      description:
        "Provide your bank details to facilitate the loan disbursement or insurance premium payments smoothly.",
    },
    {
      label: "Start E-Mandate",
      description:
        "Set up an E-Mandate for automatic payments, making your loan or insurance process hassle-free and convenient.",
    },
    {
      label: "Claim the Offer",
      description:
        "Finalize your application and claim the selected offer to enjoy the benefits of your loan or insurance plan.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveStep((step) => (step + 1) % steps.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [steps.length]);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: isMobile ? "auto" : 400 }}
    >
      <Box sx={{ maxWidth: isMobile ? 400 : "auto" }}>
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
          alternativeLabel={!isMobile}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography textAlign={"left"}>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  );
};

export default StepperComponent;
