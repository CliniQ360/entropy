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
  const [timeLeft, setTimeLeft] = useState(120);
  const activeLanguage = sessionStorage.getItem("activeLanguage");

  useEffect(() => {
    if (open) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timerId);
            return 0; // Stop the timer at 0
          }
        });
      }, 1000);

      return () => clearInterval(timerId); // Clean up the interval when component unmounts
    }
  }, [open]);

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
            {activeLanguage === "hi"
              ? "प्रक्रिया लगभग पूरी हो चुकी है"
              : "Almost There!"}
          </Typography>
          <Typography
            fontSize={"1.2rem"}
            color={"black"}
            textAlign={"center"}
            fontFamily={"Inter"}
          >
            {activeLanguage === "hi"
              ? "हम आपके लिए सर्वोत्तम ऑफर ला रहे हैं। कृपया धैर्य रखें, इसके लिए हम आपके आभारी हैं ।"
              : "We are currently fetching the best offers for you. We appreciate your patience!"}
          </Typography>
          <FacebookCircularProgress />
          <Typography
            fontSize={"1.2rem"}
            color={"black"}
            textAlign={"center"}
            fontFamily={"Inter"}
          >
            {timeLeft}{" "}
            {activeLanguage === "hi" ? "सेकंड शेष" : "second remaining"}
          </Typography>
        </Stack>
      </TimeContainer>
    )
  );
};

export default CustomTimer;
