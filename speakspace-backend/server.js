// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Save io instance globally for use in controllers
global.io = io;
// In server.js (inside io.on("connection", ...))
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", ({ sessionId, user }) => {
    socket.join(sessionId);
    // Send system message to other clients in the room (except the joining socket)
    socket.to(sessionId).emit("newMessage", {
      sender: "System",
      text: `${user.name} joined the session`,
    });

    // If the joining user is a participant, broadcast a participantJoined event
    if (user.role === "participant") {
      io.to(sessionId).emit("participantJoined", user);
    }
  });

  socket.on("sendMessage", ({ sessionId, sender, text }) => {
    io.to(sessionId).emit("newMessage", { sender, text });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });

  socket.on("leaveRoom", ({ sessionId, user }) => {
    socket.leave(sessionId);
    io.to(sessionId).emit("newMessage", {
      sender: "System",
      text: `${user.name} left the session`,
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
