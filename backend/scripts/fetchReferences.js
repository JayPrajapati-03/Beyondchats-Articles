const axios = require("axios");
const Reference = require("../src/models/Reference");
require("dotenv").config();
require("../src/config/db")();

const API_URL = "http://localhost:5000/api/articles";
const SERP_API_KEY = process.env.SERP_API_KEY;

async function fetchReferences() {
  try {
    const { data: articles } = await axios.get(API_URL);

    for (const article of articles) {
      if (article.title.toLowerCase().includes("sample")) continue;

      console.log(`Searching references for: ${article.title}`);

      // ✅ SKIP if references already exist
      const existingRefs = await Reference.find({ articleId: article._id });
      if (existingRefs.length >= 2) {
        console.log("References already exist, skipping");
        console.log("----------");
        continue;
      }

      // 🔍 Search using SerpAPI
      const searchRes = await axios.get("https://serpapi.com/search.json", {
        params: {
          q: article.title,
          engine: "google",
          api_key: SERP_API_KEY
        }
      });

      const results = searchRes.data.organic_results || [];
      let savedCount = 0;

      for (const result of results) {
        if (
          result.link &&
          result.link.startsWith("http") &&
          !result.link.includes("beyondchats.com")
        ) {
          const exists = await Reference.findOne({
            articleId: article._id,
            referenceUrl: result.link
          });

          if (!exists && savedCount < 2) {
            await Reference.create({
              articleId: article._id,
              referenceUrl: result.link
            });

            console.log(`Saved reference: ${result.link}`);
            savedCount++;
          }
        }
      }

      if (savedCount === 0) {
        console.log("No valid references found");
      }

      console.log("----------");
    }

    console.log("Reference fetching completed");
  } catch (error) {
    console.error(
      "Automation error:",
      error.response?.data || error.message
    );
  }
}

fetchReferences();
