const mongoose = require("mongoose");

const metadataSchema = new mongoose.Schema(
  {
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true
    },
    aiModelUsed: {
      type: String
    },
    keywords: {
      type: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metadata", metadataSchema);
