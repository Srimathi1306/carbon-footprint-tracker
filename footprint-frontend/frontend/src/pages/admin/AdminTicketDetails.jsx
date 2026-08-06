import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import ChatMessage from "../../components/support/ChatMessage";
import StatusUpdate from "../../components/admin/StatusUpdate";

import { getTicket, adminReply } from "../../services/adminSupportService";

function AdminTicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    try {
      const res = await getTicket(id);

      setTicket(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReply = async () => {
    if (!message.trim()) return;

    try {
      await adminReply(id, {
        message,
      });

      setMessage("");

      loadTicket();
    } catch (err) {
      console.log(err);
    }
  };

  if (!ticket) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout role="ADMIN">
      <div className="chat-container">
        <div className="chat-header">
          <div>
            <h2>{ticket.subject}</h2>

            <p>{ticket.category}</p>
          </div>

          <StatusUpdate ticket={ticket} onSuccess={loadTicket} />
        </div>

        <div className="chat-body">
          {ticket.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>

        <div className="chat-footer">
          <textarea
            rows="3"
            value={message}
            placeholder="Reply to user..."
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={handleReply}>Send Reply</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminTicketDetails;
