const axios = require("axios");

const OLLAMA_URL = "http://localhost:11434/api/generate";

async function generateAIContent(prompt) {
  const response = await axios.post(OLLAMA_URL, {
    model: "llama3",
    prompt,
    stream: false
  });

  return response.data.response;
}

module.exports = { generateAIContent };
