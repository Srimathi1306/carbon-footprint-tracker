import { Link } from "react-router-dom";

function AdminTicketCard({ ticket }) {
  return (
    <Link to={`/admin/support/${ticket.id}`} className="ticket-card">
      <div className="ticket-top">
        <h3>{ticket.subject}</h3>

        <span className={`status ${ticket.status.toLowerCase()}`}>
          {ticket.status}
        </span>
      </div>

      <p>
        <strong>Category:</strong> {ticket.category}
      </p>

      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>

      <small>Created : {new Date(ticket.createdAt).toLocaleDateString()}</small>
    </Link>
  );
}

export default AdminTicketCard;
