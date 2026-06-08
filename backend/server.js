const express = require("express");
const { connectDb } = require("./config/db");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/public", express.static(publicDir));

connectDb();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// http://localhost:5000/api/users/register

app.get("/", (req, res) => {
  res.send("POST APPLICATION");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server running on ${PORT}`);
});
