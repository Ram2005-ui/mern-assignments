import express from "express";
import { product } from "../Models/ProductModel.js";

export const productApp = express.Router();  //handles all product related routes

// Product API Routes

productApp.get("/products", async(req, res) => {
  const products = await product.find(); //returns an array of all products
  res.status(200).json({ message: "products", payload:products});  //sends response to client
});

productApp.post('/products',async(req,res)=>{
    let newproduct = req.body;  //get data from client
    let newproductDoc = new product(newproduct); //create new product document
    await newproductDoc.save(); //save info in DB
    res.status(201).json({message:"Product Created", payload: newproductDoc})
})

productApp.get('/products/:id',async(req,res) => {
    let objId = req.params.id; //get ObjectID from url params
    let productObj = await product.findById(objId) //find product byid
    res.status(200).json({message: "product", payload: productObj}) // send res
})

productApp.put('/products/:id', async(req,res) => {
    let objId = req.params.id; //get ObjectID from url params
    let modifiedproduct = req.body; //get modified product from client
    let found = await product.findByIdAndUpdate(objId, {$set:{...modifiedproduct}}, {new:true}); // make update
    res.status(200).json({message: "Product Updated", payload : found}); // send res
})

productApp.delete("/products/:id", async(req, res) => {
    let objId = req.params.id; //get ObjectID from url params
    await product.findByIdAndDelete(objId); //delete product byid
    res.status(200).json({message: "Product Deleted"}); // send res
})



