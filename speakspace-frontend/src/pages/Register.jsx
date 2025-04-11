// src/pages/Register.jsx
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("participant");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed!");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <input
        style={{ width: "100%", margin: "0.5rem 0" }}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={{ width: "100%", margin: "0.5rem 0" }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ width: "100%", margin: "0.5rem 0" }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        style={{ width: "100%", margin: "0.5rem 0" }}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="participant">Participant</option>
        <option value="moderator">Moderator</option>
        <option value="evaluator">Evaluator</option>
      </select>
      <button
        onClick={handleRegister}
        style={{ width: "100%", padding: "0.5rem" }}
      >
        Register
      </button>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
