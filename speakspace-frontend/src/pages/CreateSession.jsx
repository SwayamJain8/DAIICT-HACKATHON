import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSession = () => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(15);
  const [sessionCode, setSessionCode] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCreate = async () => {
    if (!topic.trim()) {
      setError("Please enter a session topic");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      await axios.post("http://localhost:5000/api/sessions/create", {
        topic,
        createdBy: user._id,
        evaluator: null,
        duration,
        sessionCode,
        isPublic,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create session. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-30 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white p-6 pt-20 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating 3D Elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-teal-400/20 rounded-lg transform rotate-45 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-20 h-20 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
              Create New Session
            </span>
          </h2>
          <p className="text-gray-300 text-center mb-8">Set up a new group discussion or interview session</p>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Session Topic</label>
              <input
                type="text"
                placeholder="Enter a descriptive topic for your session"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-4 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600/50 transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Custom Session Code </label>
              <input
                type="text"
                placeholder="Enter a custom session code"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                className="w-full p-4 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600/50 transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Duration (minutes)</label>
              <input
                type="number"
                min="5"
                max="120"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 15)}
                className="w-full p-4 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600/50 transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-5 h-5 text-teal-400 bg-gray-700/50 border-gray-600/50 rounded focus:ring-teal-400 focus:ring-2"
              />
              <label htmlFor="isPublic" className="ml-3 text-gray-300">
                Make Session Public
              </label>
            </div>
            
            <div className="pt-4">
              <button
                onClick={handleCreate}
                disabled={isLoading}
                className="w-full p-4 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold rounded-lg shadow-lg hover:from-teal-500 hover:to-cyan-400 transition duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-teal-400/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Session...
                  </>
                ) : (
                  <>
                    <span>Create Session</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
              >
                Cancel and return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
