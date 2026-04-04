//create Http Server
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { UserApp } from "./APIs/UserApi.js";
import cors from "cors";
config();

const app = express();

// --- Cached DB connection for Vercel serverless ---
let isConnected = false;

async function connectDB() {
  if (isConnected) return; // reuse existing connection on warm invocations
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 10000, // fail fast if Atlas unreachable
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
}

// Connect eagerly on cold start
connectDB().catch(console.error);

// Middleware: ensure DB is connected before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch {
    res.status(503).json({ message: "Database unavailable, try again shortly" });
  }
});

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL || "http://localhost:5173"
        : "http://localhost:5173",
  })
);

// Health check — now actually reflects DB state
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    database: isConnected ? "Connected" : "Disconnected",
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
