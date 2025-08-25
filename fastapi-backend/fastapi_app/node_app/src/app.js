require("dotenv").config();  // Load .env file

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Debug: check if .env variables are loaded
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);
console.log("DEBUG: PORT =", process.env.PORT);

// Middlewares
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const accountRoutes = require("./routes/account");
const authRoutes = require("./routes/auth");

app.use("/api/accounts", accountRoutes);
app.use("/api/auth", authRoutes);

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
