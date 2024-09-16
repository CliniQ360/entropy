import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import lowerIR from "../../../assets/lower_interest rate.png";

const features = [
  {
    title: "Lower Interest Rates",
    description:
      "Obtain loans for various needs at reduced interest rates tailored to your requirements.",
    imgAlt: "lower-interest-rate",
  },
  {
    title: "Fast Processing and Disbursal",
    description:
      "Apply online, verify your eligibility, and receive funds directly in your bank account within 10 minutes.",
    imgAlt: "fast-processing-disbursal",
  },
  {
    title: "Easy Repayment Options",
    description:
      "Repay the loan amount in easy EMI with flexible tenure options.",
    imgAlt: "easy-repayment-options",
  },
  {
    title: "100% Paperless",
    description:
      "No paperwork or physical documentation is required, and you can apply and get a personal loan completely online.",
    imgAlt: "paperless",
  },
  {
    title: "Safe, Secure and Transparent",
    description:
      "Our loan application process is fully secured and safe and there are no hidden charges.",
    imgAlt: "safe-secure-transparent",
  },
  {
    title: "Collateral Free",
    description: "No collateral is required to apply for our personal loans.",
    imgAlt: "collateral-free",
  },
];

const Features = () => {
  return (
    <Grid
      container
      spacing={2}
      gap={1}
      mt={2}
      display={"flex"}
      justifyContent={"space-evenly"}
      padding={"20px 20px "}
      sx={{ backgroundColor: "#0561A0" }}
    >
      {features.map((feature, index) => (
        <Grid item sm={12} md={3.5} lg={1.8} key={index}>
          <Stack
            flexDirection={"column"}
            sx={{
              height: "270px",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "15px",
            }}
            gap={1}
          >
            <Stack justifyContent={"center"} alignItems={"center"} mb={1}>
              <img
                src={lowerIR}
                style={{ height: "100px" }}
                alt={feature.imgAlt}
              />
            </Stack>
            <Typography variant="h6" textAlign={"left"} fontSize={"1rem"}>
              <b>{feature.title}</b>
            </Typography>
            <Typography variant="body2" textAlign={"left"} fontSize={"0.8rem"}>
              {feature.description}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;
