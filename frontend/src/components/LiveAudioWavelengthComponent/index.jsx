import React from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";

export const VisualizerLive = ({ mediaRecorder }) => {
  return (
    <div>
      {mediaRecorder && (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder}
          width={42}
          height={24}
          barWidth={3}
          gap={2}
          barColor={"#0054BA"}
          maxDecibels={-30}
          minDecibels={-100}
          smoothingTimeConstant={0.1}
        />
      )}
    </div>
  );
};
