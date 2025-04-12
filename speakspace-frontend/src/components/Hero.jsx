import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Hero = () => {
  const navigate = useNavigate();

  const { user } = React.useContext(AuthContext);

  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6 pt-30">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-teal-400 tracking-wide">
          Welcome to SpeakSpace
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl">
          The ultimate platform to enhance your Group Discussion and Interview
          skills. Collaborate, practice, and grow with real-time feedback and
          analytics.
        </p>
      </header>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-teal-400 transition duration-300">
          <h3 className="text-xl font-bold text-teal-400">
            Real-Time Sessions
          </h3>
          <p className="mt-2 text-gray-300">
            Join or create live sessions to practice group discussions and
            interviews with peers and moderators.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-teal-400 transition duration-300">
          <h3 className="text-xl font-bold text-teal-400">Expert Feedback</h3>
          <p className="mt-2 text-gray-300">
            Receive constructive feedback from evaluators to improve your
            communication, clarity, and teamwork skills.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-teal-400 transition duration-300">
          <h3 className="text-xl font-bold text-teal-400">
            Analytics Dashboard
          </h3>
          <p className="mt-2 text-gray-300">
            Track your progress with detailed analytics and feedback history to
            identify areas of improvement.
          </p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-teal-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-teal-500 transition duration-300 cursor-pointer "
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/publicSessions")}
          className="px-6 py-3 bg-transparent border border-teal-400 text-teal-400 font-bold rounded-lg hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer "
        >
          Explore Public Sessions
        </button>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} SpeakSpace. All rights reserved. Built
          for aspiring professionals.
        </p>
      </footer>
    </div>
  );
};

export default Hero;
