import exp from "express";
import { ArticleModel } from "../models/ArticleModel.js";
import { UserTypeModel } from "../models/UserModel.js";
import {authenticate,register} from '../services/authService.js'
import {checkAuthor} from '../middlewares/checkAuthor.js'
import { verifyToken } from "../middlewares/verifyToken.js";
export const authorRoute=exp.Router()

//Register author(public)
authorRoute.post("/users",async(req,res)=>{ //role should be assigned by backend(server)
    //get user object from request body
    const userObj=req.body;
    //call register function
    const newUserObj=await register({...userObj,role:"AUTHOR"});
    //send response
    res.status(201).json({message:"Author registered successfully",payload:newUserObj});
})
//Authenticate author(public)
//authorRoute.post("/authenticate",async(req,res)=>{ //role should be assigned by backend(server)
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
//    res.status(201).json({message:"Author authenticated successfully",payload:user});
//})
//create article(protected)
authorRoute.post("/articles",verifyToken,checkAuthor,async(req,res)=>{ //role should be assigned by backend(server)
    //get article object from request body
    //check for the author
    //create article document
    //save
    //send
    const article=req.body;
    const articleDoc=new ArticleModel(article);
    const created=await articleDoc.save();
    res.status(201).json({message:"Article created successfully",payload:created});
})
//edit article
//Read articles of author (protected)
authorRoute.get("/articles/:authorId",verifyToken,checkAuthor,async(req,res)=>{ //role should be assigned by backend(server)
    //get author id from request params
    //let authid=req.params.authorId;
    //check for the author
    
    //read articles with author id which are active
    let articleinfo=await ArticleModel.find({author:req.params.authorId,isArticleActive:true}).populate("author","firstName");
    //send res
    res.status(200).json({message:"Articles found successfully",payload:articleinfo});
})

//edit article(protected)   
authorRoute.put("/articles",verifyToken,checkAuthor,async(req,res)=>{ //role should be assigned by backend(server)
    //get modified article object from request body
    //update the article  
    //even it is blocked it can be edited
    let {articleId,title,category,content,author}=req.body;
    //find article
    let articleofDB=await ArticleModel.findOne({_id:articleId,author:author});
    if(!articleofDB){
        return res.status(404).json({message:"Article not found"});
    }
    const updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{title,category,content}},{new:true});
    //send res
    res.status(200).json({message:"Article updated successfully",payload:updatedArticle});
})
//delete (soft delete) article

authorRoute.put("/articles/delete",verifyToken,checkAuthor,async(req,res)=>{ //role should be assigned by backend(server)
    //get article id from request body
    let {articleId,author,isArticleActive}=req.body;
    //find article
    let articleofDB=await ArticleModel.findOne({_id:articleId,author:author});
    if(!articleofDB){
        return res.status(404).json({message:"Article not found"});
    }
    const updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{"isArticleActive":false}},{new:true});
    //send res
    res.status(200).json({message:"Article deleted successfully",payload:updatedArticle});
})