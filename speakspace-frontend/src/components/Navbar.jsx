// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

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
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
