//Create mini-express app
import express from "express";
import UserModel from "../models/UserModel.js";
export const UserApp = express.Router();

//User APi ROutes


//create User
UserApp.post("/users", async (req, res) => {
    try {
        const newUser = req.body;
        const newUserDocument = new UserModel(newUser); 
        await newUserDocument.save();
        res.status(201).json({message:"User created successfully", payload: newUserDocument});
    } catch (err) {
        res.status(400).json({message: err.message || "Error creating user"});
    }
})
//Read all users
UserApp.get("/users", async (req, res) => {
    try {
        let usersList = await UserModel.find({status: true});
        res.status(200).json({message: "users", payload: usersList});
    } catch (err) {
        res.status(500).json({message: err.message || "Error fetching users"});
    }
})
//Read user by id
UserApp.get("/users/:id", async (req, res) => {
    let userId=req.params.id;
    let user=await UserModel.findOne({_id:userId,status:true});
    res.status(200).json({message:"user found",payload:user});
})
//Update user by id
UserApp.put("/users/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({message: "user updated", payload: user});
    } catch (err) {
        res.status(400).json({message: err.message || "Error updating user"});
    }
})
//Delete user by id (soft delete - set status to false)
UserApp.delete("/users/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findByIdAndUpdate(id, {status: false}, {new: true});
        if (!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({message: "user deleted", payload: user});
    } catch (err) {
        res.status(400).json({message: err.message || "Error deleting user"});
    }
})



//Toggle user status (activate/deactivate)
UserApp.patch("/users/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findById(id);
        if (!user) return res.status(404).json({message: "User not found"});
        user.status = !user.status;
        await user.save();
        res.status(200).json({message: user.status ? "user activated" : "user deactivated", payload: user});
    } catch (err) {
        res.status(400).json({message: err.message || "Error toggling user status"});
    }
})