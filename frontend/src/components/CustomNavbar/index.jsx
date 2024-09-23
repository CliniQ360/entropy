import React, { useContext } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button, IconButton, styled } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import LeftArrowIcon from "../../utils/CustomIcons/LeftArrowIcon";
import MultipleFilesIcon from "../../utils/CustomIcons/MultipleFilesIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agentConversation } from "../../pages/CreditPage/audioAgent.slice";
import { MediaContext } from "../../context/mediaContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 3,
  width: "70%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "dark" ? "#308fe8" : "#1a90ff",
  },
}));

const ProgressBarWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const CustomNavbar = ({ progressValue }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setError, setAudioResponse, setMessageResponse, nextState } =
    useContext(MediaContext);
  const thread_id = sessionStorage.getItem("thread_id");
  const uploadFlag = sessionStorage.getItem("document_upload_flag");
  const next_state = sessionStorage.getItem("next_state");
  const handleSkip = () => {
    const payload = {
      threadId: thread_id,
      uploadFlag: false,
      state: next_state,
    };
    dispatch(agentConversation(payload)).then((res) => {
      console.log(res?.payload?.data?.agent_audio_data);
      sessionStorage.setItem("document_upload_flag", false);
      sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
      setAudioResponse(res?.payload?.data?.agent_audio_data);
      setMessageResponse(res?.payload?.data?.agent_message);
      navigate("/credit/personal-Detail");
    });
  };

  return (
    <ProgressBarWrapper>
      <IconButton>
        <LeftArrowIcon color={"black"} />
      </IconButton>
      {/* Adjusted value to 40 for better visibility */}
      <BorderLinearProgress variant="determinate" value={40} />
      <IconButton>
        <MultipleFilesIcon color={"#0054BA"} />
      </IconButton>
      {location.pathname === "/credit/route-3" && (
        <Button variant="contained" onClick={handleSkip}>
          Skip
        </Button>
      )}
    </ProgressBarWrapper>
  );
};

export default CustomNavbar;
