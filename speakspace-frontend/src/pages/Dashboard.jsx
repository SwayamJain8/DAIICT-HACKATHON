// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [createdSessions, setCreatedSessions] = useState([]);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(storedUser);
      // If moderator, fetch sessions created by this moderator (that are waiting)
      if (storedUser.role === "moderator") {
        axios
          .get("http://localhost:5000/api/sessions/public")
          .then((res) => {
            // Sometimes createdBy is just a string or an object with an _id. Handle both:
            const mySessions = res.data.filter((s) => {
              if (typeof s.createdBy === "object" && s.createdBy !== null) {
                return s.createdBy._id === storedUser._id;
              }
              return s.createdBy === storedUser._id;
            });
            setCreatedSessions(mySessions);
          })
          .catch((err) => console.error("Error fetching sessions", err));
      }
    }
  }, [navigate]);

  if (!user)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>
        Welcome {user.name} ({user.role})
      </h2>
      {user.role === "moderator" ? (
        <>
          <button
            onClick={() => navigate("/create")}
            style={{ padding: "0.5rem", margin: "0.5rem" }}
          >
            Create Session
          </button>
          <h3>Your Created Sessions (Waiting)</h3>
          {createdSessions.length === 0 ? (
            <p>No sessions created yet.</p>
          ) : (
            createdSessions.map((session) => (
              <div
                key={session._id}
                style={{
                  border: "1px solid #ccc",
                  margin: "0.5rem",
                  padding: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/join/${session._id}`)}
              >
                <p>
                  <strong>Topic:</strong> {session.topic}
                </p>
                <p>
                  <strong>Session Code:</strong> {session.sessionCode}
                </p>
                <p>
                  <strong>Duration:</strong> {session.duration} minutes
                </p>
              </div>
            ))
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/publicSessions")}
            style={{ padding: "0.5rem", margin: "0.5rem" }}
          >
            Join Public Session
          </button>
          <button
            onClick={() => navigate("/joinByCode")}
            style={{ padding: "0.5rem", margin: "0.5rem" }}
          >
            Join by Code
          </button>
          {user.role === "participant" && (
            <button
              onClick={() => navigate("/analytics")}
              style={{ padding: "0.5rem", margin: "0.5rem" }}
            >
              View Feedback
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
