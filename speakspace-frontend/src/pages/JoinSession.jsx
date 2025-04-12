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

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 text-lg">
        Loading session details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">
          Join Session: {session.topic}
        </h2>
        <button
          onClick={join}
          className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinSession;
