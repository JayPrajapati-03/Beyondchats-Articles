const axios = require("axios");
const cheerio = require("cheerio");

const API_URL = "http://localhost:5000/api/articles";
const BLOG_URL = "https://beyondchats.com/blogs/";

async function scrapeBeyondChats() {
  try {
    // 1. Fetch blog listing page
    const { data } = await axios.get(BLOG_URL);
    const $ = cheerio.load(data);

    const articleLinks = [];

    // 2. Collect ONLY real blog article links
    $("a").each((_, element) => {
      const link = $(element).attr("href");

      if (
        link &&
        link.includes("/blogs/") &&
        !link.includes("/tag/") &&
        !link.includes("/category/") &&
        !link.endsWith("/blogs/") &&
        !articleLinks.includes(link)
      ) {
        articleLinks.push(
          link.startsWith("http")
            ? link
            : `https://beyondchats.com${link}`
        );
      }
    });

    // 3. Take first 5 valid articles
    const selectedArticles = articleLinks.slice(0, 5);

    for (const url of selectedArticles) {
      try {
        const articleRes = await axios.get(url);
        const articlePage = cheerio.load(articleRes.data);

        const title = articlePage("h1").first().text().trim();
        const content = articlePage("main").text().trim();

        // Quality check
        if (!title || content.length < 300) {
          console.log(`Skipping (insufficient content): ${url}`);
          continue;
        }

        // 4. Save via API (NOT directly to DB)
        await axios.post(API_URL, {
          title,
          content,
          sourceUrl: url
        });

        console.log(`Saved: ${title}`);
      } catch (err) {
        console.error(`Failed to scrape article: ${url}`);
      }
    }

    console.log("Scraping completed");
  } catch (error) {
    console.error("Scraping error:", error.message);
  }
}

scrapeBeyondChats();
