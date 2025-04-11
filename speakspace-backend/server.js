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

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", ({ sessionId, user }) => {
    socket.join(sessionId);
    // Send system message to other users in the room
    socket
      .to(sessionId)
      .emit("newMessage", {
        sender: "System",
        text: `${user.name} joined the session`,
      });
  });

  socket.on("sendMessage", ({ sessionId, sender, text }) => {
    io.to(sessionId).emit("newMessage", { sender, text });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
