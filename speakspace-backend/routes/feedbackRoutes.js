// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const {
  giveFeedback,
  getUserFeedback,
} = require("../controllers/feedbackController");

router.post("/submit", giveFeedback);
router.get("/user/:userId", getUserFeedback);

module.exports = router;
