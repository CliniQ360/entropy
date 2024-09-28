import React, { useContext, useEffect, useRef, useState } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
    setProgressValue,
    setUserResponse,
    setIsListening,
  } = useContext(MediaContext);
  const {
    setCustomerDetails,
    setAaRedirectUrl,
    setKycRedirectUrl,
    setEMandateRedirectUrl,
  } = useContext(AudioDataContext);
  const audioChunks = useRef([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
      state: sessionStorage.getItem("next_state"),
    };

    if (sessionStorage.getItem("offer_item_id") !== "None") {
      payload.offer_item_id = sessionStorage.getItem("offer_item_id");
    }
    if (sessionStorage.getItem("selected_amt") !== "None") {
      payload.selected_loan_amount = sessionStorage.getItem("selected_amt");
    }
    dispatch(agentConversation(payload))
      .then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setError(true);
          return;
        }
        setError(false);
        setAudioResponse(res?.payload?.data?.agent_audio_data);
        setMessageResponse(res?.payload?.data?.agent_message);
        setCustomerDetails(res?.payload?.data?.customer_details);
        setUserResponse(res?.payload?.data?.user_message);
        setAaRedirectUrl(res?.payload?.data?.aa_redirect_url);
        setNextState(res?.payload?.data?.next_state);
        sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
        sessionStorage.setItem("txn_id", res?.payload?.data?.txn_id);

        if (res?.payload?.data?.next_state === "resume_after_kyc_redirect") {
          navigate("/credit/kyc-page");
          console.log("kyc_redirect_url", res?.payload?.data?.kyc_redirect_url);
          setKycRedirectUrl(res?.payload?.data?.kyc_redirect_url);
        } else if (
          res?.payload?.data?.next_state === "human_loan_amount_selection"
        ) {
          navigate("/credit/customize-offers");
          setProgressValue(50);
        } else if (res?.payload?.data?.next_state === "human_selection") {
          setProgressValue(40);
        }
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
    setIsListening(false);
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
    setIsListening(false);
    handleStartRecording();
  };

  /* INITIALIZING THE SILENCE DETECTER */
  useEffect(() => {
    const silenceDetector = createSilenceDetector({
      noiseThreshold: 10,
      silenceDurationThreshold: 3000,
      onSilence,
      onSound: (isSoundDetected) => {
        if (isSoundDetected) {
          console.log("Sound Recording on");
          setIsListening(true);
        }
      },
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
