import React, { useContext, useEffect, useRef, useState } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet } from "react-router-dom";
import AgentHeader from "../../components/AgentHeaderComponent";
import CustomNavbar from "../../components/CustomNavbar";
import { styled } from "@mui/material";
import { createSilenceDetector } from "../../components/SilenceDetectorComponent";
import { useDispatch } from "react-redux";
import { agentConversation } from "./audioAgent.slice";
import { MediaContext, useMediaContext } from "../../context/mediaContext";
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
  const { audioResponse, setAudioResponse, setMessageResponse } =
    useContext(MediaContext);
  const audioChunks = useRef([]);
  const dispatch = useDispatch();

  // Function to start recording
  const handleStartRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      audioChunks.current = [];
      mediaRecorder.start(1000); // Start with a timeslice to deliver chunks every 1000ms
      setIsRecording(true);
      setIsPaused(false);
    }
  };

  // Function to stop recording (this will be used only for the full stop, not on silence)
  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setTimeout(() => {
        audioChunks.current = [];
        setResetChunks(!resetChunks);
      }, 200);
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
  // Function to handle downloading the audio when silence is detected
  const onSilence = () => {
    console.log("Silence detected for 3 seconds!");

    // Ensure there is data in the audio chunks before proceeding
    if (audioChunks.current.length > 0) {
      // Create a Blob from the audio chunks
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" }); // Use "audio/webm" as format

      // Check if the blob size is greater than 0
      if (audioBlob.size > 0) {
        // Create a FormData object
        const formData = new FormData();

        // Append the Blob to the FormData
        formData.append("audio_file", audioBlob, "agent_audio.webm");

        const payload = {
          audio_file: formData,
        };
        // Prepare the payload with the FormData object
        dispatch(agentConversation(payload))
          .then((res) => {
            setAudioResponse(res?.payload?.data?.audio_file);
            setMessageResponse(res?.payload?.data?.text);
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
