// src/pages/PublicSessions.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublicSessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/sessions/public"
        );
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPublicSessions();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Available Public Sessions</h2>
      {sessions.length === 0 ? (
        <p>No public sessions available.</p>
      ) : (
        sessions.map((s) => (
          <div
            key={s._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              margin: "0.5rem 0",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/join/${s._id}`)}
          >
            <p>
              <strong>Topic:</strong> {s.topic}
            </p>
            <p>
              <strong>Session Code:</strong> {s.sessionCode}
            </p>
            <p>
              <strong>Duration:</strong> {s.duration} minutes
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PublicSessions;
