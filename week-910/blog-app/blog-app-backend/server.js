import exp from "express";
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import cookieParser from 'cookie-parser'
import { commonRouter } from "./APIs/CommonAPI.js";
import cors from 'cors'
config() //process.env
const app = exp();
//use cors middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true)
    if (
      origin.endsWith('.vercel.app') || 
      origin.endsWith('.netlify.app') ||
      origin === 'http://localhost:5173'
    ) {
      return callback(null, true)
    }
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))// allow all origins (useful for development)
//add body parser middleware
app.use(exp.json())  //json function on exp function?
app.use(exp.urlencoded({extended: true})) // Parse form data from multipart/form-data
app.use(cookieParser())
//app.use(middleware) //it will execute before route because application level middleware
app.use(['/user-api', '/api/user-api'], userRoute)
app.use(['/author-api', '/api/author-api'], authorRoute)
app.use(['/admin-api', '/api/admin-api'], adminRoute)
app.use(['/common-api', '/api/common-api'], commonRouter)

app.get(["/", "/api"], (req, res) => {
    res.json({
        message: "Blog app backend is running. Use /common-api, /user-api, /author-api, or /admin-api."
    })
})

//logout for user,author and admin
app.post(["/logout", "/api/logout"], (req, res) => { //match with the setting at the time of creation
    res.clearCookie("token", {
  httpOnly: true,
  sameSite: "none",
  secure: true,
})
    res.status(200).json({ message: "Logged out successfully" })
})

//dealing with invalid path
app.use((req, res, next) => {
    res.status(404).json({ message: `${req.url} is invalid path` })   //path is present in the url object
})

//connect to db
const connectDB = async () => { //for multemedia storage like cloudinary and mongodb atlas as cloud service
    try {
        await connect(process.env.DB_URL) //replace db address with your db address
        console.log("db connected")
    } catch (err) {
        console.log("Err in db connection", err)
    }
}

// Connect to DB on startup for serverless
connectDB().catch(err => {
    console.error("Failed to connect to DB:", err);
});

// For Vercel serverless, export the app
export default app;

// For local development, listen if not in Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT, () => console.log("server started on port", process.env.PORT));
}

//error handling middleware
// app.use((err, req, res, next) => {
//     console.log(err)
//     res.status(500).json({ message: "Something went wrong" })
// }) //in normal middleware it will forward the request to next middleware 
//we need to add next as parameter to treat it as a middleware

app.use((err, req, res, next) => {

  console.log("\n========== ERROR MIDDLEWARE ==========");
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Error message:", err.message);
  console.log("Full error:", err);
  console.log("=====================================\n");

  // Handle multer errors
  if (err.name === "MulterError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message).join(", ");
    return res.status(400).json({
      message: "error occurred",
      error: messages,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000 && keyValue) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: err.message || "Server side error",
  });
});




//cookie(token) is attached with the request
//if author is logged in then get request is authenticated
//httponly cookie - safety and automatic attachment
