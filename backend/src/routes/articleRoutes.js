const express = require("express");
const router = express.Router();

const {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/articleController");

router.post("/", createArticle);
router.get("/", getAllArticles);
router.get("/:id", getSingleArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
