const express = require("express");
const router = express.Router();
const { generateAIResponse, analyzeConversation } = require("../controllers/aiController");

// Route to generate AI response
router.post("/generate", generateAIResponse);

// Route to analyze conversation
router.post("/analyze", analyzeConversation);

module.exports = router; 