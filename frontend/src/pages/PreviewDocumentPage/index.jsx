import { Box, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DownloadIcon from "../../utils/CustomIcons/DownloadIcon";
const PreviewDocumentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
  width: "100%",
}));

const PreviewHeaderContainer = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  justifyContent: "center",
  alignItems: "flex-start",
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

const FAQSectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(7),
}));
const FAQItemSection = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  backgroundColor: "#F8F8F8",
  height: "50px",
}));

const PreviewDocumentPage = () => {
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
    <PreviewDocumentWrapper>
      <PreviewHeaderContainer>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            fontFamily: "Plus Jakarta Sans Bold",
            marginBottom: "10px",
          }}
        >
          Header
        </Typography>
      </PreviewHeaderContainer>
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
          <Stack mr={6} onClick={handleDownload}>
            <DownloadIcon width={"18"} />
          </Stack>
        </PreviewBottomSection>
      </PDFPreviewSection>
      <FAQSectionWrapper>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            fontFamily: "Plus Jakarta Sans Bold",
            marginBottom: "10px",
          }}
        >
          FAQ
        </Typography>
        <Stack gap={4}>
          <FAQItemSection>
            <Typography sx={{ fontSize: "1.2rem" }}>
              Lorem Ipsum is simply dummy text{" "}
            </Typography>
          </FAQItemSection>
          <FAQItemSection>
            <Typography sx={{ fontSize: "1.2rem" }}>
              Lorem Ipsum is simply dummy text{" "}
            </Typography>
          </FAQItemSection>
          <FAQItemSection>
            <Typography sx={{ fontSize: "1.2rem" }}>
              Lorem Ipsum is simply dummy text{" "}
            </Typography>
          </FAQItemSection>
        </Stack>
      </FAQSectionWrapper>
    </PreviewDocumentWrapper>
  );
};

export default PreviewDocumentPage;
