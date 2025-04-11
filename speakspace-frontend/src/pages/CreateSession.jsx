// src/pages/CreateSession.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(15);
  const [sessionCode, setSessionCode] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5000/api/sessions/create", {
        topic,
        createdBy: user._id,
        evaluator: null,
        duration,
        sessionCode,
        isPublic,
      });
      alert("Session created! Check your Dashboard for the session card.");
      navigate("/dashboard");
    } catch {
      alert("Session creation failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Create New Session</h2>
      <input
        type="text"
        placeholder="Discussion Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "100%", margin: "0.5rem 0" }}
      />
      <input
        type="text"
        placeholder="Custom Session Code"
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value)}
        style={{ width: "100%", margin: "0.5rem 0" }}
      />
      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ width: "100%", margin: "0.5rem 0" }}
      />
      <div style={{ margin: "0.5rem 0" }}>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          &nbsp;Make Session Public
        </label>
      </div>
      <button
        onClick={handleCreate}
        style={{ width: "100%", padding: "0.5rem" }}
      >
        Create Session
      </button>
    </div>
  );
};

export default CreateSession;
