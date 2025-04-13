import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [createdSessions, setCreatedSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching sessions", err);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Welcome Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
                  Welcome back, {user.name}
                </span>
              </h2>
              <p className="text-gray-300">
                {user.role === "moderator" 
                  ? "Manage your sessions and evaluate participants" 
                  : user.role === "evaluator" 
                    ? "Evaluate sessions and provide feedback" 
                    : "Join sessions and improve your skills"}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg p-3 text-gray-900 font-medium">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {user.role === "moderator" ? (
            <div 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 cursor-pointer"
              onClick={() => navigate("/create")}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">Create Session</h3>
              <p className="text-gray-300 text-sm">Start a new group discussion or interview session</p>
            </div>
          ) : (
            <>
              <div 
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 cursor-pointer"
                onClick={() => navigate("/publicSessions")}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-teal-400 mb-2">Join Public Session</h3>
                <p className="text-gray-300 text-sm">Browse and join available public sessions</p>
              </div>
              
              <div 
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 cursor-pointer"
                onClick={() => navigate("/joinByCode")}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-teal-400 mb-2">Join by Code</h3>
                <p className="text-gray-300 text-sm">Enter a session code to join a specific session</p>
              </div>
            </>
          )}
          
          {user.role === "participant" && (
            <div 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 cursor-pointer"
              onClick={() => navigate("/analytics")}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">View Analytics</h3>
              <p className="text-gray-300 text-sm">Check your performance and feedback history</p>
            </div>
          )}
          
          {/* {user.role === "evaluator" && (
            <div 
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 cursor-pointer"
              onClick={() => navigate("/evaluate")}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-400 mb-2">Evaluate Sessions</h3>
              <p className="text-gray-300 text-sm">Provide feedback on participant performance</p>
            </div>
          )} */}
        </div>

        {/* My Sessions Section (for moderators) */}
        {user.role === "moderator" && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 mb-8 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold text-teal-400 mb-4">Your Created Sessions</h3>
              {createdSessions.length === 0 ? (
                <div className="bg-gray-700/30 p-6 rounded-lg text-center">
                  <p className="text-gray-300">You haven't created any sessions yet.</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold rounded-lg shadow-lg hover:from-teal-500 hover:to-cyan-400 transition duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-teal-400/30"
                    onClick={() => navigate("/create")}
                  >
                    Create Your First Session
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {createdSessions.map((session) => (
                    <div 
                      key={session._id}
                      className="bg-gray-700/30 p-6 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/join/${session._id}`)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-bold text-teal-400">{session.topic}</h4>
                        <span className="px-2 py-1 bg-teal-400/20 text-teal-400 text-xs rounded-full">
                          {session.status || "Active"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Code: {session.sessionCode}</span>
                        <span>{session.duration} minutes</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
