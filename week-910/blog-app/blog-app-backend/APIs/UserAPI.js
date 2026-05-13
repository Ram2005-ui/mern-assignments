import exp from 'express'
import {register,authenticate} from '../services/authService.js'
import {verifyToken} from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
import {upload} from '../config/multer.js'
import {uploadToCloudinary} from '../config/cloudinaryupload.js'
import cloudinary from '../config/cloudinary.js'
//mini express application

export const userRoute=exp.Router()

//Register user
userRoute.post(
        "/users",
        upload.single("profileImageUrl"),  //if name is not same then req.file is undefined and nothing is there to upload
        async (req, res, next) => {
        let cloudinaryResult; 

            try {
                let userObj = req.body;
                
                console.log("===== USER REGISTRATION =====");
                console.log("Received req.body:", userObj);
                console.log("Has role?", !!userObj.role);
                console.log("================================");

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url, //cdn link
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {  //remove the existing image from the previous operation

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );

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
//Read all articles (protected)
userRoute.get("/articles",verifyToken("USER"),async(req,res)=>{
    let articles=await ArticleModel.find({isArticleActive:true}).populate("comments.user","email firstName")
    res.status(200).json({message:"Articles found successfully",payload:articles});
})

//Read single article by its own _id (protected — accessible by USER and AUTHOR)
//Used by ArticleByID when article is not passed via useLocation state (e.g. page refresh)
userRoute.get("/articles/:id",verifyToken("USER","AUTHOR"),async(req,res)=>{
    let article=await ArticleModel.findOne({_id:req.params.id,isArticleActive:true})
      .populate("author","firstName username")
      .populate("comments.user","firstName username")
    if(!article){
        return res.status(404).json({message:"Article not found",payload:null})
    }
    res.status(200).json({message:"Article found successfully",payload:article});
})

//Add comment to an article(protected)
userRoute.post("/articles/comments",verifyToken("USER"),async(req,res)=>{ //role should be assigned by backend(server))
    let {articleId,comment}=req.body;
    let user=req.user.userId;
    let article=await ArticleModel.findById(articleId)
    if(!article){
        return res.status(404).json({message:"Article not found"});
    }
    let updatedArticle=await ArticleModel.findByIdAndUpdate(articleId,{$push:{comments:{user:user,comment:comment}}},{new:true});
    res.status(200).json({message:"Comment added successfully",payload:updatedArticle});
})

userRoute.put("/articles",verifyToken("USER"),async(req,res)=>{ //role should be assigned by backend(server))
    let {user,articleId,comment}=req.body;
    console.log(req.user)
    if(user!==req.user.userId){
        return res.status(403).json({message:"Unauthorized access"});

    }
    let articleWithComment=await ArticleModel.findByIdAndUpdate(articleId,{$push:{comments:{user,comment}}},{new:true,runValidators:true}).populate("comments.user","firstName");
    if(!articleWithComment){
        return res.status(404).json({message:"Article not found"});
    }
    res.status(200).json({message:"Comment added successfully",payload:articleWithComment});
})
    



