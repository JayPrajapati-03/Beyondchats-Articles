const express = require("express");
const ArticleVersion = require("../models/ArticleVersion");

const router = express.Router();

router.get("/:articleId", async (req, res) => {
  const version = await ArticleVersion.findOne({
    articleId: req.params.articleId
  });
  res.json(version);
});

module.exports = router;
