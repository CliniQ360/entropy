import React, { useEffect, useRef } from "react";

const SilenceDetector = ({
  noiseThreshold = 10,
  silenceDurationThreshold = 3000,
  onSilence,
}) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const silenceStart = useRef(null);

  useEffect(() => {
    // Create an audio context and analyser node for silence detection
    const initAudioAnalyser = () => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);

          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
        })
        .catch((error) => {
          console.error("Microphone access denied:", error);
        });
    };

    initAudioAnalyser();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const checkForSilence = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(dataArray);

    // Calculate the root mean square (RMS) to filter out background noise
    const rms = Math.sqrt(
      dataArray.reduce((sum, value) => sum + (value - 128) ** 2, 0) /
        dataArray.length
    );

    const isSilent = rms < noiseThreshold;

    if (isSilent) {
      if (!silenceStart.current) {
        silenceStart.current = Date.now();
      } else if (Date.now() - silenceStart.current > silenceDurationThreshold) {
        onSilence(); // Call the action after silence is detected for the threshold duration
      }
    } else {
      silenceStart.current = null; // Reset silence start if sound is detected
    }

    requestAnimationFrame(checkForSilence);
  };

  useEffect(() => {
    checkForSilence();
  }, []);

  return null; // This component does not render any UI
};

export default SilenceDetector;
