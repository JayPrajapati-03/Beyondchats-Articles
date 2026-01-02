module.exports = (req, res, next) => {
  const { title, content, sourceUrl } = req.body;

  if (!title || !content || !sourceUrl) {
    return res.status(400).json({
      message: "title, content and sourceUrl are required"
    });
  }

  next();
};
