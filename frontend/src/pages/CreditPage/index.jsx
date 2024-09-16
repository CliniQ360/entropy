import React, { useState, useEffect } from "react";
import { Visualizer } from "../../components/LiveAudioWavelengthComponent";

const CreditPage = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const initMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    initMediaRecorder();
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (event) => {
        // Handle the recorded data here
        console.log("Data available:", event.data);
      };

      mediaRecorder.onstop = () => {
        // Handle the stop event here
        console.log("Recording stopped");
      };
    }
  }, [mediaRecorder]);

  return (
    <div>
      <h1>Credit Page</h1>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <Visualizer mediaRecorder={mediaRecorder} />
    </div>
  );
};

export default CreditPage;
