const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorHandler");

const articleRoutes = require("./src/routes/articleRoutes");
const articleVersionRoutes = require("./src/routes/articleVersionRoutes");

dotenv.config();

const app = express();

/* CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://beyondchats-articles.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(express.json());

connectDB();

/* Routes */
app.use("/api/articles", articleRoutes);
app.use("/api/article-versions", articleVersionRoutes);

/* Health check (Render best practice) */
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime()
  });
});

/* Root */
app.get("/", (req, res) => {
  res.send("BeyondChats Backend Running");
});

/* Global Error Handler */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
