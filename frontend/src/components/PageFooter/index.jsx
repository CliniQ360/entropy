import React from "react";
import { Box, Divider, Fab, Stack, styled, Typography } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";
import CloseIcon from "@mui/icons-material/Close";
import { VisualizerLive } from "../LiveAudioWavelengthComponent";

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

const CustomFabButton = styled(Fab)(({ theme, bgColor }) => ({
  backgroundColor: bgColor || "#fff",
  ":hover": {
    backgroundColor: bgColor || "#fff",
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
  handleStopRecording,
  handlePauseResume,
}) => {
  return (
    <FooterContainer>
      <FooterText>
        <Typography fontSize={12} color={"#535353"}>
          Lorem Ipsum has been the industry's standard dummy..
        </Typography>
      </FooterText>
      <FooterActionContainer>
        <CustomFabButton
          onClick={handlePauseResume}
          bgColor={
            mediaRecorder?.state === "recording"
              ? "rgba(30,30,30,0.5)"
              : mediaRecorder?.state === "paused"
              ? "#E25341"
              : "#fff"
          }
          size="large"
          aria-label="mute"
        >
          <MicOffIcon sx={{ color: "white" }} />
        </CustomFabButton>
        <Box>
          <VisualizerLive mediaRecorder={mediaRecorder} />
        </Box>
        <CustomFabButton
          onClick={handleStopRecording}
          bgColor={"#E25341"}
          size="large"
          aria-label="Close"
        >
          <CloseIcon sx={{ color: "white" }} />
        </CustomFabButton>
      </FooterActionContainer>
    </FooterContainer>
  );
};

export default PageFooter;
