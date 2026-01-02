const axios = require("axios");
const ArticleVersion = require("../src/models/ArticleVersion");
const Reference = require("../src/models/Reference");
const Metadata = require("../src/models/Metadata");
const { generateAIContent } = require("../src/services/aiService");
require("dotenv").config();
require("../src/config/db")();

const { API_BASE_URL } = require("../src/config/constants");
const API_URL = `${API_BASE_URL}/api/articles`;

async function enhanceArticlesAI() {
  try {
    const { data: articles } = await axios.get(API_URL);

    for (const article of articles) {
      const exists = await ArticleVersion.findOne({
        articleId: article._id
      });
      if (exists) continue;

      const refs = await Reference.find({ articleId: article._id });
      const refText = refs.map(r => r.referenceUrl).join("\n");

      const prompt = `
Rewrite the article professionally and SEO-friendly.
Do not copy. Use references only for inspiration.

ARTICLE:
${article.content}

REFERENCES:
${refText}
`;

      const updatedContent = await generateAIContent(prompt);
      if (!updatedContent) continue;

      await ArticleVersion.create({
        articleId: article._id,
        updatedContent
      });

      await Metadata.create({
        articleId: article._id,
        aiModelUsed: "llama3",
        keywords: article.title.split(" ").slice(0, 5)
      });

      console.log("AI enhanced:", article.title);
    }
  } catch (err) {
    console.error("AI error:", err.message);
  } finally {
    process.exit(0);
  }
}

enhanceArticlesAI();
