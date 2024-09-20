import React, { useEffect, useRef, useState } from "react";

const AudioVisualizer = ({
  audioBlob, // Audio blob to visualize
  numBars,
  barWidth,
  barColor,
  height,
  gap,
}) => {
  const canvasRef = useRef(null);
  const [analyser, setAnalyser] = useState(null);

  useEffect(() => {
    if (audioBlob) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 64;
      analyserNode.smoothingTimeConstant = 0.8;
      analyserNode.minDecibels = -90;
      analyserNode.maxDecibels = -10;

      const sourceNode = audioContext.createBufferSource();

      audioBlob.arrayBuffer().then((arrayBuffer) => {
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          sourceNode.buffer = audioBuffer;
          sourceNode.connect(analyserNode);
          analyserNode.connect(audioContext.destination);

          sourceNode.start();
          setAnalyser(analyserNode);
        });
      });

      return () => {
        audioContext.close();
      };
    }
  }, [audioBlob]);

  useEffect(() => {
    if (analyser) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawVisualizer = () => {
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barHeightMultiplier = height / 255; // Scale the frequency data to canvas height

        for (let i = 0; i < numBars; i++) {
          const barHeight = dataArray[i] * barHeightMultiplier;
          const x = i * (barWidth + gap);
          ctx.fillStyle = barColor;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        }

        requestAnimationFrame(drawVisualizer); // Continue drawing at each animation frame
      };

      drawVisualizer();
    }
  }, [analyser, numBars, barWidth, barColor, height, gap]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={numBars * (barWidth + gap)}
        height={height}
      />
    </div>
  );
};

export default AudioVisualizer;
