// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) {
      navigate("/");
    } else {
      setUser(u);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>
        Welcome {user.name} ({user.role})
      </h2>
      {user.role === "moderator" && (
        <button
          onClick={() => navigate("/create")}
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        >
          Create Session
        </button>
      )}
      <button
        onClick={() => navigate("/join/123")}
        style={{ padding: "0.5rem", margin: "0.5rem" }}
      >
        Join Session
      </button>
      {user.role === "participant" && (
        <button
          onClick={() => navigate("/analytics")}
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        >
          View Feedback
        </button>
      )}
    </div>
  );
};

export default Dashboard;
