import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Fab,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Lottie from "lottie-react";
import audioAnimation from "../../utils/lottieJson/audioAnimation.json";
import { MediaContext } from "../../context/mediaContext";
import ChatIcon from "../../utils/CustomIcons/ChatIcon";
import SettingIcon from "../../utils/CustomIcons/SettingIcon";
import MicIcon from "../../utils/CustomIcons/MicIcon";
import MuteIcon from "../../utils/CustomIcons/MuteIcon";
import CustomDrawer from "../CustomBottomDrawer";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: "white",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 100,
  boxShadow: "-20px 5px 20px 1px rgba(0, 0, 0, 0.2)",
}));

const FooterText = styled(Box)(({ theme }) => ({
  backgroundColor: "#EAF2FF",
  borderBottom: "1px solid #DBDBDB",
  padding: theme.spacing(2, 6),
}));

const CustomFabButtonWrapper = styled(Stack)(({ theme, bgcolor }) => ({
  // height: "65px",
  // width: "65px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0188e854",
  border: "2px solid #0188E8 ",
  padding: 2,
}));

const CustomFabButton = styled(Stack)(({ theme, bgcolor }) => ({
  height: "60px",
  width: "60px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 2,
  backgroundColor: bgcolor || "#fff",
  ":hover": {
    backgroundColor: bgcolor || "#fff",
  },
}));

const FooterActionContainer = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing(8),
  padding: theme.spacing(6, 4),
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
      lottieRef?.current?.play();
    } else if (isPaused) {
      lottieRef?.current?.stop();
    }
  }, [isRecording, isPaused]);

  const { userResponse } = useContext(MediaContext);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0; // Force scroll to start (left side)
    }
  }, []);

  return (
    <FooterContainer>
      {/* <Stack
        alignItems={"center"}
        justifyContent={"center"}
        padding={2}
        sx={{ whiteSpace: "nowrap" }}
        width={"100%"}
        height={"25px"}
        ref={scrollRef} // Attach ref to the Stack
      >
        <FooterText>
          <Typography
            fontSize={12}
            color={"#535353"}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {!userResponse ? "Welcome to Cliniq360 Sahayak" : userResponse}
          </Typography>
        </FooterText>
      </Stack> */}
      <FooterActionContainer>
        <IconButton sx={{ padding: 1 }}>
          <ChatIcon width={27} color={"black"} />
        </IconButton>

        {isRecording ? (
          <>
            {isPaused ? (
              <CustomFabButtonWrapper>
                <CustomFabButton
                  onClick={handleResumeAudio}
                  bgcolor={"#0054BA"}
                  size="large"
                  aria-label="mute"
                >
                  <MuteIcon color={"white"} width={20} height={25} />
                </CustomFabButton>
              </CustomFabButtonWrapper>
            ) : (
              <CustomFabButtonWrapper>
                <CustomFabButton
                  onClick={handlePauseAudio}
                  bgcolor={"#0054BA"}
                  size="large"
                  aria-label="mute"
                >
                  <MicIcon color={"white"} width={24} height={24} />
                </CustomFabButton>
              </CustomFabButtonWrapper>
            )}
            {/* <CustomFabButtonWrapper>
              <CustomFabButton
                onClick={handleStartRecording}
                size="large"
                aria-label="Close"
                bgcolor={"#535353"}
              >
                <MicIcon color={"white"} width={24} height={24} />
              </CustomFabButton>
            </CustomFabButtonWrapper> */}

            {/* <Box sx={{ width: "30%" }}>
              <Lottie
                lottieRef={lottieRef}
                animationData={audioAnimation}
                autoPlay={true}
              />{" "}
            </Box> */}
          </>
        ) : (
          <>
            <CustomFabButtonWrapper>
              <CustomFabButton
                onClick={handleStartRecording}
                size="large"
                aria-label="Close"
                bgcolor={"#535353"}
              >
                <MuteIcon color={"white"} width={20} height={25} />
              </CustomFabButton>
            </CustomFabButtonWrapper>
          </>
        )}
        <IconButton sx={{ padding: 1 }}>
          <SettingIcon />
        </IconButton>
      </FooterActionContainer>
    </FooterContainer>
  );
};

export default PageFooter;
