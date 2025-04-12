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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 pt-20">
      <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">
        Available Public Sessions
      </h2>
      {sessions.length === 0 ? (
        <p className="text-center text-gray-400">
          No public sessions available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((s) => (
            <div
              key={s._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-teal-400 transition duration-300 cursor-pointer"
              onClick={() => navigate(`/join/${s._id}`)}
            >
              <p className="text-lg font-bold text-teal-400">
                Topic: {s.topic}
              </p>
              <p className="text-gray-300">
                <strong>Session Code:</strong> {s.sessionCode}
              </p>
              <p className="text-gray-300">
                <strong>Duration:</strong> {s.duration} minutes
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicSessions;
