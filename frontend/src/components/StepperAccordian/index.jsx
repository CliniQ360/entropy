import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StepperAccordion = ({ steps, checkError, refreshState }) => {
  const [expanded, setExpanded] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Handle accordion change (allow all accordions to expand/collapse)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Check if the step is completed
  const handleComplete = (index) => {
    const inputs = document.querySelectorAll(`[data-step="${index}"] input`);
    let allFilled = true;
    inputs.forEach((input) => {
      if (!input.value) {
        allFilled = false;
      }
    });

    if (allFilled) {
      setCompletedSteps((prev) => [...prev, index]);
      setExpanded(index + 1); // Move to the next accordion
    }
  };

  useEffect(() => {
    steps.forEach((_, index) => {
      if (!checkError(index)) {
        handleComplete(index);
      }
    });
  }, [refreshState, steps, checkError]);

  return (
    <div>
      {steps.map((step, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box mx={2}>
              {completedSteps.includes(index) ? (
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
          </AccordionSummary>
          <AccordionDetails>
            <div data-step={index}>
              {step.accordionDetail}
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => handleComplete(index)}
                disabled={completedSteps.includes(index)}
                style={{ marginTop: "10px" }}
              >
                Complete Step
              </Button> */}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default StepperAccordion;
