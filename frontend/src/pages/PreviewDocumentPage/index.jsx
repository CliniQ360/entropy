import { Box, Stack, styled, Typography } from "@mui/material";
import React from "react";
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
        <PdfPreview></PdfPreview>
        <PreviewBottomSection>
          <Box ml={5}>
            <Typography
              sx={{ fontFamily: "source sans pro", fontSize: "1.1rem" }}
            >
              FileName.pdf
            </Typography>
          </Box>
          <Stack mr={6}>
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