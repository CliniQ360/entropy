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
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resetChunks, setResetChunks] = useState(false);
  const { setError, setAudioResponse, setMessageResponse, nextState } =
    useContext(MediaContext);
  const { setCustomerDetails } = useContext(AudioDataContext);
  const audioChunks = useRef([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const thread_id = sessionStorage.getItem("thread_id");
  const uploadFlag = sessionStorage.getItem("document_upload_flag");
  const next_state = sessionStorage.getItem("next_state");
  // Function to start recording
  const handleStartRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      setTimeout(() => {
        mediaRecorder.start(1000);
        audioChunks.current = [];
        setResetChunks(!resetChunks);
        setIsRecording(true);
        setIsPaused(false);
      }, 200);
    }
  };

  // Function to stop recording (this will be used only for the full stop, not on silence)
  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Function to pause/resume recording
  const handlePauseResume = () => {
    if (mediaRecorder) {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.pause();
        setIsPaused(true);
      } else if (mediaRecorder.state === "paused") {
        mediaRecorder.resume();
        setIsPaused(false);
      }
    }
  };

  // Function to handle downloading the audio when silence is detected
  const onSilence = () => {
    console.log("Silence detected for 3 seconds!");

    // Ensure there is data in the audio chunks before proceeding
    if (audioChunks.current.length > 0) {
      // Create a Blob from the audio chunks
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      // Check if the blob size is greater than 0
      if (audioBlob.size > 0) {
        // Create a FormData object
        const formData = new FormData();

        // Append the Blob to the FormData
        formData.append("file", audioBlob, "agent_audio.webm");

        const payload = {
          file: formData,
          threadId: thread_id,
          uploadFlag: uploadFlag,
          state: next_state,
        };
        // Prepare the payload with the FormData object
        dispatch(agentConversation(payload))
          .then((res) => {
            if (res?.error && Object.keys(res?.error)?.length > 0) {
              setError(true);
              return;
            }
            setError(false);
            setAudioResponse(res?.payload?.data?.audio_file);
            setMessageResponse(res?.payload?.data?.agent_message);
            setCustomerDetails(res?.payload?.data?.customer_details);
          })
          .catch((error) => {
            console.error("Error uploading the audio file:", error);
          });

        // Stop and restart the media recorder to reset its internal state
        mediaRecorder.stop();

        setTimeout(() => {
          // Restart recording after stopping, with a short delay
          audioChunks.current = [];
          mediaRecorder.start(1000); // Restart the recorder after stopping
          setResetChunks(!resetChunks);
        }, 200); // Add a short delay to ensure everything resets properly
      } else {
        console.warn("Recorded audio size is zero, skipping upload.");
      }
    } else {
      console.warn("No audio data available.");
    }
  };

  useEffect(() => {
    // Set up the media recorder when the component mounts
    if (location.pathname === "/credit/route-3") return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      // Set the media recorder and start recording once it's ready testing
      setMediaRecorder(recorder);

      // Start recording immediately after the recorder is set up with a timeslice of 1000ms
      recorder.start(1000);
      setIsRecording(true);
    });

    return () => {
      // Clean up: Stop the media recorder and release resources
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    };
  }, [resetChunks]);

  // Silence detection hook
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
        mediaRecorder={mediaRecorder}
        handleStartRecording={handleStartRecording}
        handleStopRecording={handleStopRecording}
        handlePauseResume={handlePauseResume}
        isRecording={isRecording}
        isPaused={isPaused}
      />
    </CreditPageContainer>
  );
};

export default CreditPage;
