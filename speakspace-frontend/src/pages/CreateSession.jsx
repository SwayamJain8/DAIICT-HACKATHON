// src/pages/CreateSession.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(15);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/sessions/create",
        {
          topic,
          createdBy: user._id,
          evaluator: null, // Optionally set evaluator ID if needed
          duration,
        }
      );
      // After creation, navigate directly to the live session page.
      navigate(`/session/${res.data._id}`);
    } catch (err) {
      alert("Session creation failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Create New Session</h2>
      <input
        style={{ width: "100%", margin: "0.5rem 0" }}
        type="text"
        placeholder="Enter discussion topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        style={{ width: "100%", margin: "0.5rem 0" }}
        type="number"
        placeholder="Duration in minutes"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
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
