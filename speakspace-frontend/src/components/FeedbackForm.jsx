// src/components/FeedbackForm.jsx
import { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ sessionId, participants = [] }) => {
  const [participantId, setParticipantId] = useState("");
  const [communication, setCommunication] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [teamwork, setTeamwork] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = async () => {
    const evaluator = JSON.parse(localStorage.getItem("user"));
    if (!participantId) {
      alert("Please select a participant.");
      return;
    }
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
      setCommunication(0);
      setClarity(0);
      setTeamwork(0);
    } catch (err) {
      alert("Feedback submission failed");
      console.error(err);
    }
  };

  // Render radio buttons for 0-10 ratings
  const renderRadioGroup = (label, selectedValue, setValue) => {
    const options = Array.from({ length: 11 }, (_, i) => i);
    return (
      <div style={{ margin: "0.5rem 0" }}>
        <div>{label}:</div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {options.map((option) => (
            <label key={option} style={{ marginRight: "1rem" }}>
              <input
                type="radio"
                name={label}
                value={option}
                checked={selectedValue === option}
                onChange={() => setValue(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
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
      {renderRadioGroup("Communication", communication, setCommunication)}
      {renderRadioGroup("Clarity", clarity, setClarity)}
      {renderRadioGroup("Teamwork", teamwork, setTeamwork)}
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
