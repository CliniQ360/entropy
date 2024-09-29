import { Divider, keyframes, Stack, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import femaleAst from "../../assets/v4DesignImages/Patners/femaleast.png";
import AudioBarIcon from "../../utils/CustomIcons/BarIcon";
import { MediaContext } from "../../context/mediaContext";
import AudioBarComponentVisualizer from "../AudioWavelengthComponent";
import AudioVisualizer from "../AudioWavelengthComponent";

const HeaderComponentWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
}));
const HeaderComponent = styled("div")(({ theme }) => ({
  width: "90%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#EAF2FF",
  borderRadius: "10px",
}));
const HeaderIconSection = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3, 5),
}));
const ProfileIcon = styled("div")(({ theme }) => ({
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  backgroundImage: `url(${maleAst})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const styles = `
@keyframes scrollText {
  0% {
    transform: translateX(100%); // Start from off-screen right
  }
  100% {
    transform: translateX(-100%); // Move to off-screen left
  }
}
`;

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

// Inject the keyframes into the document dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const AgentHeader = () => {
  const { audioResponse, messageResponse, error, listening, processing } =
    useContext(MediaContext);
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);
  const previousAudioUrlRef = useRef(null);
  const [checkLenght, setCheckLenght] = useState(false);

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

  return (
    <HeaderComponentWrapper>
      <HeaderComponent>
        <HeaderIconSection>
          <Stack
            gap={2}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ProfileIcon />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                fontFamily: "plus jakarta sans",
                ml: 2,
              }}
            >
              Agent Name
            </Typography>
          </Stack>
          <Stack justifyContent={"center"} alignItems={"center"}>
            {audioSrc && (
              <>
                <AudioVisualizer
                  audioBlob={audioBlob}
                  numBars={5}
                  barWidth={5}
                  barColor="#0054BA"
                  height={20}
                  gap={3}
                />
                <audio
                  ref={audioRef}
                  src={audioSrc}
                  autoPlay
                  style={{ display: "none" }}
                />
              </>
            )}
          </Stack>
        </HeaderIconSection>
        <Divider />
        <Stack
          alignItems="center"
          justifyContent="center"
          padding={2}
          sx={{
            overflow: "hidden", // Hide text overflow
            whiteSpace: "nowrap", // Ensure text stays on one line
            height: "25px",
          }}
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
            ) : (
              <Typography
                sx={{
                  color: "#535353",
                  fontSize: "1rem",
                  fontFamily: "source sans pro",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  position: "relative",
                  display: "inline-block",
                  animation: checkLenght
                    ? "scrollText 20s linear infinite"
                    : "none",
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
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                position: "relative",
                display: "inline-block",
                animation: "scrollText 20s linear infinite",
              }}
            >
              Oops! Please bring the mic closer to your mouth for better
              communication.
            </Typography>
          )}
        </Stack>
      </HeaderComponent>
    </HeaderComponentWrapper>
  );
};

export default AgentHeader;
