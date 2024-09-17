import React, { useState, useEffect } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet } from "react-router-dom";
import AgentHeader from "../../components/AgentHeaderComponent";
import CustomNavbar from "../../components/CustomNavbar";
import { Button, styled } from "@mui/material";

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
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    const initMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start(); // Start recording immediately after setup
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    if (!mediaRecorder) {
      initMediaRecorder();
    }

    return () => {
      // Clean up the media stream when the component unmounts or when the mediaRecorder is replaced
      mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
    };
  }, [mediaRecorder, restart]);

  const handlePauseResume = () => {
    if (mediaRecorder) {
      // Check the current state of the mediaRecorder and toggle accordingly
      if (mediaRecorder.state === "recording") {
        mediaRecorder.pause();
        console.log("MediaRecorder paused");
      } else if (mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        console.log("MediaRecorder resumed");
      }
    } else {
      console.error("MediaRecorder not initialized");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      console.log("MediaRecorder stopped");
    }
  };

  return (
    <CreditPageContainer>
      <CustomNavbar />
      <AgentHeader />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <PageFooter
        mediaRecorder={mediaRecorder}
        handleStopRecording={handleStopRecording}
        handlePauseResume={handlePauseResume}
        restart={restart}
        setRestart={setRestart}
      />
    </CreditPageContainer>
  );
};

export default CreditPage;
