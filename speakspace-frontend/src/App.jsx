// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";
import JoinByCode from "./pages/JoinByCode";
import PublicSessions from "./pages/PublicSessions";
import LiveSession from "./pages/LiveSession";
import TimeUp from "./pages/TimeUp";
import Analytics from "./pages/Analytics";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/join/:id" element={<JoinSession />} />
        <Route path="/joinByCode" element={<JoinByCode />} />
        <Route path="/publicSessions" element={<PublicSessions />} />
        <Route path="/session/:id" element={<LiveSession />} />
        <Route path="/timeup" element={<TimeUp />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;
