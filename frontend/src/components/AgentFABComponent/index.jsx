import React, { useState, useEffect, useContext, useRef } from "react";
import Draggable from "react-draggable";
import {
  keyframes,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import { MediaContext } from "../../context/mediaContext";

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

const Container = styled("div")({
  position: "fixed",
  zIndex: 1000,
});

const ProfileIcon = styled("div")({
  height: "56px",
  width: "56px",
  border: "2px solid #00A91C",
  borderRadius: "50%",
  backgroundImage: `url(${maleAst})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
});

const MessageBox = styled("div")(
  ({ theme }) =>
    ({ xPosition, screenWidth, visible }) => ({
      width: "300px",
      display: visible ? "block" : "none",
      marginTop: "10px",
      backgroundColor: "white",
      padding: "10px",
      borderRadius:
        xPosition > screenWidth / 2
          ? "16px 0px 16px 16px"
          : "0px 16px 16px 16px",
      border: "1px solid #0188E8",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      opacity: visible ? 1 : 0,
      transition: "opacity 1s ease-out",
      position: "absolute",
      left: xPosition < screenWidth / 2 ? "0" : "auto",
      right: xPosition >= screenWidth ? "0" : "auto",
      transform:
        xPosition < screenWidth / 2 ? "translateX(0)" : "translateX(-100%)",
      [theme.breakpoints.down("sm")]: {
        width: screenWidth - 100,
      },
    })
);

// Custom hook to get screen height
const useScreenHeight = () => {
  const theme = useTheme();
  const matches = useMediaQuery(
    `(min-height:${theme.breakpoints.values.sm}px)`
  );
  return matches ? window.innerHeight : window.innerHeight;
};

// Custom hook to get screen width
const useScreenWidth = () => {
  const theme = useTheme();
  const matches = useMediaQuery(`(min-width:${theme.breakpoints.values.sm}px)`);
  return matches ? window.innerWidth : window.innerWidth;
};

const DraggableButton = () => {
  const {
    audioResponse,
    messageResponse,
    error,
    listening,
    processing,
    uploadDocument,
  } = useContext(MediaContext);
  const screenHeight = useScreenHeight();
  const screenWidth = useScreenWidth();
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);
  const previousAudioUrlRef = useRef(null);
  const [checkLenght, setCheckLenght] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [xPosition, setXPosition] = useState(screenWidth - 60);

  useEffect(() => {
    if (messageResponse) {
      setMessageVisible(true);
      const timer = setTimeout(() => {
        setMessageVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [messageResponse]);

  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  useEffect(() => {
    if (audioResponse) {
      const blob = base64ToBlob(audioResponse, "audio/wav");
      if (blob) {
        setAudioBlob(blob);
        const newAudioUrl = URL.createObjectURL(blob);
        setAudioSrc(newAudioUrl);

        // Revoke the previous Blob URL to free up memory
        if (previousAudioUrlRef.current) {
          URL.revokeObjectURL(previousAudioUrlRef.current);
        }
        previousAudioUrlRef.current = newAudioUrl;
      }
    }

    // Cleanup when component unmounts
    return () => {
      if (previousAudioUrlRef.current) {
        URL.revokeObjectURL(previousAudioUrlRef.current);
      }
    };
  }, [audioResponse]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch((error) => {
            console.error("Error attempting to play audio:", error);
          });
      }
    }
  }, [audioSrc]);

  useEffect(() => {
    if (messageResponse && messageResponse.length > 40) {
      setCheckLenght(true);
    } else {
      setCheckLenght(false);
    }
  }, [messageResponse]);

  useEffect(() => {
    console.log("listening", listening);
  });

  const handleDrag = (e, data) => {
    setXPosition(data.x);
  };

  return (
    <>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          autoPlay
          style={{ display: "none" }}
        />
      )}
      <Draggable
        defaultPosition={{ x: screenWidth - 60, y: 180 }}
        bounds={{
          left: 0,
          top: 60,
          right: screenWidth - 60,
          bottom: screenHeight - 170,
        }}
        onDrag={handleDrag}
      >
        <Container>
          <ProfileIcon />
          <MessageBox
            xPosition={xPosition}
            screenWidth={screenWidth}
            visible={messageVisible}
          >
            {!error ? (
              processing ? (
                <Typography
                  sx={{
                    color: "#535353",
                    fontSize: "1rem",
                    fontFamily: "source sans pro",
                  }}
                >
                  Processing
                  <DotsAnimationContainer className="dotsAnimation" />
                </Typography>
              ) : listening ? (
                <Typography
                  sx={{
                    color: "#535353",
                    fontSize: "1rem",
                    fontFamily: "source sans pro",
                  }}
                >
                  Listening
                  <DotsAnimationContainer className="dotsAnimation" />
                </Typography>
              ) : uploadDocument ? (
                <Typography
                  sx={{
                    color: "#535353",
                    fontSize: "1rem",
                    fontFamily: "source sans pro",
                  }}
                >
                  Uploading
                  <DotsAnimationContainer className="dotsAnimation" />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "#535353",
                    fontSize: "1rem",
                    fontFamily: "source sans pro",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {messageResponse}
                </Typography>
              )
            ) : (
              <Typography
                sx={{
                  color: "#535353",
                  fontSize: "1rem",
                  fontFamily: "source sans pro",
                }}
              >
                Oops! Please bring the mic closer to your mouth for better
                communication.
              </Typography>
            )}
          </MessageBox>
        </Container>
      </Draggable>
    </>
  );
};

export default DraggableButton;
