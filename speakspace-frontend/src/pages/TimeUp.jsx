// src/pages/TimeUp.jsx
import { useNavigate } from "react-router-dom";

const TimeUp = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Time is Up!</h2>
      <p>The session has ended.</p>
      <button
        onClick={() => navigate("/dashboard")}
        style={{ padding: "0.5rem", margin: "1rem" }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default TimeUp;
