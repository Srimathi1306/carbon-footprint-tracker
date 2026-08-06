import api from "./api";

// Create a new support ticket
export const createTicket = (data) => api.post("/support", data);

// Get logged-in user's tickets
export const getMyTickets = () => api.get("/support/my-tickets");

// Get a single ticket with conversation
export const getTicket = (ticketId) => api.get(`/support/${ticketId}`);

// Send a message to an existing ticket
export const sendMessage = (ticketId, data) =>
  api.post(`/support/${ticketId}/message`, data);
