import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  Backdrop,
  keyframes,
  Stack,
  styled,
  Typography,
  Box,
} from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

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

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative", marginTop: 2 }}>
      <CircularProgress
        variant="determinate"
        sx={(theme) => ({
          color: theme.palette.grey[200],
          ...theme.applyStyles("dark", {
            color: theme.palette.grey[800],
          }),
        })}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
          color: "#0054BA",
          animationDuration: "1000ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          ...theme.applyStyles("dark", {
            color: "#308fe8",
          }),
        })}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

const CustomTimer = ({ open, onClose, setShowTimer }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);
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
          <Typography
            fontSize={"1.6rem"}
            color={"#171717"}
            fontFamily={"plus jakarta sans bold"}
          >
            Almost There!
          </Typography>
          <Typography
            fontSize={"1.2rem"}
            color={"black"}
            textAlign={"center"}
            fontFamily={"Inter"}
          >
            We are currently fetching the best offers for you. We appreciate
            your patience!
          </Typography>
          <FacebookCircularProgress />
          <Typography
            fontSize={"1.2rem"}
            color={"black"}
            textAlign={"center"}
            fontFamily={"Inter"}
          >
            {timeLeft} second remaining
          </Typography>
        </Stack>
      </TimeContainer>
    )
  );
};

export default CustomTimer;

{
  /* <svg width="0" height="0">
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
          </svg> */
}

{
  /* <CountdownCircleTimer
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
          </CountdownCircleTimer> */
}
