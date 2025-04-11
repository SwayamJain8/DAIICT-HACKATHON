// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  sessionCode: { type: String, required: true, unique: true }, // custom unique session code
  isPublic: { type: Boolean, default: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["waiting", "active", "ended"],
    default: "waiting",
  },
  startTime: Date, // time when session is started
  duration: Number, // duration in minutes (for countdown)
  started: { type: Boolean, default: false }, // whether session has been started
});

module.exports = mongoose.model("Session", sessionSchema);
