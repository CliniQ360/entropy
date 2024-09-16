import ApiPath from "../ApiPath";
import { v4 as uuidv4 } from "uuid";

export const chatStore = (set, get) => ({
  chatMessages: [],
  formData: {},
  currWebSocket: null,
  pendingResponse: false,

  clearChatMessages: () => set({ chatMessages: [], formData: {} }),

  addToChatMessage: (msg, msg_from) => {
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        {
          id: state.chatMessages.length + 1,
          message: msg,
          msg_from: msg_from,
        },
      ],
    }));
  },

  addInfoToForm: (data) => {
    console.log(data);
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    }));
  },

  initChatWebSocket: () => {
    const chat_id = uuidv4();
    const ws = new WebSocket(ApiPath + "fill_form/" + chat_id);
    ws.onopen = (event) => {
      console.log("Websocket connected", chat_id);
      set(() => ({ currWebSocket: ws }));
    };

    ws.onmessage = function (event) {
      const chatMessage = JSON.parse(event?.data);
      get().addToChatMessage(chatMessage?.message || event?.data, "gpt");
      get().addInfoToForm(chatMessage);
      set(() => ({ pendingResponse: false }));
    };
  },

  sendChatMessageAsync: async (msg) => {
    try {
      if (get().currWebSocket !== null) {
        get().addToChatMessage(msg, "user");
        get().currWebSocket.send(msg);
        set(() => ({ pendingResponse: true }));
      } else {
        console.log("Websocket not available");
      }
    } catch (err) {
      console.log(err);
    }
  },
});
