// src/pages/LiveSession.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import FeedbackForm from "../components/FeedbackForm";

const LiveSession = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const joinedRef = useRef(false); // to ensure we join only once

  useEffect(() => {
    // Emit joinRoom only once
    if (!joinedRef.current) {
      socket.emit("joinRoom", { sessionId: id, user });
      joinedRef.current = true;
    }

    // Handler for new messages
    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    // Listen for incoming messages
    socket.on("newMessage", handleNewMessage);

    // Cleanup on unmount
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [id]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("sendMessage", {
      sessionId: id,
      sender: user.name,
      text: message,
    });
    setMessage("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Live Session: {id}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "250px",
          padding: "1rem",
          overflowY: "scroll",
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.sender}</strong>: {m.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <input
          style={{ width: "80%", padding: "0.5rem" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
        >
          Send
        </button>
      </div>

      {/* Only render feedback form for evaluators */}
      {user.role === "evaluator" && <FeedbackForm sessionId={id} />}
    </div>
  );
};

export default LiveSession;
