// models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    evaluatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    communication: { type: Number, required: true },
    clarity: { type: Number, required: true },
    teamwork: { type: Number, required: true },
    comments: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
