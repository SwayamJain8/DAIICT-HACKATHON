// src/pages/JoinByCode.jsx
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
    <div
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2>Join Session by Code</h2>
      <input
        type="text"
        placeholder="Enter Session Code"
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value)}
        style={{ width: "100%", margin: "0.5rem 0" }}
      />
      <button onClick={joinByCode} style={{ width: "100%", padding: "0.5rem" }}>
        Join Session
      </button>
    </div>
  );
};

export default JoinByCode;
