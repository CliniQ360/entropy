import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  styled,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "../../utils/CustomIcons/DownloadIcon";

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
  marginTop: "20px",
}));
const LoanDetailsWrapper = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
  padding: "10px",
}));
const LoanDetailsItem = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(2),
}));

const PDFPreviewSection = styled("div")(({ theme }) => ({
  flexDirection: "column",
  boxShadow: "0 0 10px 3px #d2d2d278",
  height: "250px",
  width: "100%",
}));
const PdfPreview = styled("div")(({ theme }) => ({
  height: "80%",
  flex: 1,
}));
const PreviewBottomSection = styled("div")(({ theme }) => ({
  backgroundColor: "#F8F8F8",
  height: "20%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const CreditOfferPage = () => {
  const pdfUrl =
    "https://pramaan.ondc.org/beta/preprod/mock/seller/document/agreement.pdf";
  const [showLoader, setShowLoader] = useState(false);

  const handleDownload = async () => {
    try {
      setShowLoader(true);
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      setShowLoader(false);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Loan Agreement.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };
  return (
    <CreditOfferWrapper>
      <CreditHeaderSection>
        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#00A91C",
            fontFamily: "plus jakarta sans bold",
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
      <PDFPreviewSection>
        <PdfPreview>
          <iframe src={pdfUrl} title="PDF Preview" width="100%" height="100%" />
        </PdfPreview>
        <PreviewBottomSection>
          <Box ml={5}>
            <Typography
              sx={{ fontFamily: "source sans pro", fontSize: "1.1rem" }}
            >
              Loan Agreement.pdf
            </Typography>
          </Box>
          <Stack mr={6}>
            <IconButton onClick={handleDownload}>
              <DownloadIcon width={"18"} />
            </IconButton>
          </Stack>
        </PreviewBottomSection>
      </PDFPreviewSection>
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
