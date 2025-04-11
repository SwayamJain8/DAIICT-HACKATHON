// src/components/Navbar.jsx
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
    <nav
      style={{
        padding: "1rem",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <strong>SpeakSpace</strong>
      </div>
      {user && (
        <div>
          {user.name} - <em>{user.role}</em>
          &nbsp;|&nbsp;
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
