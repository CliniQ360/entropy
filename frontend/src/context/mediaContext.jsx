import React, { createContext, useState } from "react";

const MediaContext = createContext();

const MediaContextProvider = ({ children }) => {
  const [audioResponse, setAudioResponse] = useState("");
  const [messageResponse, setMessageResponse] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [nextState, setNextState] = useState("");
  const [error, setError] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [listening, setIsListening] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [processing, setProcessing] = useState(false);

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
        userResponse,
        setUserResponse,
        listening,
        setIsListening,
        showLoader,
        setShowLoader,
        processing,
        setProcessing,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };
