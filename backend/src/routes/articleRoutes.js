const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const ArticleVersion = require("../models/ArticleVersion");
const validateArticle = require("../middleware/validateArticle");

const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/articleController");

/* CRUD */
router.post("/", validateArticle, createArticle);
router.get("/", getAllArticles);
router.get("/:id", getSingleArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

/* Combined article + AI version */
router.get("/:id/full", async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const aiVersion = await ArticleVersion.findOne({
      articleId: article._id
    });

    res.json({ article, aiVersion });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
