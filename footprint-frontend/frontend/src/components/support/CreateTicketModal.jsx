import { useState } from "react";
import { createTicket } from "../../services/supportService";

function CreateTicketModal({ show, onClose, onSuccess }) {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "TECHNICAL",
    priority: "MEDIUM",
  });

  if (!show) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTicket(form);

      onSuccess();

      onClose();

      setForm({
        subject: "",
        description: "",
        category: "TECHNICAL",
        priority: "MEDIUM",
      });
    } catch (err) {
      console.log(err);

      alert("Unable to create ticket.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="ticket-modal">
        <h2>Create Support Ticket</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <select name="category" value={form.category} onChange={handleChange}>
            <option value="TECHNICAL">Technical</option>
            <option value="ACCOUNT">Account</option>
            <option value="FEATURE_REQUEST">Feature Request</option>
            <option value="OTHER">Other</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <textarea
            rows="6"
            name="description"
            placeholder="Describe your issue..."
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicketModal;
