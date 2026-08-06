import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import ChatMessage from "../../components/support/ChatMessage";
import { getTicket, sendMessage } from "../../services/supportService";

function TicketDetails() {
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

  const handleSend = async () => {
    if (message.trim() === "") return;

    try {
      await sendMessage(id, {
        message: message,
      });

      setMessage("");

      loadTicket();
    } catch (err) {
      console.log(err);
    }
  };

  if (!ticket) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="chat-container">
        <div className="chat-header">
          <h2>{ticket.subject}</h2>

          <span className={`status ${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
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
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />

          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TicketDetails;
