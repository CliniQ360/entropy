import React, { useState, useEffect, useRef } from "react";
import { AudioVisualizer } from "react-audio-visualize";

const AudioBarComponentVisualizer = ({ blob }) => {
  const audioRef = useRef(null);
  const visualizerRef = useRef(null);

  // useEffect(() => {
  //   if (blob) {
  //     const audioUrl = URL.createObjectURL(blob);
  //     audioRef.current.src = audioUrl;

  //     // Cleanup on unmount
  //     return () => {
  //       URL.revokeObjectURL(audioUrl);
  //     };
  //   }
  // }, [blob]);

  return (
    <div>
      {blob && (
        <>
          <AudioVisualizer
            blob={blob}
            ref={visualizerRef}
            width={42}
            height={24}
            barWidth={3}
            gap={2}
            barColor={"#f76565"}
          />
        </>
      )}
    </div>
  );
};

export default AudioBarComponentVisualizer;
