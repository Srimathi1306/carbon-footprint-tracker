import api from "./api";

// Get all support tickets
export const getAllTickets = () => api.get("/admin/support");

// Get a single ticket
export const getTicket = (ticketId) => api.get(`/admin/support/${ticketId}`);

// Admin reply to ticket
export const adminReply = (ticketId, data) =>
  api.post(`/admin/support/${ticketId}/reply`, data);

// Update ticket status
export const updateTicketStatus = (ticketId, status) =>
  api.put(`/admin/support/${ticketId}/status`, {
    status,
  });
