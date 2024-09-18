import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  /* CREATING SOCKET CONNECTION */
  const chatid = uuidv4();
  useEffect(() => {
    const ws = new WebSocket(
      process.env.REACT_APP_SOCKET_BASE_URL + "fill_form/" + chatid
    );
    setSocket(ws);

    return () => socket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
