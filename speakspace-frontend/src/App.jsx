// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";
import LiveSession from "./pages/LiveSession";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateSession />} />
      <Route path="/join/:id" element={<JoinSession />} />
      <Route path="/session/:id" element={<LiveSession />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default App;
