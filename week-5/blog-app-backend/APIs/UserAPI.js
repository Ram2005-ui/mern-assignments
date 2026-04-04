import exp from 'express'
import {register,authenticate} from '../services/authService.js'
import {verifyToken} from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
//mini express application

export const userRoute=exp.Router()

//Register user
userRoute.post("/users",async(req,res)=>{ //role should be assigned by backend(server)
    //get user object from request body
    const userObj=req.body;
    //call register function
    const newUserObj=await register({...userObj,role:"USER"});
    //send response
    res.status(201).json({message:"User registered successfully",payload:newUserObj});
})
//Authenticate user
//userRoute.post("/authenticate",async(req,res)=>{ //role should be assigned by backend(server)
//    //get user cred object
//    let credObj=req.body;
//    //call authenticate function
//    let {token,user}=await authenticate(credObj);
//    //save token
//    res.cookie("token",token,{
//        httpOnly:true,
//        sameSite:"lax",
//        secure:false,
//    });
//    //send response
//    res.status(201).json({message:"User authenticated successfully",payload:user});
//})
//Read all articles(protected)
userRoute.get("/articles",verifyToken,async(req,res)=>{
    let articles=await ArticleModel.find()
    res.status(200).json({message:"Articles found successfully",payload:articles});
})

//Add comment to an article(protected)
userRoute.post("/articles/comments",verifyToken,async(req,res)=>{ //role should be assigned by backend(server))
    let {articleId,comment}=req.body;
    let user=req.user._id;
    let article=await ArticleModel.findById(articleId)
    if(!article){
        return res.status(404).json({message:"Article not found"});
    }
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$push:{comments:{user:user,comment:comment}}},{new:true});
    res.status(200).json({message:"Comment added successfully",payload:updatedArticle});
})



