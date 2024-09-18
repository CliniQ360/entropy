import { Stack, styled, Typography } from "@mui/material";
import React from "react";
const PreviewDocumentWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(5),
  width: "100%",
}));

const PreviewHeaderContainer = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  justifyContent: "flex-start",
  alignItems: "center",
}));
const PDFPreviewSection = styled("div")(({ theme }) => ({
  flexDirection: "column",
  boxShadow: "0 0 10px 3px #D2D2D2",
  height: "300px",
  width: "100%",
}));
const PdfPreview = styled("div")(({ theme }) => ({
  flex: 1,
}));
const PreviewBottomSection = styled("div")(({ theme }) => ({
  backgroundColor: "#F8F8F8",
}));

const PreviewDocumentPage = () => {
  return (
    <PreviewDocumentWrapper>
      <PreviewHeaderContainer>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.4rem",
            fontFamily: "plus jakarta sans",
          }}
        >
          Header
        </Typography>
      </PreviewHeaderContainer>
      <PDFPreviewSection>
        <PdfPreview></PdfPreview>
        <PreviewBottomSection></PreviewBottomSection>
      </PDFPreviewSection>
    </PreviewDocumentWrapper>
  );
};

export default PreviewDocumentPage;
