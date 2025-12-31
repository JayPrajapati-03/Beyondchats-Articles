const Article = require("../src/models/Article");
require("dotenv").config();
require("../src/config/db")();

async function cleanupDuplicates() {
  const articles = await Article.find();
  const seen = new Set();

  for (const article of articles) {
    if (seen.has(article.sourceUrl)) {
      await Article.findByIdAndDelete(article._id);
      console.log(`Deleted duplicate: ${article.sourceUrl}`);
    } else {
      seen.add(article.sourceUrl);
    }
  }

  console.log("Duplicate cleanup completed");
  process.exit();
}

cleanupDuplicates();
