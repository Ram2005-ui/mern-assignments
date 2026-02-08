import express from 'express'
import {hash,compare} from 'bcryptjs' //hash is used to hash the password and compare is used to compare the password
import {user} from '../Models/UserModel.js'
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import {verifyToken} from "../middlewares/verifyToken.js"
export const userApp = express.Router(); 
import { config } from "dotenv"
config()
const JWT_KEY = process.env.JWT_SECRET_KEY


userApp.use(cookieParser())

// User API Routes


// 1. get/ users 
//2. post / users (create user)
// 3. get /  users/:id 
//  4. put / users/:id (update user)

// 5. delete / users/:id

userApp.get('/users',async(req,res)=>{
    const users=await user.find();
    res.status(200).json({message: "All Users", payload: users});
})

userApp.post('/users',async(req,res)=>{
    let newUser= req.body;
    //hash the password
    let hashedPassword = await hash(newUser.password,12);
    //replace plain password with hashed password
    newUser.password = hashedPassword;
    //  Create new user Document
    let newUserDoc= new user(newUser);
    //save info
    await newUserDoc.save();
    res.status(201).json({message:"User Created",payload:newUserDoc});
})

userApp.post('/auth',async(req,res)=>{
    //get user credentials
    let userCred = req.body;
    //check for username
    let userOfDB = await user.findOne({username:userCred.username})
    //if user not found
    if(userOfDB === null){
        return res.status(404).json({message:"Invalid Username"});
    }
    //compare passwords
    let status = await compare(userCred.password, userOfDB.password);
    //if passwords not matched
    if(status===false){
        return res.status(404).json({message:"Invalid Password"});
    }
    //create signed token
    let signedToken = jwt.sign({username:userOfDB.username},JWT_KEY,{expiresIn:"10d"})
    //save the response as httpOnly cookie
    res.cookie('token',signedToken,{
        httpOnly:true,   //it is only http Cookie  and prevents javascript access to cookie
        secure:false,  //it means cookie will be sent only on https connection if true but for development we will keep it false
        sameSite:"lax" 
        //none accessible by any application
        //srict high restriction
        //lax accessible by moderate application

    })
    //send token in response
    res.status(200).json({message:"login success",token:signedToken});    

})

//test route


userApp.get('/users/:id',async(req,res)=>{
    //get Object ID from  url params
    let  objId= req.params.id;
    //find  user byid
    let userObj=await user.findById(objId)
    // send res
    res.status(200).json({message: "user",payload:userObj})
})

//Update User
userApp.put('/users/:id',async(req,res)=>{
    let objId=req.params.id;
    let modifiedUser=req.body;
    //make update
    let updatedUser=await user.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new:true});
    res.status(200).json({message:"User Updated",payload:updatedUser});
})

//Delete User
userApp.delete("/users/:id",async(req,res)=>{
    //get objId from url params
    let objId=req.params.id;
    //delete user by id 
    let  deleteUser= await user.findByIdAndDelete(objId)
    res.status(200).json({message: "User Removed", payload: deleteUser});
})
userApp.get("/test",verifyToken,(req,res,next)=>{
    res.json({message:"test route"});
})