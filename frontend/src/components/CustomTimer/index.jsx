import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Backdrop, keyframes, Stack, styled, Typography } from "@mui/material";

const TimeContainer = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
}));

const ellipsisAnimation = keyframes`
  0%, 100% {
    content: '.';
  }
  33% {
    content: '..';
  }
  66% {
    content: '...';
  }
`;

const DotsAnimationContainer = styled("span")(({ theme }) => ({
  "&::after": {
    content: '"."',
    display: "inline-block",
    width: "1em",
    animation: `${ellipsisAnimation} 1.5s infinite steps(1, end)`,
  },
}));

const CustomTimer = ({ open, onClose, setShowTimer }) => {
  return (
    open && (
      <TimeContainer open={true}>
        <Stack
          direction={"column"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            margin: "20px",
            boxShadow: "0 0 10px 3px #d2d2d278",
          }}
        >
          <svg width="0" height="0">
            <defs>
              <linearGradient
                id="gradientColors"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1976D2" stopOpacity="1" />
                <stop offset="100%" stopColor="#003aa6" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          <Typography
            fontSize={"2.2rem"}
            color={"#0054BA"}
            fontFamily={"plus jakarta sans bold"}
          >
            Please be patient
          </Typography>
          <CountdownCircleTimer
            isPlaying
            size={200}
            duration={60}
            colors="url(#gradientColors)"
            onComplete={() => {
              onClose();
              setShowTimer(false);
              return { shouldRepeat: true };
            }}
          >
            {({ remainingTime }) => (
              <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography fontSize={"1.2rem"} color={"black"}>
                  Remaining
                </Typography>
                <Typography fontSize={"2.5rem"} color={"#0054BA"}>
                  {remainingTime}
                </Typography>
                <Typography fontSize={"1.2rem"} color={"black"}>
                  Seconds
                </Typography>
              </Stack>
            )}
          </CountdownCircleTimer>
          <Typography fontSize={"1.5rem"} color={"black"} textAlign={"center"}>
            Hang tight! We're currently fetching the best offers for you. This
            won't take long
            <DotsAnimationContainer className={"dotsAnimation"} />
          </Typography>
        </Stack>
      </TimeContainer>
    )
  );
};

export default CustomTimer;
