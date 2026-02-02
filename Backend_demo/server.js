import express from "express"
//create a mini express application (is a separate route)
//it contains only http handling routes related to users


import {userApp} from "./apis/userapi.js"
import {productApp} from "./apis/productapi.js"
import{connect} from "mongoose"

const app = express() //creation of http server

app.use(express.json()) //middleware to parse json

//forward req to userApp when route starts with '/user-api'
app.use('/user-api',userApp)
app.use('/product-api',productApp)
//only after successful connection to db start the server
async function connectDB(){
    try{
        await connect("mongodb://localhost:27017/mydb") 
        console.log("Connected to MongoDB")
        app.listen(3000,()=>{
            console.log("Server running on port 3000")
    })
    }catch(err){
        console.log("Error connecting to MongoDB",err)
    }
}
connectDB()




//custom middleware
/*function middleware1(req,res,next){
    console.log("middleware-1 executed");
    next()
}

function middleware2(req,res,next){
    console.log("middleware-2 executed")
}*/




  //server.js doesnot know the location of apis

  //client only expects json response from server(default behavior of express)

  //1 express is enough to create apis

  









  //create database
  //use db-name

  //read databases
  //show databases (returns only non empty dbs)

  //create collection
    //db.createCollection('collection-name')