import React, { useEffect, useRef } from "react";

const AudioBarComponentVisualizer = ({ audioBlob }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (audioBlob) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64; // Adjust for the number of bars
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      // Create audio source
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      // Start audio playback
      audio.play();

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        // Clear canvas before each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = canvas.width / bufferLength;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;

          ctx.fillStyle = "#f76565"; // Bar color
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 2; // Adjust gap between bars
        }
      };

      draw();

      return () => {
        cancelAnimationFrame(animationRef.current);
        audioContext.close();
      };
    }
  }, [audioBlob]);

  return <canvas ref={canvasRef} width={300} height={150} />;
};

export default AudioBarComponentVisualizer;
