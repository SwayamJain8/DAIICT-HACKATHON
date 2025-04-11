// src/pages/LiveSession.jsx
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
import FeedbackForm from "../components/FeedbackForm";

const LiveSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const joinedRef = useRef(false);
  const timerRef = useRef(null);

  // Fetch session details (with populated participants)
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sessions/${id}`);
        setSession(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSession();
  }, [id]);

  // When session fetched, join socket room only once
  useEffect(() => {
    if (!joinedRef.current && session) {
      socket.emit("joinRoom", { sessionId: id, user });
      joinedRef.current = true;
    }
  }, [id, user, session]);

  // Listen for new chat messages
  useEffect(() => {
    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  // Listen for sessionStarted event to update startTime & duration across clients
  useEffect(() => {
    socket.on("sessionStarted", (data) => {
      // data contains startTime and duration
      // Update session with these values so timer can start
      setSession((prev) => ({
        ...prev,
        started: true,
        startTime: data.startTime,
        duration: data.duration,
      }));
    });
    socket.on("timeUp", () => {
      // When time is up, navigate to Time Up page
      navigate("/timeup");
    });
    return () => {
      socket.off("sessionStarted");
      socket.off("timeUp");
    };
  }, [navigate]);

  // Start countdown timer when session is started
  useEffect(() => {
    if (session && session.started && session.startTime && session.duration) {
      const start = new Date(session.startTime).getTime();
      const durationInSec = session.duration * 60;
      timerRef.current = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = Math.floor((now - start) / 1000);
        const remaining = durationInSec - elapsed;
        setCountdown(remaining > 0 ? remaining : 0);
        if (remaining <= 0) clearInterval(timerRef.current);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [session]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket.emit("sendMessage", {
      sessionId: id,
      sender: user.name,
      text: message,
    });
    setMessage("");
  };

  // For moderator: allow starting session if not yet started.
  const startSession = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/sessions/start/${id}`
      );
      setSession(res.data.session);
    } catch {
      alert("Failed to start session");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Live Session: {session ? session.topic : id}</h2>

      {/* Display countdown timer if session started */}
      {session && session.started && countdown !== null && (
        <div style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
          Time Remaining: {Math.floor(countdown / 60)}:
          {("0" + (countdown % 60)).slice(-2)}
        </div>
      )}

      {/* For moderator, show Start Session button if not started */}
      {user.role === "moderator" && session && !session.started && (
        <button
          onClick={startSession}
          style={{ padding: "0.5rem", margin: "1rem 0" }}
        >
          Start Session
        </button>
      )}

      {/* Chat Area */}
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
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
        >
          Send
        </button>
      </div>

      {/* For evaluators, render FeedbackForm. Pass only participants with role "participant". */}
      {user.role === "evaluator" && session && (
        <FeedbackForm
          sessionId={id}
          participants={(session.participants || []).filter(
            (p) => p.role === "participant"
          )}
        />
      )}
    </div>
  );
};

export default LiveSession;
