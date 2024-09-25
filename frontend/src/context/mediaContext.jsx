import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

const MediaContextProvider = ({ children }) => {
  const [audioResponse, setAudioResponse] = useState("");
  const [messageResponse, setMessageResponse] = useState("");
  const [nextState, setNextState] = useState("");
  const [error, setError] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  return (
    <MediaContext.Provider
      value={{
        audioResponse,
        setAudioResponse,
        messageResponse,
        setMessageResponse,
        error,
        setError,
        nextState,
        setNextState,
        progressValue,
        setProgressValue,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };
