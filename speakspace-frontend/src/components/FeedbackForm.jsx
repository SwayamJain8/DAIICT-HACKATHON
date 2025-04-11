// src/components/FeedbackForm.jsx
import { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ sessionId, participants = [] }) => {
  const [participantId, setParticipantId] = useState("");
  const [communication, setCommunication] = useState(3);
  const [clarity, setClarity] = useState(3);
  const [teamwork, setTeamwork] = useState(3);
  const [comments, setComments] = useState("");

  const handleSubmit = async () => {
    const evaluator = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post("http://localhost:5000/api/feedback/submit", {
        sessionId,
        participantId,
        evaluatorId: evaluator._id,
        communication,
        clarity,
        teamwork,
        comments,
      });
      alert("Feedback submitted!");
      setParticipantId("");
      setComments("");
    } catch {
      alert("Feedback submission failed");
    }
  };

  return (
    <div
      style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #aaa" }}
    >
      <h3>Submit Feedback</h3>
      <div style={{ margin: "0.5rem 0" }}>
        <label>Select Participant: </label>
        <select
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem" }}
        >
          <option value="">-- Select Participant --</option>
          {participants.map((participant) => (
            <option key={participant._id} value={participant._id}>
              {participant.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ margin: "0.5rem 0" }}>
        <label>Communication: </label>
        <input
          type="number"
          value={communication}
          onChange={(e) => setCommunication(e.target.value)}
          min="1"
          max="5"
          style={{ width: "50px" }}
        />
      </div>
      <div style={{ margin: "0.5rem 0" }}>
        <label>Clarity: </label>
        <input
          type="number"
          value={clarity}
          onChange={(e) => setClarity(e.target.value)}
          min="1"
          max="5"
          style={{ width: "50px" }}
        />
      </div>
      <div style={{ margin: "0.5rem 0" }}>
        <label>Teamwork: </label>
        <input
          type="number"
          value={teamwork}
          onChange={(e) => setTeamwork(e.target.value)}
          min="1"
          max="5"
          style={{ width: "50px" }}
        />
      </div>
      <textarea
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        style={{ width: "100%", margin: "0.5rem 0", padding: "0.5rem" }}
      />
      <button
        onClick={handleSubmit}
        style={{ padding: "0.5rem", width: "100%" }}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
