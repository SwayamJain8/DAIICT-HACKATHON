import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-teal-500 p-4 flex justify-between items-center fixed top-0 left-0 right-0">
      {/* Logo Section */}
      <div
        className="text-teal-400 text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        SpeakSpace
      </div>

      {/* User Info and Logout Button */}
      {user ? (
        <div className="flex items-center space-x-4 text-white">
          <span className="text-sm">
            {user.name} - <em className="text-teal-400">{user.role}</em>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-transparent border border-teal-400 text-teal-400 rounded-md hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4 text-white">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-transparent border border-teal-400 text-teal-400 rounded-md hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-transparent border border-teal-400 text-teal-400 rounded-md hover:bg-teal-400 hover:text-gray-900 transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
