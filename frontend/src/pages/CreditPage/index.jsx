import React, { useState, useEffect } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet } from "react-router-dom";
import AgentHeader from "../../components/AgentHeaderComponent";
import CustomNavbar from "../../components/CustomNavbar";
import { styled } from "@mui/material";

const CreditPageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const OutletContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(35),
}));

const CreditPage = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    const initMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    if (!mediaRecorder) {
      initMediaRecorder();
    }
  }, [mediaRecorder]);

  return (
    <CreditPageContainer>
      <CustomNavbar />
      <AgentHeader />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <PageFooter mediaRecorder={mediaRecorder} />
    </CreditPageContainer>
  );
};

export default CreditPage;
