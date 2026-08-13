import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import AdminTicketCard from "../../components/admin/AdminTicketCard";
import {
  getAllTickets,
  adminReply,
  updateTicketStatus,
} from "../../services/adminSupportService";
import "../../styles/admin-support.css";

function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await getAllTickets();

      setTickets(res.data);

      if (res.data.length > 0 && !selectedTicket) {
        setSelectedTicket(res.data[0]);
        setStatus(res.data[0].status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setStatus(ticket.status);
  };

  const handleReply = async () => {
    if (!reply.trim()) return;

    try {
      await adminReply(selectedTicket.id, {
        message: reply,
      });

      setReply("");

      await loadTickets();

      const updated = tickets.find((t) => t.id === selectedTicket.id);

      if (updated) setSelectedTicket(updated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await updateTicketStatus(selectedTicket.id, status);

      await loadTickets();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="support-page">
        <div className="support-sidebar">
          <h2>Support Tickets</h2>

          {tickets.length === 0 ? (
            <div className="empty-ticket">No Tickets</div>
          ) : (
            tickets.map((ticket) => (
              <AdminTicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => handleSelectTicket(ticket)}
              />
            ))
          )}
        </div>

        <div className="support-chat">
          {!selectedTicket ? (
            <div className="empty-chat">Select a ticket</div>
          ) : (
            <>
              <div className="chat-header">
                <div>
                  <h2>{selectedTicket.subject}</h2>

                  <p>
                    {selectedTicket.category} • {selectedTicket.priority}
                  </p>
                </div>

                <div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>

                  <button onClick={handleStatusUpdate}>Update</button>
                </div>
              </div>

              <div className="chat-messages">
                {selectedTicket.messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={
                      msg.senderType === "ADMIN"
                        ? "admin-message"
                        : "user-message"
                    }
                  >
                    <strong>{msg.senderName}</strong>

                    <p>{msg.message}</p>

                    <small>{msg.createdAt}</small>
                  </div>
                ))}
              </div>

              <div className="reply-box">
                <textarea
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />

                <button onClick={handleReply}>Send Reply</button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminSupport;
