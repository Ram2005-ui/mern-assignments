//create Http Server
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { UserApp } from "./APIs/UserApi.js";
import cors from "cors";
config();

const app = express();

// --- Database connection for Vercel serverless ---
async function connectDB() {
  // If already connected (readyState 1) or connecting (readyState 2), don't start new connection
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      bufferCommands: false, // Don't buffer queries; fail immediately if disconnected
    });
    console.log("Success: Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Critical: MongoDB connection failed:", err.message);
    throw err;
  }
}

// Ensure DB is connected before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Path:", req.path, "Error:", err.message);
    res.status(503).json({ 
      message: "Database connection failed", 
      error: err.message 
    });
  }
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production"
      ? (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : true)
      : true,
    credentials: true
  })
);

// Health check
app.get("/", (req, res) => {
  const statusLabels = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  res.json({
    message: "Backend is running",
    database: statusLabels[mongoose.connection.readyState] || "Unknown"
  });
});

// User API routes
app.use("/user-api", UserApp);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation failed", errors: err.errors });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate field value" });
  }
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
