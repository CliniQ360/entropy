import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Fab,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
import { VisualizerLive } from "../LiveAudioWavelengthComponent";
import Lottie from "lottie-react";
import audioAnimation from "../../utils/lottieJson/audioAnimation.json";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: "#EAF2FF",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100,
  boxShadow: "0px -1px 5px 0px rgba(0,0,0,0.2)",
}));

const FooterText = styled(Box)(({ theme }) => ({
  backgroundColor: "#EAF2FF",
  borderBottom: "1px solid #DBDBDB",
  padding: theme.spacing(2, 6),
}));

const CustomFabButton = styled(Fab)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || "#fff",
  ":hover": {
    backgroundColor: bgcolor || "#fff",
  },
}));

const FooterActionContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(8),
  padding: theme.spacing(6, 8),
}));

const PageFooter = ({
  mediaRecorder,
  handleStartRecording,
  handleStopRecording,
  handlePauseResume,
  isRecording,
  isPaused,
  handlePauseAudio,
  handleResumeAudio,
  audioBlob,
}) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      lottieRef.current.play();
    } else if (isPaused) {
      lottieRef.current.stop();
    }
  }, [isRecording, isPaused]);

  return (
    <FooterContainer>
      <FooterText>
        <Typography fontSize={12} color={"#535353"}>
          Lorem Ipsum has been the industry's standard dummy..
        </Typography>
      </FooterText>
      <FooterActionContainer>
        {isRecording ? (
          <>
            {isPaused ? (
              <CustomFabButton
                onClick={handleResumeAudio}
                bgcolor={"#E25341"}
                size="large"
                aria-label="mute"
              >
                <MicOffIcon sx={{ color: "white" }} />
              </CustomFabButton>
            ) : (
              <CustomFabButton
                onClick={handlePauseAudio}
                bgcolor={"rgba(30,30,30,0.5)"}
                size="large"
                aria-label="mute"
              >
                <MicOffIcon sx={{ color: "white" }} />
              </CustomFabButton>
            )}
            {/* <CustomFabButton
              onClick={handlePauseResume}
              bgcolor={!isPaused ? "rgba(30,30,30,0.5)" : "#E25341"}
              size="large"
              aria-label="mute"
            >
              <MicOffIcon sx={{ color: "white" }} />
            </CustomFabButton> */}

            <Box sx={{ width: "30%" }}>
              <Lottie
                lottieRef={lottieRef}
                animationData={audioAnimation}
                autoPlay={true}
              />{" "}
            </Box>
            <CustomFabButton
              onClick={handleStopRecording}
              bgcolor={"#E25341"}
              size="large"
              aria-label="Close"
            >
              <CloseIcon sx={{ color: "white" }} />
            </CustomFabButton>
          </>
        ) : (
          <>
            <CustomFabButton
              onClick={handleStartRecording}
              size="large"
              aria-label="Close"
              bgcolor={"#0054BA"}
            >
              <MicIcon sx={{ color: "white" }} />
            </CustomFabButton>
          </>
        )}
      </FooterActionContainer>
    </FooterContainer>
  );
};

export default PageFooter;
