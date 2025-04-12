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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">
          Create New Session
        </h2>
        <input
          type="text"
          placeholder="Discussion Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          type="text"
          placeholder="Custom Session Code"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-4 h-4 text-teal-400 bg-gray-700 border-gray-600 focus:ring-teal-400 focus:ring-2"
          />
          <label className="ml-2 text-gray-300">Make Session Public</label>
        </div>
        <button
          onClick={handleCreate}
          className="w-full p-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer "
        >
          Create Session
        </button>
      </div>
    </div>
  );
};

export default CreateSession;
