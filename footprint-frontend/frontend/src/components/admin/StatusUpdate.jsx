import { useState } from "react";

import { updateTicketStatus } from "../../services/adminSupportService";

function StatusUpdate({ ticket, onSuccess }) {
  const [status, setStatus] = useState(ticket.status);

  const handleUpdate = async () => {
    try {
      await updateTicketStatus(ticket.id, status);

      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="OPEN">OPEN</option>

        <option value="IN_PROGRESS">IN PROGRESS</option>

        <option value="RESOLVED">RESOLVED</option>
      </select>

      <button className="submit-btn" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}

export default StatusUpdate;
