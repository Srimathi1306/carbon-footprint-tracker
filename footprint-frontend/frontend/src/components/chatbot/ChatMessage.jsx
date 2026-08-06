export default function ChatMessage({ message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          background: message.sender === "user" ? "#16a34a" : "#f3f4f6",
          color: message.sender === "user" ? "white" : "#111827",
          padding: "10px 14px",
          borderRadius: "12px",
          maxWidth: "80%",
          whiteSpace: "pre-wrap",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}
