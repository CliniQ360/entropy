import React, { useEffect } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet } from "react-router-dom";
import AgentHeader from "../../components/AgentHeaderComponent";
import CustomNavbar from "../../components/CustomNavbar";
import { styled } from "@mui/material";
import { useAudioRecorder } from "react-audio-voice-recorder";
import SilenceDetector from "../../components/SilenceDetectorComponent";

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
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    isRecording,
    isPaused,
    mediaRecorder,
  } = useAudioRecorder();

  useEffect(() => {
    handleStartRecording();
  }, []);

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handlePauseResume = () => {
    togglePauseResume();
  };

  const handleSilenceDetected = () => {
    console.log("Silence detected");
    handleStopRecording();
  };

  return (
    <CreditPageContainer>
      <CustomNavbar />
      <AgentHeader />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      {isRecording && (
        <SilenceDetector
          noiseThreshold={10}
          silenceDurationThreshold={3000}
          onSilence={handleSilenceDetected}
        />
      )}
      <PageFooter
        mediaRecorder={mediaRecorder}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        handlePauseResume={handlePauseResume}
        isRecording={isRecording}
        isPaused={isPaused}
      />
    </CreditPageContainer>
  );
};

export default CreditPage;
