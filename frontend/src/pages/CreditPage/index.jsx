import React, { useEffect, useRef, useState } from "react";
import PageFooter from "../../components/PageFooter";
import { Outlet } from "react-router-dom";
import AgentHeader from "../../components/AgentHeaderComponent";
import CustomNavbar from "../../components/CustomNavbar";
import { styled } from "@mui/material";
import { createSilenceDetector } from "../../components/SilenceDetectorComponent";

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
  const audioChunks = useRef([]);

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
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" }); // Use "audio/webm" as format

      // Check if the blob size is greater than 0
      if (audioBlob.size > 0) {
        // Convert Blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob); // This will trigger onload once the Blob is read
        reader.onloadend = () => {
          const base64Audio = reader.result;

          console.log("Base64 Audio Data:", base64Audio);

          // Create a downloadable link for the base64 audio
          const a = document.createElement("a");
          a.href = base64Audio;
          a.download = "recorded_audio_base64.txt"; // Save as a Base64 text file
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Clear the chunks to continue recording without stopping
          audioChunks.current = [];
        };
      } else {
        console.warn("Recorded audio size is zero, skipping download.");
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

      // Set the media recorder and start recording once it's ready
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
  }, []);

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
