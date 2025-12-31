const axios = require("axios");
const ArticleVersion = require("../src/models/ArticleVersion");
const Reference = require("../src/models/Reference");
const { generateAIContent } = require("../src/services/aiService");
require("dotenv").config();
require("../src/config/db")();

const API_URL = "http://localhost:5000/api/articles";

async function enhanceArticlesAI() {
  try {
    // 1. Fetch all articles
    const { data: articles } = await axios.get(API_URL);

    for (const article of articles) {
      // Skip test/sample data
      if (article.title.toLowerCase().includes("sample")) continue;

      console.log(`Enhancing article: ${article.title}`);

      // 2. Idempotency check
      const exists = await ArticleVersion.findOne({
        articleId: article._id
      });

      if (exists) {
        console.log("AI version already exists, skipping");
        console.log("----------");
        continue;
      }

      // 3. Fetch references
      const references = await Reference.find({
        articleId: article._id
      });

      const referenceText = references
        .map((r, i) => `Reference ${i + 1}: ${r.referenceUrl}`)
        .join("\n");

      // 4. Build AI prompt
      const prompt = `
Rewrite the following article in a professional, SEO-friendly manner.
Improve structure, clarity, and readability.
Use references only for inspiration. Do NOT copy text.

ARTICLE:
${article.content}

REFERENCES:
${referenceText}
`;

      // 5. Generate AI content via service
      const improvedContent = await generateAIContent(prompt);

      if (!improvedContent) {
        console.log("AI returned empty response, skipping");
        console.log("----------");
        continue;
      }

      // 6. Save AI-enhanced content
      await ArticleVersion.create({
        articleId: article._id,
        updatedContent: improvedContent
      });

      console.log("AI-enhanced article saved");
      console.log("----------");
    }

    console.log("AI enhancement completed");
  } catch (error) {
    console.error("AI enhancement error:", error.message);
  }
}

enhanceArticlesAI();
