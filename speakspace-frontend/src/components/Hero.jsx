import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating 3D Elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-teal-400/20 rounded-lg transform rotate-45 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-20 h-20 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-blue-400/20 rounded-lg transform rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header Section - Centered */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-32">
        <header className={`text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide mb-6 whitespace-nowrap">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
              Welcome to SpeakSpace
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The ultimate platform to enhance your Group Discussion and Interview
            skills. Collaborate, practice, and grow with real-time feedback and
            analytics.
          </p>
        </header>

        {/* Call-to-Action Section - Single Button */}
        <div className={`mt-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-bold rounded-lg shadow-lg hover:from-teal-500 hover:to-cyan-400 transition duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-teal-400/30 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Features Section - Smaller size */}
      <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 group">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">
            Real-Time Sessions
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Join or create live sessions to practice group discussions and
            interviews with peers and moderators.
          </p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 group">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">Expert Feedback</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Receive constructive feedback from evaluators to improve your
            communication, clarity, and teamwork skills.
          </p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-teal-500/20 group">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-lg flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">
            Analytics Dashboard
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Track your progress with detailed analytics and feedback history to
            identify areas of improvement.
          </p>
        </div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4 z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-400/20 to-cyan-300/20 rounded-lg transform rotate-12 animate-float"></div>
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-lg transform -rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Footer Section */}
      <footer className="mt-20 text-center text-gray-500 text-sm relative z-10">
        <p className="pb-1">
          © {new Date().getFullYear()} SpeakSpace. All rights reserved. Built by Diet Coders.
        </p>
      </footer>
    </div>
  );
};

export default Hero;