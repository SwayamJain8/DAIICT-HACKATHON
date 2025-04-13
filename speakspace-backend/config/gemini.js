const { GoogleGenerativeAI } = require("@google/generative-ai");

// Validate API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

// Initialize the Gemini API
let genAI;
let model;

try {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  console.log("Gemini API initialized successfully");
} catch (error) {
  console.error("Error initializing Gemini API:", error);
  // Create a fallback model that will return an error message
  model = {
    generateContent: async () => {
      throw new Error("Gemini API not properly initialized. Please check your API key.");
    }
  };
}

module.exports = { model }; 