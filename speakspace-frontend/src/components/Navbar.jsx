import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handlePublicSessions = () => {
    if(user){
      navigate("/publicSessions");
    }else{
      navigate("/login");
    }
  }

  const handleDashboard = () => {
    if(user){
      navigate("/dashboard");
    }else{
      navigate("/login");
    }
  }

  return (
    <nav className="bg-gray-900/60 backdrop-blur-md shadow-2xl border-b border-teal-500/20 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="text-teal-400 text-2xl font-bold tracking-wide cursor-pointer flex items-center"
          onClick={() => navigate("/")}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-300 transform hover:scale-105 transition-transform duration-300">
            SpeakSpace
          </span>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-teal-400 hover:text-teal-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => handleNavigation("/")}
            className="px-3 py-2 text-teal-400 hover:text-teal-200 transition duration-300 cursor-pointer rounded-md hover:bg-gray-800/50"
          >
            Home
          </button>
          <button
            onClick={handleDashboard}
            className="px-3 py-2 text-teal-400 hover:text-teal-200 transition duration-300 cursor-pointer rounded-md hover:bg-gray-800/50"
          >
            Dashboard
          </button>
          <button
            onClick={handlePublicSessions}
            className="px-3 py-2 text-teal-400 hover:text-teal-200 transition duration-300 cursor-pointer rounded-md hover:bg-gray-800/50"
          >
            Public Sessions
          </button>
        </div>

        {/* Desktop User Info and Logout Button */}
        {user ? (
          <div className="hidden md:flex items-center space-x-6 text-white">
            <div className="flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 flex items-center justify-center text-gray-900 font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">
                {user.name} <em className="text-teal-400">( {user.role} )</em>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-transparent border border-teal-400/50 text-teal-400 rounded-md hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer shadow-lg hover:shadow-teal-400/30 transform hover:-translate-y-1"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4 text-white">
            <button
              onClick={() => handleNavigation("/login")}
              className="px-4 py-2 bg-transparent border border-teal-400/50 text-teal-400 rounded-md hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer shadow-lg hover:shadow-teal-400/30 transform hover:-translate-y-1"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-medium rounded-md hover:from-teal-500 hover:to-cyan-400 transition duration-300 cursor-pointer shadow-lg hover:shadow-teal-400/30 transform hover:-translate-y-1"
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-teal-500/20 z-50">
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={() => handleNavigation("/")}
              className="block w-full text-left px-3 py-2 text-teal-400 hover:text-teal-200 transition duration-300 cursor-pointer rounded-md hover:bg-gray-800/50"
            >
              Home
            </button>
            <button
              onClick={handleDashboard}
              className="block w-full text-left px-3 py-2 text-teal-400 hover:text-teal-200 transition duration-300 cursor-pointer rounded-md hover:bg-gray-800/50"
            >
              Dashboard
            </button>
            <button
              onClick={handlePublicSessions}
              className="block w-full text-left px-3 py-2 text-teal-400 hover:text-teal-200 transition duration-300 cursor-pointer rounded-md hover:bg-gray-800/50"
            >
              Public Sessions
            </button>
            
            {user ? (
              <>
                <div className="border-t border-gray-700/50 my-2"></div>
                <div className="flex items-center space-x-2 bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50 shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 flex items-center justify-center text-gray-900 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user.name} <em className="text-teal-400">( {user.role} )</em>
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-transparent border border-teal-400/50 text-teal-400 rounded-md hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-700/50 my-2"></div>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="block w-full text-left px-4 py-2 bg-transparent border border-teal-400/50 text-teal-400 rounded-md hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/register")}
                  className="block w-full text-left px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-300 text-gray-900 font-medium rounded-md hover:from-teal-500 hover:to-cyan-400 transition duration-300 cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;