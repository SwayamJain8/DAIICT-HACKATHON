import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinByCode = () => {
  const [sessionCode, setSessionCode] = useState("");
  const navigate = useNavigate();

  const joinByCode = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(
        "http://localhost:5000/api/sessions/joinByCode",
        { sessionCode, userId: user._id }
      );
      navigate(`/join/${res.data._id}`);
    } catch {
      alert("Unable to join session. Please check the code.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">
          Join Session by Code
        </h2>
        <input
          type="text"
          placeholder="Enter Session Code"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={joinByCode}
          className="w-full p-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer "
        >
          Join Session
        </button>
      </div>
    </div>
  );
};

export default JoinByCode;
