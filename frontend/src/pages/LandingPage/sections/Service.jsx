import { Grid, Stack, Typography, styled } from "@mui/material";
import React from "react";

const EligibilityContainerWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#F0F8FD",
  marginBottom: theme.spacing(4),
}));
const EligibilityContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(5, 4),
}));
const HeadingConatiner = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: 2,
}));
const EligibilityCriteria = styled(Grid)(({ theme }) => ({
  spacing: theme.spacing(1),
  gap: theme.spacing(2),
}));
const EligibilityCriteriaItem = styled(Grid)(({ theme }) => ({
  background:
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 51%, rgba(255,255,255,0) 100%)",
  padding: theme.spacing(4),
  marginTop: "20px",
}));

const Service = () => {
  const EligibilityInfo = [
    {
      Sr_no: "01",
      title: "Check eligibility",
      body: "Scan the QR code to check your eligibility at the healthcare center",
    },
    {
      Sr_no: "02",
      title: "Apply",
      body: "Once you qualify, apply for the service at the center",
    },
    {
      Sr_no: "03",
      title: "Documentation",
      body: "Submit a few basic documents through our 100% digital process",
    },
    {
      Sr_no: "04",
      title: "Repayment",
      body: "Choose your preferred repayment tenure in just a click",
    },
  ];

  return (
    <>
      <EligibilityContainerWrapper>
        <EligibilityContainer>
          <HeadingConatiner>
            <Typography variant="h4" fontWeight={700}>
              Get The Service in 4 Easy Steps
            </Typography>
            <Typography variant="body1" color={"#535353"}>
              CliniQ360 offers you to avail Health Care loans in 6 mins
            </Typography>
          </HeadingConatiner>
          <EligibilityCriteria container>
            {EligibilityInfo.map((info, index) => (
              <EligibilityCriteriaItem xs={12} sm={5.8} md={2.8} key={index}>
                <Typography variant="h4" color={"#0171d394"} fontWeight={600}>
                  {info.Sr_no}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {info.title}
                </Typography>
                <Typography variant="body1" color={"#535353"}>
                  {info.body}
                </Typography>
              </EligibilityCriteriaItem>
            ))}
          </EligibilityCriteria>
        </EligibilityContainer>
      </EligibilityContainerWrapper>
    </>
  );
};

export default Service;
