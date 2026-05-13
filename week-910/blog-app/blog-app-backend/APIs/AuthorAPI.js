import exp from "express";
import { ArticleModel } from "../models/ArticleModel.js";
import { UserTypeModel } from "../models/UserModel.js";
import {authenticate,register} from '../services/authService.js'
import {checkAuthor} from '../middlewares/checkAuthor.js'
import { verifyToken } from "../middlewares/verifyToken.js";
import {upload} from '../config/multer.js'
import {uploadToCloudinary} from '../config/cloudinaryupload.js'
import cloudinary from '../config/cloudinary.js'
export const authorRoute=exp.Router()


//Register author(public)

authorRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;
                
                

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "AUTHOR",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "author created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );
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
authorRoute.post("/articles",verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{ //role should be assigned by backend(server)
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
//Read ALL articles of author, including soft-deleted (protected)
//Author needs to see inactive articles so they can restore them
authorRoute.get("/articles/:authorId",verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{ 
    // No isArticleActive filter — author sees ALL their articles (active + soft-deleted)
    let aid=req.params.authorId;
    let articleinfo=await ArticleModel.find({author:aid}).populate("author","firstName username");
    //send res
    res.status(200).json({message:"Articles found successfully",payload:articleinfo});
})

//edit article(protected)   
authorRoute.put("/articles",verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{ //role should be assigned by backend(server)
    //get modified article object from request body
    //update the article  
    //even it is blocked it can be edited
    const author=req.user.userId;
    let {articleId,title,category,content}=req.body;
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

// authorRoute.put("/articles/delete",verifyToken,checkAuthor,async(req,res)=>{ //role should be assigned by backend(server)
//     //get article id from request body
//     let {articleId,author,isArticleActive}=req.body;
//     //find article
//     let articleofDB=await ArticleModel.findOne({_id:articleId,author:author});
//     if(!articleofDB){
//         return res.status(404).json({message:"Article not found"});
//     }
//     const updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{"isArticleActive":false}},{new:true});
//     //send res
//     res.status(200).json({message:"Article deleted successfully",payload:updatedArticle});
// })


//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && 
    article.author.toString() !== req.user.userId) {
    return res
    .status(403)
    .json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    article,
  });
});