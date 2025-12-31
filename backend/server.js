const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

const articleRoutes = require("./src/routes/articleRoutes");
const articleVersionRoutes = require("./src/routes/articleVersionRoutes");

dotenv.config();

const app = express();

/* ✅ ENABLE CORS */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

connectDB();

app.use("/api/articles", articleRoutes);
app.use("/api/article-versions", articleVersionRoutes);

app.get("/", (req, res) => {
  res.send("BeyondChats Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
