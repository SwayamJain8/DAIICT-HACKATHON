// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
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
  startTime: Date,
  duration: Number, // in minutes
});

module.exports = mongoose.model("Session", sessionSchema);
