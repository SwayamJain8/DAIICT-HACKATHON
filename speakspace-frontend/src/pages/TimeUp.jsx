import { useNavigate } from "react-router-dom";

const TimeUp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-white px-6">
      <h2 className="text-4xl font-bold text-teal-400 mb-4">Time is Up!</h2>
      <p className="text-lg text-gray-300 mb-6">The session has ended.</p>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default TimeUp;
