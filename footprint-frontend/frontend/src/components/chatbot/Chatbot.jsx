import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { sendChatMessage } from "../../services/chatService";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("carbonbot-chat");

    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: "👋 Hi! I'm CarbonBot. Ask me anything about your carbon footprint.",
          },
        ];
  });

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("carbonbot-chat", JSON.stringify(messages));
  }, [messages]);

  const handleDeleteChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi! I'm CarbonBot. Ask me anything about your carbon footprint.",
      },
    ]);

    setMessage("");
  };
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await sendChatMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong.",
        },
      ]);
    }

    setLoading(false);

    setMessage("");
  };

  return (
    <>
      <button className="chatbot-button" onClick={() => setOpen(!open)}>
        <SmartToyIcon style={{ fontSize: "34px" }} />
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            CarbonBot 🌱
            <button onClick={handleDeleteChat}>🗑 Clear Chat</button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {loading && <div className="chat-message bot">Typing...</div>}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-footer">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
