// controllers/sessionController.js
const Session = require("../models/Session");

const createSession = async (req, res) => {
  const { topic, createdBy, evaluator, duration } = req.body;
  try {
    const session = new Session({ topic, createdBy, evaluator, duration });
    await session.save();
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Session creation failed" });
  }
};

const joinSession = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    if (!session.participants.includes(userId)) {
      session.participants.push(userId);
      await session.save();
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Joining session failed" });
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("participants", "name email")
      .populate("evaluator", "name email");
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Error fetching session" });
  }
};

module.exports = { createSession, joinSession, getSessionById };
