function ChatMessage({ message }) {
  const isAdmin = message.senderType === "ADMIN";

  return (
    <div
      className={`chat-message ${isAdmin ? "admin-message" : "user-message"}`}
    >
      <div className="message-card">
        <strong>{message.senderName}</strong>

        <p>{message.message}</p>

        <small>{new Date(message.createdAt).toLocaleString()}</small>
      </div>
    </div>
  );
}

export default ChatMessage;
