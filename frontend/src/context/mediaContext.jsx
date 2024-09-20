import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

const MediaContextProvider = ({ children }) => {
  const [audioResponse, setAudioResponse] = useState("");
  const [messageResponse, setMessageResponse] = useState("");

  return (
    <MediaContext.Provider
      value={{
        audioResponse,
        setAudioResponse,
        messageResponse,
        setMessageResponse,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };
