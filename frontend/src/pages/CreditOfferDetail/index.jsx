import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RedirectionDialogComponent from "../../components/RedirectionDialogComponent";

const CreditOfferWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
}));

const CreditHeaderSection = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));
const CustomAccordian = styled(Accordion)(({ theme }) => ({
  border: "1.2px solid #D2D2D2",
  boxShadow: "none",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  marginBottom: "10px",
}));
const LoanDetailsWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  padding: "10px",
}));
const LoanDetailsItem = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
}));
const CreditOfferPage = () => {
  return (
    <CreditOfferWrapper>
      <CreditHeaderSection>
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#00A91C",
            fontFamily: "plus jakarta sans",
          }}
        >
          Success Message
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#535353",
            fontFamily: "inter",
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </Typography>
      </CreditHeaderSection>
      <CustomAccordian defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ ml: "10px" }}
        >
          <Typography
            fontWeight={700}
            fontSize={"0.9rem"}
            fontFamily={"plus jakarta sans"}
          >
            Loan Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LoanDetailsWrapper container>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Patient Name
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                Full Name
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Gender
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                Male
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Date of Birth
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                05/10/1990
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Email Address{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                abc@gmail.com
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Order ID{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                1231313213213
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Principal{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                123456789000
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Interest
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                123456789000
              </Typography>
            </LoanDetailsItem>
          </LoanDetailsWrapper>
        </AccordionDetails>
      </CustomAccordian>
      <CustomAccordian>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ ml: "10px" }}
        >
          <Typography
            fontWeight={700}
            fontSize={"0.9rem"}
            fontFamily={"plus jakarta sans"}
          >
            Order Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LoanDetailsWrapper container>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Patient Name
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                Full Name
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Gender
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                Male
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Date of Birth
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                05/10/1990
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Email Address{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                abc@gmail.com
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Order ID{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                1231313213213
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Principal{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                123456789000
              </Typography>
            </LoanDetailsItem>
            <LoanDetailsItem xs={5.8} sm={5.8}>
              <Typography sx={{ fontSize: "0.9rem", color: "#5A5A5A" }}>
                Interest
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: "#171717",
                  fontWeight: 700,
                  mt: 1,
                  mb: 1,
                }}
              >
                123456789000
              </Typography>
            </LoanDetailsItem>
          </LoanDetailsWrapper>
        </AccordionDetails>
      </CustomAccordian>
    </CreditOfferWrapper>
  );
};

export default CreditOfferPage;
