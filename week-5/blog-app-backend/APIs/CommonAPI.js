import express from "express"
import { authenticate } from "../services/authService.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { UserTypeModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs"
export const commonRouter=express.Router()

//login
commonRouter.post("/authenticate",async(req,res)=>{
    //get user cred object
        let credObj=req.body;
        //call authenticate function
        let {token,user}=await authenticate(credObj);
        //save token
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false,
        });
        //send response
        res.status(201).json({message:"Author authenticated successfully",payload:user});
})

commonRouter.get("/logout",async(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    });
    res.status(200).json({message:"Logged out successfully"})
})

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
//update password