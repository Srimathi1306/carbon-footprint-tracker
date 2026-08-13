import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getMyTickets } from "../../services/supportService";
import TicketCard from "../../components/support/TicketCard";
import CreateTicketModal from "../../components/support/CreateTicketModal";
import "../../styles/support.css";

function Support() {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await getMyTickets();
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout role="USER">
      <div className="support-container">
        <div className="support-header">
          <h2>Support Center</h2>

          <button className="new-ticket-btn" onClick={() => setShowModal(true)}>
            + New Ticket
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="empty-ticket">
            <h3>No Support Tickets</h3>
            <p>Create your first support request.</p>
          </div>
        ) : (
          <div className="ticket-list">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>

      <CreateTicketModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadTickets}
      />
    </DashboardLayout>
  );
}

export default Support;
