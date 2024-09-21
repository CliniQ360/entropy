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
  const { setError, setAudioResponse, setMessageResponse } =
    useContext(MediaContext);
  const audioChunks = useRef([]);
  const audioStream = useRef(null);
  const dispatch = useDispatch();

  // Function to start recording
  const handleStartRecording = () => {
    if (isRecording !== true) {
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
        setIsPaused(false);
      });
    }
  };

  // Function to stop recording (this will be used only for the full stop, not on silence)
  const handleStopRecording = () => {
    if (isRecording !== false) {
      mediaRecorder.stop();
      setTimeout(() => {
        // Restart recording after stopping, with a short delay
        audioChunks.current = [];
        setIsRecording(false);
      }, 200);
    }
  };

  // Function to pause/resume recording
  const handlePauseResume = () => {
    if (isRecording === true && isPaused !== true) {
      mediaRecorder.pause();
      setIsPaused(true);
    } else if (isPaused !== false) {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      audioStream.current = stream;
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
      setIsPaused(false);
    });

    return () => {
      // Clean up: Stop the media recorder and release resources
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    };
  }, []);

  // Silence detection hook
  useEffect(() => {
    // Function to handle downloading the audio when silence is detected
    const onSilence = () => {
      console.log("Silence detected for 3 seconds!");

      // Ensure there is data in the audio chunks before proceeding
      if (audioChunks.current.length > 0) {
        // Create a Blob from the audio chunks
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });

        if (audioBlob.size > 0) {
          // Create a FormData object
          const formData = new FormData();
          formData.append("audio_file", audioBlob, "agent_audio.webm");

          const payload = {
            audio_file: formData,
          };

          dispatch(agentConversation(payload))
            .then((res) => {
              if (res?.error && Object.keys(res?.error)?.length > 0) {
                setError(true);
                return;
              }
              setError(false);
              setAudioResponse(res?.payload?.data?.audio_file);
              setMessageResponse(res?.payload?.data?.text);
            })
            .catch((error) => {
              console.error("Error uploading the audio file:", error);
            });

          // Use a new MediaRecorder to continue recording in the background while uploading
          const clonedStream = audioStream.current.clone(); // Clone the original stream
          const newRecorder = new MediaRecorder(clonedStream);

          newRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunks.current.push(event.data);
            }
          };

          // Start the new recorder while the original one keeps running
          newRecorder.start(1000);

          // Optionally handle newRecorder stop logic if needed
          setTimeout(() => {
            newRecorder.stop();
          }, 3000); // Stop after a few seconds to avoid unnecessary resource use
        } else {
          console.warn("Recorded audio size is zero, skipping upload.");
        }
      } else {
        console.warn("No audio data available.");
      }
    };

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
