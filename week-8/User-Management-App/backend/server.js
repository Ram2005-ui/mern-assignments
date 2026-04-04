//create Http Server
import express from "express";
import {connect} from 'mongoose'
import { config } from 'dotenv'
import {UserApp} from "./APIs/UserApi.js";
import cors from 'cors'
config();
const app = express();
//Add body parser middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || "http://localhost:5173"
    : "http://localhost:5173"
}))

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running', database: 'Connected' });
});

//forward req to UserApi if path starts with /user-api
app.use("/user-api", UserApp);
//connect to Db
async function connectDB() {
    try {
        await connect(process.env.DB_URL);
        const port=process.env.PORT;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
}
connectDB();
//add error handling middleware
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
})
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
