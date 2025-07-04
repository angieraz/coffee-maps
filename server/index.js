require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const exploredRoutes = require("./routes/explored");
const cafeRoutes = require("./routes/cafes");
const reviewRoutes = require("./routes/reviews");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/explored", exploredRoutes);
app.use("/api/cafes", cafeRoutes);
app.use("/api/reviews", reviewRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
