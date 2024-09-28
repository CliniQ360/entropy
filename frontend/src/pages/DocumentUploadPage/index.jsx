import React, { useRef, useState } from "react";
import { Stack, styled, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../../utils/CustomIcons/UploadIcon";

const UploadDocumentWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
}));
const DocumentHeaderSection = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
const UploadDocumentContainer = styled("div")(({ theme }) => ({
  gap: theme.spacing(2),
  marginTop: "20px",
}));

const CustomAccordian = styled(Accordion)(({ theme }) => ({
  border: "1.2px solid #D2D2D2",
  boxShadow: "none",
  borderRadius: "10px",
  marginBottom: theme.spacing(3),
}));
const UploadFilesSection = styled("div")(({ theme }) => ({
  border: "1.2px solid #D2D2D2",
  borderStyle: "dashed",
  borderRadius: "10px",
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
const UploadedImagesSection = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
const ImageItem = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  margin: "10px 0",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #D2D2D2",
}));

const DocumentUploadPage = () => {
  const fileInputRef = useRef(null);
  const filePanInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [panImages, setPanImages] = useState([]);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handlePanUploadClick = () => {
    filePanInputRef.current.click();
  };

  /*FOR ADDHAR CARD*/
  const handleFileChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i]);
    }
    if (files.length > 0) {
      setImages([...imagesArray]);
    }
  };
  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages);
  };

  /* PAN CARD IMAGE */
  const handlePanInputChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i]);
    }
    if (files.length > 0) {
      setPanImages([...imagesArray]);
    }
  };

  const handleDeletePanImage = (index) => {
    const updatedImages = panImages.filter((_, imgIndex) => imgIndex !== index);
    setPanImages(updatedImages);
  };

  return (
    <>
      <UploadDocumentWrapper>
        <DocumentHeaderSection>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontFamily: "plus jakarta sans bold",
              textAlign: "left",
            }}
          >
            Lorem Ipsum is simply dummy text
          </Typography>
          <Typography
            sx={{ fontSize: "1rem", color: "#535353", textAlign: "left" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </DocumentHeaderSection>
        <UploadDocumentContainer>
          <CustomAccordian defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={{ fontFamily: "plus jakarta sans bold", ml: 3 }}>
                ADDHAR
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 4 }}>
              <UploadFilesSection onClick={handleUploadClick}>
                <div style={{ marginTop: 3 }}></div>
                <UploadIcon width={"25"} height={"25"} />{" "}
                <Typography
                  sx={{ fontSize: "1.2rem", color: "#535353", mt: 3 }}
                >
                  Browse file to upload
                </Typography>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
              </UploadFilesSection>
              <UploadedImagesSection>
                {images.length > 0 &&
                  images.map((item, index) => (
                    <ImageItem key={index}>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={3}
                      >
                        <BackupTableIcon />
                        <Typography>{item?.name}</Typography>
                      </Stack>
                      <CloseIcon onClick={() => handleDeleteImage(index)} />
                    </ImageItem>
                  ))}
              </UploadedImagesSection>
            </AccordionDetails>
          </CustomAccordian>
          <CustomAccordian>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={{ fontFamily: "plus jakarta sans bold", ml: 3 }}>
                PAN
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 4 }}>
              <UploadFilesSection onClick={handlePanUploadClick}>
                <div style={{ marginTop: 3 }}></div>
                <UploadIcon width={"25"} height={"25"} />{" "}
                <Typography
                  sx={{ fontSize: "1.2rem", color: "#535353", mt: 3 }}
                >
                  Browse file to upload
                </Typography>
                <input
                  type="file"
                  ref={filePanInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handlePanInputChange}
                  multiple
                />
              </UploadFilesSection>
              <UploadedImagesSection>
                {panImages.length > 0 &&
                  panImages.map((item, index) => (
                    <ImageItem key={index}>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={3}
                      >
                        <BackupTableIcon />
                        <Typography>{item?.name}</Typography>
                      </Stack>
                      <CloseIcon onClick={() => handleDeletePanImage(index)} />
                    </ImageItem>
                  ))}
              </UploadedImagesSection>
            </AccordionDetails>
          </CustomAccordian>
        </UploadDocumentContainer>
      </UploadDocumentWrapper>
    </>
  );
};

export default DocumentUploadPage;
