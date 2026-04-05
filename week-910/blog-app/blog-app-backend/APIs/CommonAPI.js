import express from "express"
import { authenticate } from "../services/authService.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { UserTypeModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
export const commonRouter=express.Router()

//login
commonRouter.post("/authenticate",async(req,res)=>{
    //get user cred object
        let credObj=req.body;
        //call authenticate function
        let {token,user}=await authenticate(credObj);
        //save token
        res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure: true,
})
        //send response
        res.status(200).json({message:"Author authenticated successfully",payload:user});
})

commonRouter.get("/logout",async(req,res)=>{
    res.clearCookie("token", {
  httpOnly: true,
  sameSite: "none",
  secure: true,
})
    res.status(200).json({message:"Logged out successfully"})
})

//page refresh
commonRouter.get("/check-auth", async (req, res) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(200).json({
            authenticated: false,
            message: "No token provided",
            payload: null
        });
    }
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Check if user has role
        if (!decoded.role) {
            return res.status(200).json({
                authenticated: false,
                message: "Invalid token: missing role",
                payload: null
            });
        }
        res.status(200).json({
            authenticated: true,
            message: "Authenticated",
            payload: decoded
        });
    } catch (err) {
        return res.status(200).json({
            authenticated: false,
            message: "Token invalid or expired",
            payload: null
        });
    }
});

//password update
//check previous password
commonRouter.put("/change-password",verifyToken,async(req,res)=>{
    //get current password and new password
    //check current password
    //update password
    //send res
    let email=req.body.email
    let curr=req.body.password
    let newPass=req.body.newPassword
    if(curr==newPass){
        return res.status(400).json({message:"New password should be different from current password"});
    }
    let user=await UserTypeModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const result = await bcrypt.compare(curr, user.password);
   if(result === false) {
     return res.status(401).json({ message: "Incorrect password" })
   }
  const hashedPassword=await bcrypt.hash(newPass,10);
    user.password=hashedPassword;
    await user.save();
    res.status(200).json({message:"Password updated successfully"}); 
})

// Public routes for articles
// Get all active articles (public)
commonRouter.get("/articles", async (req, res) => {
    try {
        let articles = await ArticleModel.find({ isArticleActive: true })
            .populate("author", "firstName username")
            .populate("comments.user", "firstName username")
            .sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({ message: "Articles found successfully", payload: articles });
    } catch (err) {
        res.status(500).json({ message: "Error fetching articles", error: err.message });
    }
});

// Get single article by ID (public)
commonRouter.get("/articles/:id", async (req, res) => {
    try {
        let article = await ArticleModel.findOne({ _id: req.params.id, isArticleActive: true })
            .populate("author", "firstName username")
            .populate("comments.user", "firstName username");
        if (!article) {
            return res.status(404).json({ message: "Article not found", payload: null });
        }
        res.status(200).json({ message: "Article found successfully", payload: article });
    } catch (err) {
        res.status(500).json({ message: "Error fetching article", error: err.message });
    }
});
