// routes/sessionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createSession,
  joinSession,
  getSessionById,
  joinSessionByCode,
  startSession,
  getPublicSessions,
} = require("../controllers/sessionController");

router.post("/create", createSession);
router.post("/join/:id", joinSession);
router.post("/joinByCode", joinSessionByCode);
router.get("/public", getPublicSessions);
router.get("/:id", getSessionById);
router.post("/start/:id", startSession);

module.exports = router;
