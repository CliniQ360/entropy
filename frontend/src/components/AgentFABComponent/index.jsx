import React, { useState, useEffect, useContext, useRef } from "react";
import Draggable from "react-draggable";
import {
  Button,
  keyframes,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import felameAst from "../../assets/v4DesignImages/Patners/femaleast.png";
import { MediaContext } from "../../context/mediaContext";
import femaleAst from "../../assets/v4DesignImages/Patners/femaleast.png";

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

const ProfileIcon = styled("div")(({ theme, type }) => ({
  height: "56px",
  width: "56px",
  border: "2px solid #00A91C",
  borderRadius: "50%",
  backgroundImage: type === "male" ? `url(${maleAst})` : `url(${femaleAst})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const MessageBox = styled(Button)(
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
        xPosition < screenWidth / 2 ? "translateX(10%)" : "translateX(-90%)",
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

const DraggableAgentFAB = ({ setDrawerOpen }) => {
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
  const audioRef = useRef(null);
  const previousAudioUrlRef = useRef(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const [xPosition, setXPosition] = useState(screenWidth - 60);
  const activeLanguage = sessionStorage.getItem("activeLanguage");
  const assistantType = sessionStorage.getItem("assistantType");

  useEffect(() => {
    if (messageResponse || listening || processing || uploadDocument) {
      setMessageVisible(true);
      if (messageResponse) {
        const timer = setTimeout(() => {
          setMessageVisible(false);
        }, 10000);
        return () => clearTimeout(timer);
      }
    } else {
      setMessageVisible(false);
    }
  }, [messageResponse, listening, processing, uploadDocument]);

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
          .then(() => { })
          .catch((error) => {
            console.error("Error attempting to play audio:", error);
          });
      }
    }
  }, [audioSrc]);

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
        defaultPosition={{ x: screenWidth - 60, y: 100 }}
        bounds={{
          left: 0,
          top: 60,
          right: screenWidth - 60,
          bottom: screenHeight - 170,
        }}
        onDrag={handleDrag}
      >
        <Container>
          <ProfileIcon type={assistantType} />
          <MessageBox
            onClick={() => {
              console.log("MessageBox clicked");
              setDrawerOpen(true);
            }}
            xPosition={xPosition}
            screenWidth={screenWidth}
            visible={messageVisible}
          >
            {!error ? (
              processing ? (
                <Typography
                  sx={{
                    color: "#171717",
                    fontSize: "12px",
                    textAlign: "center",
                    fontFamily: "source sans pro",
                    textTransform: "initial",
                  }}
                >
                  {activeLanguage === "hi" ? "प्रक्रिया में है" : "Processing"}
                  <DotsAnimationContainer className="dotsAnimation" />
                </Typography>
              ) : listening ? (
                <Typography
                  sx={{
                    color: "#171717",
                    fontSize: "12px",
                    textAlign: "center",
                    fontFamily: "source sans pro",
                    textTransform: "initial",
                  }}
                >
                  {activeLanguage === "hi" ? "सुनना जारी है" : "Listening"}
                  <DotsAnimationContainer className="dotsAnimation" />
                </Typography>
              ) : uploadDocument ? (
                <Typography
                  sx={{
                    color: "#171717",
                    fontSize: "12px",
                    textAlign: "center",
                    fontFamily: "source sans pro",
                    textTransform: "initial",
                  }}
                >
                  {activeLanguage === "hi" ? "अपलोड जारी है" : "Uploading"}
                  <DotsAnimationContainer className="dotsAnimation" />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "#171717",
                    fontSize: "12px",
                    textAlign: "left",
                    fontFamily: "source sans pro",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textTransform: "initial",
                  }}
                >
                  {messageResponse}
                </Typography>
              )
            ) : (
              <Typography
                sx={{
                  color: "#171717",
                  fontSize: "12px",
                  textAlign: "left",
                  fontFamily: "source sans pro",
                  textTransform: "initial",
                }}
              >
                {activeLanguage === "hi"
                  ? "अरे! कृपया बेहतर संवाद के लिए माइक को अपने मुंह के करीब लाएँ।"
                  : "Oops! Please bring the mic closer to your mouth for better communication."}
              </Typography>
            )}
          </MessageBox>
        </Container>
      </Draggable>
    </>
  );
};

export default DraggableAgentFAB;
