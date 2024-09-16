import React, { useState } from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";

export const Visualizer = ({ mediaRecorder }) => {
  return (
    <div>
      {mediaRecorder && (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder}
          width={200}
          height={75}
        />
      )}
    </div>
  );
};
