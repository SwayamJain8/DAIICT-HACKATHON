// src/pages/JoinSession.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JoinSession = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sessions/${id}`);
        setSession(res.data);
      } catch (err) {
        console.error(err);
        setError("Session not found or an error occurred.");
      }
    };
    fetchSession();
  }, [id]);

  const join = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post(`http://localhost:5000/api/sessions/join/${id}`, {
        userId: user._id,
      });
      navigate(`/session/${id}`);
    } catch (err) {
      console.error("Joining session failed", err);
    }
  };

  if (error) return <div style={{ textAlign: "center" }}>{error}</div>;
  if (!session)
    return (
      <div style={{ textAlign: "center" }}>Loading session details...</div>
    );

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Join Session: {session.topic}</h2>
      <button onClick={join} style={{ padding: "0.5rem", marginTop: "1rem" }}>
        Join Now
      </button>
    </div>
  );
};

export default JoinSession;
