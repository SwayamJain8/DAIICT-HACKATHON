// controllers/sessionController.js
const Session = require("../models/Session");

// Create a session (waiting state)
const createSession = async (req, res) => {
  const { topic, createdBy, evaluator, duration, sessionCode, isPublic } =
    req.body;
  try {
    const session = new Session({
      topic,
      createdBy,
      evaluator,
      duration,
      sessionCode,
      isPublic,
      status: "waiting",
      started: false,
    });
    await session.save();
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Session creation failed" });
  }
};

// Join session by its _id
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

// Join session by sessionCode
const joinSessionByCode = async (req, res) => {
  const { sessionCode, userId } = req.body;
  try {
    const session = await Session.findOne({ sessionCode });
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

// Get session by _id and populate participant info (including role)
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("participants", "name email role")
      .populate("evaluator", "name email role");
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Error fetching session" });
  }
};

// Moderator starts session: mark session as started, set startTime, and emit 'sessionStarted' event.
// Also schedule deletion once time is up.
const startSession = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Assuming userId is passed in the request body

  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    // Ensure the logged-in user is the creator of the session
    if (session.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to start this session" });
    }

    session.started = true;
    session.startTime = new Date();
    session.status = "active";
    await session.save();

    // Emit to all sockets in this session room that session has started
    global.io.to(id).emit("sessionStarted", {
      startTime: session.startTime,
      duration: session.duration,
    });

    // Schedule deletion/end of session after duration (in ms)
    setTimeout(async () => {
      global.io.to(id).emit("timeUp", { message: "Time is up!" });
      await Session.findByIdAndDelete(id);
    }, session.duration * 60 * 1000);

    res.json({ message: "Session started", session });
  } catch (err) {
    res.status(500).json({ error: "Failed to start session" });
  }
};

// Get available public sessions that are waiting and not started.
const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ isPublic: true, started: false });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch public sessions" });
  }
};

const getMySessions = async (req, res) => {
  const { userId } = req.query; // Expecting moderator's userId in query parameters
  try {
    const sessions = await Session.find({
      createdBy: userId,
      status: "waiting", // If you only want waiting sessions; remove this line if you want all
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

const leaveSession = async (req, res) => {
  const { id } = req.params; // Session ID
  const { userId } = req.body; // User ID

  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: "Session not found" });

    // Ensure the user is either a participant or the creator of the session
    if (
      !session.participants.includes(userId) &&
      session.createdBy.toString() !== userId
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to leave this session" });
    }

    // Remove the user from the participants list
    session.participants = session.participants.filter(
      (participant) => participant.toString() !== userId
    );
    await session.save();

    // Notify other participants via Socket.IO
    global.io.to(id).emit("participantLeft", { userId });

    res.json({ message: "Left session successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to leave session" });
  }
};

module.exports = {
  createSession,
  joinSession,
  getSessionById,
  joinSessionByCode,
  startSession,
  getPublicSessions,
  getMySessions,
  leaveSession,
};
