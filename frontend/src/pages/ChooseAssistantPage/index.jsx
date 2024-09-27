import {
  Button,
  IconButton,
  keyframes,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import maleAst from "../../assets/v4DesignImages/Patners/maleast.png";
import femaleAst from "../../assets/v4DesignImages/Patners/femaleast.png";
import AudioBarComponentVisualizer from "../../components/AudioWavelengthComponent";
import AudioBarIcon from "../../utils/CustomIcons/BarIcon";
import { useDispatch } from "react-redux";
import { startConversion } from "../CreditPage/audioAgent.slice";
import { MediaContext } from "../../context/mediaContext";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled("div")(({ theme }) => ({}));

const RedirectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  padding: theme.spacing(2),
}));
const HeadingSection = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(10),
}));
const AssistantChangeSectionWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(10),
}));

const ActionChangeSectionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  borderRadius: "30px",
  backgroundColor: "#EAF2FF",
  width: "200px",
  height: "35px",
  position: "relative",
}));

const Slider = styled("div")(({ activeButton }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 4,
  left: activeButton === 0 ? 0 : "50%",
  width: "50%",
  height: "85%",
  backgroundColor: "#0188E8",
  borderRadius: "30px",
  transition: "left 0.3s ease-in-out",
}));

const ToggleButton = styled(Button)(({ theme, isActive }) => ({
  zIndex: 1,
  backgroundColor: "transparent",
  color: isActive ? "#fff" : "#000",
  width: "50%",
  height: "100%",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "color 0.3s ease-in-out",
  margin: 1,
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
const AssistantProfilePhotoWrapper = styled("div")(({ theme, isActive }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(8),
  gap: theme.spacing(7),
  flexDirection: "column",
}));
const AssistantProfilePhoto = styled("div")(({ theme, activeIndex }) => ({
  height: "240px",
  width: "240px",
  borderRadius: "50%",
  backgroundImage: activeIndex === 0 ? `url(${maleAst})` : `url(${femaleAst})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));
const FooterButtonWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  bottom: 25,
  left: 0,
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const FooterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "#0054BA",
  color: "white",
  fontSize: "1.4rem",
  width: "90%",
  boxShadow: "none",
}));

const ChooseAssistant = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const { setAudioResponse, setMessageResponse, setNextState, setError } =
    useContext(MediaContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const handleInitConversion = () => {
    dispatch(startConversion()).then((res) => {
      if (res?.error && Object.keys(res?.error)?.length > 0) {
        setError(true);
        return;
      }
      setError(false);
      setAudioResponse(res?.payload?.agent_audio_data);
      setMessageResponse(res?.payload?.agent_message);
      sessionStorage.setItem("next_state", res?.payload?.next_state);
      setNextState(res?.payload?.next_state);
      sessionStorage.setItem("thread_id", res?.payload?.thread_id);
      navigate("/credit/route-3");
    });
  };
  return (
    <PageWrapper>
      <RedirectionContainer>
        <IconButton>
          <KeyboardArrowLeftIcon sx={{ fontSize: "2.2rem", color: "black" }} />
        </IconButton>
      </RedirectionContainer>
      <HeadingSection>
        <Typography
          sx={{ fontSize: "1.4rem", fontFamily: "plus jakarta sans bold" }}
        >
          Choose your assistant for today
        </Typography>
      </HeadingSection>
      <AssistantChangeSectionWrapper>
        <ActionChangeSectionContainer>
          <Slider activeButton={activeButton} />
          <ToggleButton
            onClick={() => handleButtonClick(0)}
            isActive={activeButton === 0}
          >
            Name 1
          </ToggleButton>
          <ToggleButton
            onClick={() => handleButtonClick(1)}
            isActive={activeButton === 1}
          >
            Name 2
          </ToggleButton>
        </ActionChangeSectionContainer>
      </AssistantChangeSectionWrapper>
      <AssistantProfilePhotoWrapper>
        <AssistantProfilePhoto activeIndex={activeButton} />
        <Stack justifyContent={"center"} alignItems={"center"}>
          <AudioBarIcon width={50} height={60} />
        </Stack>
        <Stack padding={6}>
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "1.2rem", color: "#535353" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Typography>
        </Stack>
      </AssistantProfilePhotoWrapper>
      <FooterButtonWrapper>
        <FooterButton variant="contained" onClick={handleInitConversion}>
          Button
        </FooterButton>
      </FooterButtonWrapper>
    </PageWrapper>
  );
};

export default ChooseAssistant;
