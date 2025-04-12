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
      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">
          {label}:
        </label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name={label}
                value={option}
                checked={selectedValue === option}
                onChange={() => setValue(option)}
                className="w-4 h-4 text-teal-400 bg-gray-700 border-gray-600 focus:ring-teal-400 focus:ring-2"
              />
              <span className="text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-2xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-teal-400 mb-6">Submit Feedback</h3>
      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">
          Select Participant:
        </label>
        <select
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
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
        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
      />
      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
