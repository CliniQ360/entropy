import React, { useState, useEffect } from "react";
import PageFooter from "../../components/PageFooter";

const CreditPage = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    const initMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start(); // Start recording continuously
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    };

    if (!mediaRecorder) {
      initMediaRecorder();
    }
  }, [mediaRecorder]);

  return (
    <div>
      <h1>Credit Page</h1>
      <PageFooter mediaRecorder={mediaRecorder} />
    </div>
  );
};

export default CreditPage;
