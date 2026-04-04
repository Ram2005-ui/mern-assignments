import express from "express"
export const userApp=express.Router()


let users = []
//get request handling route 
userApp.get('/users',(req,res)=>{
    res.status(200).json({"message":"Get request",payload:users}) //message and payload
})
userApp.post('/users',(req,res)=>{//fix parsing issue 
    let newUser=req.body
    //console.log(newUser)
    users.push(newUser)
    res.status(201).json({"message":"User created",payload:newUser})
})
userApp.put('/users/:id',(req,res)=>{
    //get modified user from req
    //find the user with id exists in the array
    //if user not found send res as "user not found"
    //if user found then update the user
    //send res as "user modified successfully"
    let userId=Number(req.params.id)
    let modifiedUser=req.body
    //console.log(modifiedUser) //for debugging
    let userIndex=users.findIndex((user)=>user.id===userId) //indexing to find user is better beacause for large number of users it is efficient
    if(userIndex===-1){
        return res.status(404).json({"message":"User not found"})
    }
    users.splice(userIndex,1,{...users[userIndex],...modifiedUser}) //merge existing user and modified user
    // (optional) let deletedUser=users.splice(userIndex,1,modifiedUser) //to store deleted user if needed
    res.status(200).json({"message":"User modified successfully",payload:users})

})

//read user by id
userApp.get('/users/:id',(req,res)=>{
    let userId=Number(req.params.id) //params are always string so convert to number
    let user=users.find((user)=>user.id===userId)
    if(!user){
        return res.status(404).json({"message":"User not found"})
    }else{
        res.status(200).json({"message":"User found",payload:user})
    }
})
userApp.delete('/users/:id',(req,res)=>{
    let userId=Number(req.params.id)
    let userIndex=users.findIndex((user)=>user.id===userId)
    if(userIndex===-1){
        return res.status(404).json({"message":"User not found"})
    }
    const deletedUser=users.splice(userIndex,1)
    res.status(200).json({"message":"User deleted successfully",payload:users})
})