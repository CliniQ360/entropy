import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Backdrop, Stack, styled, Typography } from "@mui/material";

const TimeContainer = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",
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

          <Typography fontSize={"2.5rem"} color={"black"}>
            Please Be Patient
          </Typography>
          <CountdownCircleTimer
            isPlaying
            size={250}
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
                <Typography fontSize={"1.5rem"} color={"black"}>
                  Remaining
                </Typography>
                <Typography fontSize={"3rem"} color={"black"}>
                  {remainingTime}
                </Typography>
                <Typography fontSize={"1.5rem"} color={"black"}>
                  Seconds
                </Typography>
              </Stack>
            )}
          </CountdownCircleTimer>
          <Typography fontSize={"2.5rem"} color={"black"}>
            Fetching Offers
          </Typography>
        </Stack>
      </TimeContainer>
    )
  );
};

export default CustomTimer;
