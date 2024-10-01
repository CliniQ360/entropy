import React, { createContext, useEffect, useState } from "react";

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
  const [uploadDocument, setUploadDocument] = useState(false);
  const [chats, setChats] = useState([]);

  const addChat = (message, sender) => {
    if (message === null) return;
    setChats((prevChats) => [
      ...prevChats,
      { sender: sender, message: message },
    ]);
  };

  useEffect(() => {
    if (
      messageResponse &&
      messageResponse !== "None" &&
      messageResponse !== "" &&
      messageResponse !== null
    ) {
      addChat(messageResponse, "agent");
    }
    if (
      userResponse &&
      userResponse !== "None" &&
      userResponse !== "" &&
      userResponse !== null
    ) {
      addChat(userResponse, "user");
    }
  }, [messageResponse, userResponse]);

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
        uploadDocument,
        setUploadDocument,
        chats,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaContextProvider };
