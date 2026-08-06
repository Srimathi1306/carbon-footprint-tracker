import api from "./api";

export const sendChatMessage = (message) => {
  return api.post("/api/chat", {
    message,
  });
};
