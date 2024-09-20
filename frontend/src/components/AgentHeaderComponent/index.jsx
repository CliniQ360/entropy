import { Divider, Stack, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import femaleAst from "../../assets/v4DesignImages/Patners/femaleast.png";
import AudioBarIcon from "../../utils/CustomIcons/BarIcon";
import { MediaContext } from "../../context/mediaContext";
import AudioBarComponentVisualizer from "../AudioWavelengthComponent";

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

const AgentHeader = () => {
  const { audioResponse, messageResponse } = useContext(MediaContext);
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

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
      try {
        const audioBlob = base64ToBlob(audioResponse, "audio/wav");
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioSrc(audioUrl);

        // Cleanup URL when component unmounts or audioResponse changes
        return () => {
          URL.revokeObjectURL(audioUrl);
        };
      } catch (error) {
        console.error("Error converting Base64 audio to Blob", error);
      }
    }
  }, [audioResponse]);

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
                <AudioBarComponentVisualizer blob={audioBlob} />
                <audio src={audioSrc} autoPlay style={{ display: "none" }} />
              </>
            )}
          </Stack>
        </HeaderIconSection>
        <Divider />
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          padding={2}
          sx={{ overflowX: "auto" }}
        >
          <Typography
            sx={{
              color: "#535353",
              fontSize: "0.8rem",
              fontFamily: "source sans pro",
            }}
          >
            {messageResponse}
          </Typography>
        </Stack>
      </HeaderComponent>
    </HeaderComponentWrapper>
  );
};

export default AgentHeader;
