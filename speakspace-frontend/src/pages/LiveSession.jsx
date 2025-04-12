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

  // Fetch session details
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

  // Join socket room
  useEffect(() => {
    if (!joinedRef.current && session) {
      socket.emit("joinRoom", { sessionId: id, user });
      joinedRef.current = true;
    }
  }, [id, user, session]);

  // Listen for chat messages
  useEffect(() => {
    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  // Listen for session events
  useEffect(() => {
    socket.on("sessionStarted", (data) => {
      setSession((prev) => ({
        ...prev,
        started: true,
        startTime: data.startTime,
        duration: data.duration,
      }));
    });
    socket.on("timeUp", () => {
      navigate("/timeup");
    });
    return () => {
      socket.off("sessionStarted");
      socket.off("timeUp");
    };
  }, [navigate]);

  // Countdown timer
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

  // Send message
  const sendMessage = () => {
    if (message.trim() === "") return;
    const senderName =
      user.role === "moderator" || user.role === "evaluator"
        ? `${user.name} (${user.role})`
        : user.name;
    socket.emit("sendMessage", {
      sessionId: id,
      sender: senderName,
      text: message,
    });
    setMessage("");
  };

  // Start session
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

  // // Leave session
  // const leaveSession = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     await axios.post(`http://localhost:5000/api/sessions/leave/${id}`, {
  //       userId: user._id,
  //     });
  //     socket.emit("leaveRoom", { sessionId: id, user });
  //     navigate("/dashboard");
  //   } catch (err) {
  //     console.error("Failed to leave session", err);
  //   }
  // };

  const leaveSession = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post(`http://localhost:5000/api/sessions/leave/${id}`, {
        userId: user._id,
      });
      socket.emit("leaveRoom", { sessionId: id, user });
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to leave session", err);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center px-6 py-4">
      <h2 className="text-3xl font-bold text-teal-400 mb-6">
        Live Session: {session ? session.topic : id}
      </h2>

      {/* Countdown Timer */}
      {session && session.started && countdown !== null && (
        <div className="text-xl font-semibold text-gray-300 mb-4">
          Time Remaining: {Math.floor(countdown / 60)}:
          {("0" + (countdown % 60)).slice(-2)}
        </div>
      )}

      {/* Moderator's Start Session Button */}
      {user.role === "moderator" && session && !session.started && (
        <button
          onClick={startSession}
          className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 mb-4 cursor-pointer"
        >
          Start Session
        </button>
      )}

      {/* Chat Area */}
      <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
        <div className="h-64 overflow-y-scroll border border-gray-700 p-3 rounded-lg">
          {messages.map((m, i) => (
            <div key={i} className="mb-2">
              <strong className="text-teal-400">{m.sender}</strong>:{" "}
              <span className="text-gray-300">{m.text}</span>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          {!session?.started && user.role === "participant" ? (
            <div className="text-gray-400 italic">
              Waiting for the moderator to start the session...
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                // disabled={!session?.started}
              />
              <button
                onClick={sendMessage}
                className="ml-4 px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300"
                // disabled={!session?.started}
              >
                Send
              </button>
            </>
          )}
        </div>
      </div>

      {/* Leave Session Button */}
      <button
        onClick={leaveSession}
        className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
      >
        Leave Session
      </button>

      {/* Feedback Form for Evaluators */}
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
