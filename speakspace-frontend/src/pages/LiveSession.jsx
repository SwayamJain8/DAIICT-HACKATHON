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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const joinedRef = useRef(false);
  const timerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch session details
  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:5000/api/sessions/${id}`);
        setSession(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load session. Please try again later.");
        setIsLoading(false);
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Start session
  const startSession = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/sessions/start/${id}`
      );
      setSession(res.data.session);
    } catch (err) {
      console.error(err);
      setError("Failed to start session. Please try again.");
    }
  };

  // Leave session
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
      setError("Failed to leave session. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-30 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">Loading session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-30 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-red-500/50 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-30 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white p-6 pt-20 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating 3D Elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-teal-400/20 rounded-lg transform rotate-45 animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-20 h-20 bg-cyan-400/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Session Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
                  {session ? session.topic : "Loading..."}
                </span>
              </h2>
              <p className="text-gray-300">
                Session Code:{" "}
                <span className="font-medium">{session?.sessionCode}</span>
              </p>
            </div>

            {/* Countdown Timer */}
            {session && session.started && countdown !== null && (
              <div className="mt-4 md:mt-0 bg-gray-700/50 p-3 rounded-lg border border-gray-600/50">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Time Remaining</p>
                  <p className="text-2xl font-bold text-teal-400">
                    {Math.floor(countdown / 60)}:
                    {(countdown % 60).toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-200">Discussion</h3>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-400">Live</span>
              </div>
            </div>

            <div className="h-[400px] overflow-y-auto bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 mb-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 text-center">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mb-3 ${
                      m.sender.includes(user.name) ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[80%] ${
                        m.sender.includes(user.name)
                          ? "bg-teal-500/20"
                          : "bg-gray-700/50"
                      } p-3 rounded-lg`}
                    >
                      <p className="text-xs text-gray-400 mb-1">{m.sender}</p>
                      <p className="text-gray-200">{m.text}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex">
              {!session?.started && user.role === "participant" ? (
                <div className="w-full bg-gray-700/30 p-4 rounded-lg text-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Waiting for the moderator to start the session...
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-grow p-3 bg-gray-700/50 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600/50 border-r-0"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold rounded-r-lg hover:from-teal-500 hover:to-cyan-400 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50">
            <div className="flex flex-col h-full">
              {/* Session Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-200 mb-4">
                  Session Controls
                </h3>

                {user.role === "moderator" &&
                  session &&
                  session.createdBy === user._id &&
                  !session.started && (
                    <button
                      onClick={startSession}
                      className="w-full p-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold rounded-lg hover:from-teal-500 hover:to-cyan-400 transition duration-300 shadow-lg flex items-center justify-center mb-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      Start Session
                    </button>
                  )}

                <button
                  onClick={leaveSession}
                  className="w-full p-3 bg-red-500/20 text-red-400 font-medium rounded-lg hover:bg-red-500/30 transition duration-300 border border-red-500/50 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Leave Session
                </button>
              </div>

              {/* Session Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-200 mb-4">
                  Session Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Duration:{" "}
                      <span className="font-medium">
                        {session?.duration} minutes
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Participants:{" "}
                      <span className="font-medium">
                        {session?.participants?.length || 0}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          session?.started
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {session?.started ? "Active" : "Waiting"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback Form for Evaluators */}
              {user.role === "evaluator" && session && (
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-gray-200 mb-4">
                    Evaluation
                  </h3>
                  <FeedbackForm
                    sessionId={id}
                    participants={(session.participants || []).filter(
                      (p) => p.role === "participant"
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;
