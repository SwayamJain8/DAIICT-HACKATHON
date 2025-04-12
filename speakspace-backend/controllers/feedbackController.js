// controllers/feedbackController.js
const Feedback = require("../models/Feedback");

const giveFeedback = async (req, res) => {
  const {
    sessionId,
    participantId,
    evaluatorId,
    communication,
    clarity,
    teamwork,
    comments,
  } = req.body;
  try {
    const feedback = new Feedback({
      sessionId,
      participantId,
      evaluatorId,
      communication,
      clarity,
      teamwork,
      comments,
    });
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: "Failed to save feedback" });
  }
};

const getUserFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ participantId: req.params.userId })
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(10); // Limit to the last 10 feedbacks
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

module.exports = { giveFeedback, getUserFeedback };
