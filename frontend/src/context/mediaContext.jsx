import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

const MediaContextProvider = ({ children }) => {
  const [audioResponse, setAudioResponse] = useState("");
  const [messageResponse, setMessageResponse] = useState("");
  const [error, setError] = useState(false);

  return (
    <MediaContext.Provider
      value={{
        audioResponse,
        setAudioResponse,
        messageResponse,
        setMessageResponse,
        error,
        setError,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };
