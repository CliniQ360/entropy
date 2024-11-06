import React, { useContext, useEffect, useRef, useState } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet, useNavigate } from "react-router-dom";
// import AgentHeader from "../../components/AgentHeaderComponent";
import CustomNavbar from "../../components/CustomNavbar";
import { styled } from "@mui/material";
import { createSilenceDetector } from "../../components/SilenceDetectorComponent";
import { useDispatch } from "react-redux";
import {
  agentConversation,
  agentConversationForInsurance,
} from "./audioAgent.slice";
import { MediaContext } from "../../context/mediaContext";
import { AudioDataContext } from "../../context/audioDataContext";
import { useReactMediaRecorder } from "react-media-recorder-2";
import CustomLoader from "../../components/CustomLoader";
import CustomDrawer from "../../components/CustomBottomDrawer";
import DraggableAgentFAB from "../../components/AgentFABComponent";

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

const InsurancePage = () => {
  const { showLoader, setShowLoader } = useContext(MediaContext);
  const thread_id = sessionStorage.getItem("thread_id");
  const uploadFlag = sessionStorage.getItem("document_upload_flag");

  const {
    setError,
    setAudioResponse,
    setMessageResponse,
    setNextState,
    setProgressValue,
    setUserResponse,
    setIsListening,
    setProcessing,
    processing,
  } = useContext(MediaContext);
  const {
    setCustomerDetails,
    setAaRedirectUrl,
    setKycRedirectUrl,
    setOfferDetails,
  } = useContext(AudioDataContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* CONFIGURING REACT MEdiA RECORDER COMPONENT */

  const handleUploadAudio = async (mediaBlobUrl) => {
    // setShowLoader(true);
    setProcessing(true);
    const response = await fetch(mediaBlobUrl);
    const audioBlob = await response.blob();
    setAudioBlob(audioBlob);
    const formData = new FormData();
    formData.append("file", audioBlob, "audio_recording.mp3");
    const payload = {
      file: formData,
      threadId: thread_id,
      uploadFlag: uploadFlag || "false",
      state: sessionStorage.getItem("next_state"),
      language: sessionStorage.getItem("activeLanguage"),
    };
    if (sessionStorage.getItem("offer_item_id")) {
      payload.offer_item_id = sessionStorage.getItem("offer_item_id");
    }
    dispatch(agentConversationForInsurance(payload))
      .then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setError(true);
          setProcessing(false);
          return;
        }
        setError(false);
        setProcessing(false);
        setAudioResponse(res?.payload?.data?.agent_audio_data);
        setMessageResponse(res?.payload?.data?.agent_message);
        setCustomerDetails(res?.payload?.data?.customer_details);
        setAaRedirectUrl(res?.payload?.data?.aa_redirect_url);
        setUserResponse(res?.payload?.data?.user_message);
        setNextState(res?.payload?.data?.next_state);
        setOfferDetails(res?.payload?.data?.offer_list);
        sessionStorage.setItem("next_state", res?.payload?.data?.next_state);
        sessionStorage.setItem("txn_id", res?.payload?.data?.txn_id);
        setShowLoader(false);
        if (
          res?.payload?.data?.next_state === "human_document_upload_feedback"
        ) {
          navigate("/insurance/document-upload");
          setProgressValue(20);
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
    setIsListening(false);
  };
  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
    setIsPaused(false);
  };

  const onSilence = () => {
    console.log("Silence Detected");
    handleStopRecording();
    setIsListening(false);
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

  useEffect(() => {
    if (processing) {
      handlePauseAudio();
      setIsPaused(true);
    }
  }, [processing]);

  return (
    <CreditPageContainer>
      <CustomLoader open={showLoader} />
      <CustomNavbar />
      {/* <AgentHeader /> */}
      <DraggableAgentFAB setDrawerOpen={setDrawerOpen} />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
      <CustomDrawer open={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <PageFooter
        // mediaRecorder={mediaRecorder}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
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

export default InsurancePage;
