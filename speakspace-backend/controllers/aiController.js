const { model } = require("../config/gemini");

// Generate AI response for a given prompt
const generateAIResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: "Error generating AI response" });
  }
};

// Analyze conversation sentiment and provide insights
const analyzeConversation = async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Messages array is required" });
    }

    const conversationText = messages
      .map(msg => `${msg.sender}: ${msg.text}`)
      .join("\n");

    const prompt = `Analyze this conversation and provide insights about:
    1. Overall sentiment
    2. Key topics discussed
    3. Engagement level
    4. Any potential areas of improvement

    Keep your response under 500 words total.
    Dont use bullet points just generate a simple good looking paragraph with all the insights.
    
    Conversation:
    ${conversationText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    res.json({ analysis });
  } catch (error) {
    console.error("Conversation Analysis Error:", error);
    res.status(500).json({ message: "Error analyzing conversation" });
  }
};

module.exports = {
  generateAIResponse,
  analyzeConversation
}; 