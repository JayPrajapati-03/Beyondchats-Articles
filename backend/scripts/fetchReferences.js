const axios = require("axios");
const Reference = require("../src/models/Reference");
require("dotenv").config();
require("../src/config/db")();

const { API_BASE_URL } = require("../src/config/constants");
const API_URL = `${API_BASE_URL}/api/articles`;
const SERP_API_KEY = process.env.SERP_API_KEY;

async function fetchReferences() {
  try {
    const { data: articles } = await axios.get(API_URL);

    for (const article of articles) {
      const existing = await Reference.find({ articleId: article._id });
      if (existing.length >= 2) continue;

      const search = await axios.get("https://serpapi.com/search.json", {
        params: {
          q: article.title,
          engine: "google",
          api_key: SERP_API_KEY
        }
      });

      const results = search.data.organic_results || [];
      let count = 0;

      for (const r of results) {
        if (
          r.link &&
          !r.link.includes("beyondchats.com") &&
          count < 2
        ) {
          await Reference.create({
            articleId: article._id,
            referenceUrl: r.link
          });
          count++;
        }
      }
    }
  } catch (err) {
    console.error("Reference error:", err.message);
  } finally {
    process.exit(0);
  }
}

fetchReferences();
