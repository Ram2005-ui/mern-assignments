import express from 'express'
import { UserTypeModel } from '../models/UserModel.js'
export const adminRoute=express.Router()

//Read all articles(optional)
//block user
adminRoute.put("/block/:id",async(req,res)=>{
    let uid=req.params.id
    let user=await UserTypeModel.findById(uid)
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    let updatedUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{"isActive":false}},{new:true})
    res.status(200).json({message:"User blocked successfully",payload:updatedUser})
})

// unblock user
adminRoute.put("/unblock/:id",async(req,res)=>{
    let uid=req.params.id
    let user=await UserTypeModel.findById(uid)
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    let updatedUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{"isActive":true}},{new:true})
    res.status(200).json({message:"User unblocked successfully",payload:updatedUser})
})
