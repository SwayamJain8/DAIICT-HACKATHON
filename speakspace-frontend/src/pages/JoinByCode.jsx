import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinByCode = () => {
  const [sessionCode, setSessionCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const joinByCode = async () => {
    if (!sessionCode.trim()) {
      setError("Please enter a session code");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.post(
        "http://localhost:5000/api/sessions/joinByCode",
        { sessionCode, userId: user._id }
      );
      navigate(`/join/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError("Unable to join session. Please check the code and try again.");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      joinByCode();
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

      <div className="max-w-md mx-auto relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700/50">
          <div className="w-16 h-16 bg-teal-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
              Join Session by Code
            </span>
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Enter the session code provided by the moderator
          </p>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="sessionCode" className="block text-gray-300 mb-2 font-medium">
              Session Code
            </label>
            <div className="relative">
              <input
                id="sessionCode"
                type="text"
                placeholder="Enter the code (e.g., ABC123)"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full p-3 pl-10 bg-gray-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 border border-gray-600/50 transition-all duration-300"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={joinByCode}
              disabled={isLoading}
              className="flex-1 p-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold rounded-lg hover:from-teal-500 hover:to-cyan-400 transition duration-300 shadow-lg flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <span>Join Session</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 p-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinByCode;
