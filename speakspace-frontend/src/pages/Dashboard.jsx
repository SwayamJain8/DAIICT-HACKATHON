import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [createdSessions, setCreatedSessions] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(storedUser);
      if (storedUser.role === "moderator") {
        axios
          .get(
            `http://localhost:5000/api/sessions/mySessions?userId=${storedUser._id}`
          )
          .then((res) => {
            setCreatedSessions(res.data);
          })
          .catch((err) => console.error("Error fetching sessions", err));
      }
    }
  }, [navigate]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 pt-20">
      <h2 className="text-3xl font-bold text-center mb-6">
        Welcome {user.name} ({user.role})
      </h2>
      {user.role === "moderator" ? (
        <>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => navigate("/create")}
              className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer "
            >
              Create Session
            </button>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4">
            Your Created Sessions (Waiting)
          </h3>
          {createdSessions.length === 0 ? (
            <p className="text-center text-gray-400">
              No sessions created yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdSessions.map((session) => (
                <div
                  key={session._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-teal-400 transition duration-300 cursor-pointer"
                  onClick={() => navigate(`/join/${session._id}`)}
                >
                  <p className="text-lg font-bold text-teal-400">
                    Topic: {session.topic}
                  </p>
                  <p className="text-gray-300">
                    <strong>Session Code:</strong> {session.sessionCode}
                  </p>
                  <p className="text-gray-300">
                    <strong>Duration:</strong> {session.duration} minutes
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => navigate("/publicSessions")}
              className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer"
            >
              Join Public Session
            </button>
            <button
              onClick={() => navigate("/joinByCode")}
              className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer"
            >
              Join by Code
            </button>
            {user.role === "participant" && (
              <button
                onClick={() => navigate("/analytics")}
                className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer"
              >
                View Feedback
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
