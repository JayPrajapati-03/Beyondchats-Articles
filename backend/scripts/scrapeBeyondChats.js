const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();
require("../src/config/db")();

const { API_BASE_URL } = require("../src/config/constants");
const API_URL = `${API_BASE_URL}/api/articles`;
const BLOG_URL = "https://beyondchats.com/blogs/";

async function scrapeBeyondChats() {
  try {
    const { data } = await axios.get(BLOG_URL);
    const $ = cheerio.load(data);
    const articleLinks = [];

    $("a").each((_, el) => {
      const link = $(el).attr("href");
      if (
        link &&
        link.includes("/blogs/") &&
        !link.includes("/tag/") &&
        !link.includes("/category/") &&
        !link.endsWith("/blogs/")
      ) {
        articleLinks.push(
          link.startsWith("http")
            ? link
            : `https://beyondchats.com${link}`
        );
      }
    });

    const selectedArticles = [...new Set(articleLinks)].slice(0, 5);

    for (const url of selectedArticles) {
      try {
        const page = await axios.get(url);
        const $page = cheerio.load(page.data);

        const title = $page("h1").first().text().trim();
        const content = $page("main").text().trim();

        if (!title || content.length < 300) continue;

        await axios.post(API_URL, {
          title,
          content,
          sourceUrl: url
        });

        console.log(`Saved: ${title}`);
      } catch (err) {
        console.error("Scrape failed:", url);
      }
    }
  } catch (err) {
    console.error("Scraping error:", err.message);
  } finally {
    process.exit(0);
  }
}

scrapeBeyondChats();
