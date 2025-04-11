// routes/sessionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createSession,
  joinSession,
  getSessionById,
} = require("../controllers/sessionController");

router.post("/create", createSession);
router.post("/join/:id", joinSession);
router.get("/:id", getSessionById);

module.exports = router;
