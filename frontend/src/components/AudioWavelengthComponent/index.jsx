import React, { useState, useRef } from "react";
import { AudioVisualizer } from "react-audio-visualize";

const AudioBarComponentVisualizer = ({ blob, visualizerRef }) => {
  return (
    <div>
      {blob && (
        <AudioVisualizer
          ref={visualizerRef}
          blob={blob}
          width={500}
          height={75}
          barWidth={1}
          gap={0}
          barColor={"#f76565"}
        />
      )}
    </div>
  );
};

export default AudioBarComponentVisualizer;
