import React, { useContext, useEffect, useRef, useState } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet, useLocation } from "react-router-dom";
import AgentHeader from "../../components/AgentHeaderComponent";
import CustomNavbar from "../../components/CustomNavbar";
import { styled } from "@mui/material";
import { createSilenceDetector } from "../../components/SilenceDetectorComponent";
import { useDispatch } from "react-redux";
import { agentConversation } from "./audioAgent.slice";
import { MediaContext, useMediaContext } from "../../context/mediaContext";
import { AudioDataContext } from "../../context/audioDataContext";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder-2";

const CreditPageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const OutletContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(35),
}));

const CreditPage = () => {
  const thread_id = sessionStorage.getItem("thread_id");
  const uploadFlag = sessionStorage.getItem("document_upload_flag");
  const next_state = sessionStorage.getItem("next_state");

  const {
    setError,
    setAudioResponse,
    setMessageResponse,
    setNextState,
    nextState,
  } = useContext(MediaContext);
  const { setCustomerDetails, setAaRedirectUrl } = useContext(AudioDataContext);
  const audioChunks = useRef([]);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  /* CONFIGURING REACT MEdiA RECORDER COMPONENT */

  const handleUploadAudio = async (mediaBlobUrl) => {
    const response = await fetch(mediaBlobUrl);
    const audioBlob = await response.blob();
    setAudioBlob(audioBlob);
    const formData = new FormData();
    formData.append("file", audioBlob, "audio_recording.mp3");
    const payload = {
      file: formData,
      threadId: thread_id,
      uploadFlag: uploadFlag,
      state: next_state,
    };

    dispatch(agentConversation(payload))
      .then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setError(true);

          return;
        }
        setError(false);
        console.log(res?.payload?.data);

        setAudioResponse(res?.payload?.data?.audio_file);
        setMessageResponse(res?.payload?.data?.agent_message);
        setCustomerDetails(res?.payload?.data?.customer_details);
        setAaRedirectUrl(res?.payload?.data?.aa_redirect_url);
        setNextState(res?.payload?.data?.next_state);
        setTimeout(() => {
          sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
        }, 300);
        sessionStorage.setItem("txn_id", res?.payload?.data?.txn_id);
        clearBlobUrl();
      })
      .catch((error) => {
        console.error("Error uploading the audio file:", error);
      });
  };

  const {
    status,
    startRecording,
    pauseRecording,
    stopRecording,
    resumeRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    onStop: handleUploadAudio,
  });

  const handlePauseAudio = () => {
    pauseRecording();
    setIsPaused(true);
  };

  const handleResumeAudio = () => {
    resumeRecording();
    setIsPaused(false);
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
  };
  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
  };

  const onSilence = () => {
    console.log("Silence Detected");
    handleStopRecording();
    handleStartRecording();
  };

  /* INITIALIZING THE SILENCE DETECTER */
  useEffect(() => {
    const silenceDetector = createSilenceDetector({
      noiseThreshold: 10,
      silenceDurationThreshold: 3000,
      onSilence,
    });

    if (isRecording && !isPaused) {
      silenceDetector.start();
    } else {
      silenceDetector.stop();
    }

    return () => {
      silenceDetector.stop();
    };
  }, [isRecording, isPaused]);

  return (
    <CreditPageContainer>
      <CustomNavbar />
      <AgentHeader />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <PageFooter
        // mediaRecorder={mediaRecorder}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        handlePauseAudio={handlePauseAudio}
        handleResumeAudio={handleResumeAudio}
        isRecording={isRecording}
        isPaused={isPaused}
        audioBlob={audioBlob}
      />
    </CreditPageContainer>
  );
};

export default CreditPage;
