import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Stack, styled, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../../utils/CustomIcons/UploadIcon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../../context/mediaContext";
import { AudioDataContext } from "../../context/audioDataContext";
import CustomLoader from "../../components/CustomLoader";
import CorrectIcon from "../../utils/CustomIcons/CorrectIcon";
import {
  agentConversationForInsurance,
  documentUploadForInsurance,
} from "../InsurancePage/audioAgent.slice";

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

const DocumentUploadPageInsurance = () => {
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const {
    setError,
    setAudioResponse,
    setMessageResponse,
    nextState,
    setProgressValue,
    progressValue,
    setUploadDocument,
  } = useContext(MediaContext);
  const { setCustomerDetails } = useContext(AudioDataContext);
  const [showLoader, setShowLoader] = useState(false);
  const [uploadRestriction, setUploadRestriction] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const activeLanguage = sessionStorage.getItem("activeLanguage");

  /*FOR ADDHAR CARD*/
  const handleFileChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i]);
    }
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...imagesArray]);
    }
    event.target.value = null;
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages);
  };

  const handleUploadImages = () => {
    setShowLoader(true);
    setUploadDocument(true);
    setUploadSuccess(false);
    const formData = new FormData();

    images.map((item) => {
      formData.append("files", item);
    });

    const payload = {
      threadId: sessionStorage.getItem("thread_id"),
      files: formData,
      // language: sessionStorage.getItem("activeLanguage"),
    };

    dispatch(documentUploadForInsurance(payload)).then((res) => {
      if (res?.error && Object.keys(res?.error)?.length > 0) {
        setError(true);
        setShowLoader(false);
        return;
      }
      setUploadSuccess(true);
      if (res?.payload) {
        sessionStorage.setItem("document_upload_flag", true);
        const secondpayload = {
          threadId: sessionStorage.getItem("thread_id"),
          uploadFlag: true,
          state: sessionStorage.getItem("next_state"),
          language: sessionStorage.getItem("activeLanguage"),
        };
        dispatch(agentConversationForInsurance(secondpayload)).then((res) => {
          if (res?.error && Object.keys(res?.error)?.length > 0) {
            setError(true);
            setShowLoader(false);
            setUploadDocument(false);
            return;
          }
          setError(false);
          sessionStorage.setItem("document_upload_flag", true);
          setProgressValue(20);
          setUploadDocument(false);
          sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
          setAudioResponse(res?.payload?.data?.agent_audio_data);
          setMessageResponse(res?.payload?.data?.agent_message);
          setCustomerDetails(res?.payload?.data?.customer_details);
          navigate("/insurance/register");
          setShowLoader(false);
        });
      }
    });
  };

  useEffect(() => {
    if (images.length > 0) {
      setUploadRestriction(false);
    } else {
      setUploadRestriction(true);
    }
  }, [images]);

  return (
    <>
      <CustomLoader open={showLoader} />
      <UploadDocumentWrapper>
        <DocumentHeaderSection>
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontFamily: "plus jakarta sans bold",
              textAlign: "left",
            }}
          >
            {/* Please upload your Aadhar and Pan Card Below */}
            {activeLanguage === "hi"
              ? "कृपया नीचे अपना आधार कार्ड अपलोड करें"
              : "Please upload your Aadhar Card Below"}
          </Typography>
        </DocumentHeaderSection>
        <UploadDocumentContainer>
          <CustomAccordian defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Stack
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography
                  sx={{ fontFamily: "plus jakarta sans bold", ml: 3, mr: 3 }}
                >
                  {activeLanguage === "hi" ? "आधार" : "AADHAR"}
                </Typography>
                {uploadSuccess && images.length > 0 && <CorrectIcon />}
              </Stack>
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
        </UploadDocumentContainer>
        <Stack mt={4} mb={3} justifyContent={"center"} alignItems={"flex-end"}>
          <Button
            variant="contained"
            onClick={handleUploadImages}
            disabled={uploadRestriction}
          >
            {activeLanguage === "hi" ? "अपलोड" : "Upload"}
          </Button>
        </Stack>
      </UploadDocumentWrapper>
    </>
  );
};

export default DocumentUploadPageInsurance;
