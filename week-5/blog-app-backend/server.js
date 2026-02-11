import exp from "express";
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userRoute } from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import cookieParser from 'cookie-parser'
import { commonRouter } from "./APIs/CommonAPI.js";
config() //process.env
const app = exp();
//add body parser middleware
app.use(exp.json())  //json function on exp function?
app.use(cookieParser())
//app.use(middleware) //it will execute before route because application level middleware
app.use('/user-api', userRoute)
app.use('/author-api', authorRoute)
app.use('/admin-api', adminRoute)
app.use('/common-api', commonRouter)
//connect to db
const connectDB = async () => { //for multemedia storage like cloudinary and mongodb atlas as cloud service
    try {
        await connect(process.env.DB_URL) //replace db address with your db address
        console.log("db connected")
        app.listen(process.env.PORT, () => console.log("server started"))
    } catch (err) {
        console.log("Err in db connection", err)
    }
}
connectDB()
    .catch(err => {
        console.error("Failed to connect to DB:", err);
        process.exit(1);
    });
//logout for user,author and admin
app.post("/logout", (req, res) => { //match with the setting at the time of creation
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.status(200).json({ message: "Logged out successfully" })
})

//dealing with invalid path
app.use((req, res, next) => {
    res.json({ message: `${req.url} is invalid path` })   //path is present in the url object
})
//error handling middleware
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "Something went wrong" })
}) //in normal middleware it will forward the request to next middleware 
//we need to add next as parameter to treat it as a middleware


