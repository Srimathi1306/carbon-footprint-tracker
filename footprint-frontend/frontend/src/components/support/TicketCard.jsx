import { Link } from "react-router-dom";

function TicketCard({ ticket }) {
  return (
    <Link to={`/support/${ticket.id}`} className="ticket-card">
      <div className="ticket-header">
        <h3>{ticket.subject}</h3>

        <span className={`status ${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      </div>

      <p className="ticket-category">
        <strong>Category:</strong> {ticket.category}
      </p>

      <p className="ticket-priority">
        <strong>Priority:</strong> {ticket.priority}
      </p>

      <small>Created : {new Date(ticket.createdAt).toLocaleDateString()}</small>
    </Link>
  );
}

export default TicketCard;
