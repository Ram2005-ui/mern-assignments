import express from "express"
export const productApp=express.Router()



///Create Products API in the same file
//Description of Products obj:
//{
//    productId,
//    name,
//    price,
//    brand
//}

let products=[]
productApp.get('/products',(req,res)=>{
    res.status(200).json({"message":"Get request",payload:products})
})

productApp.get('/products/id/:id',(req,res)=>{ //keep different route names for different queries
    let pid=Number(req.params.id)
    let product=products.find((product)=>product.productId===pid)
    if(!product){
        return res.status(404).json({"message":"Product not found"})
    }
    res.status(200).json({"message":"Product found",payload:product})
})

productApp.get('/products/brand/:brand',(req,res)=>{  //recieves 
    let bname=req.params.brand
    let product=products.find((product)=>product.brand===bname)
    if(!product){
        return res.status(404).json({"message":"Product not found"})
    }
    res.status(200).json({"message":"Product found",payload:product})
})

productApp.post('/products',(req,res)=>{
    let newProduct=req.body
    products.push(newProduct)
    res.status(201).json({"message":"Product added successfully",payload:newProduct})
})

productApp.put('/products/:id',(req,res)=>{
    let modifiedProduct=req.body
    let pid=Number(req.params.id)
    let productIndex=products.findIndex((product)=>product.productId===pid)
    if(productIndex===-1){
        return res.status(404).json({"message":"Product not found"})
    }
    products.splice(productIndex,1,{...products[productIndex],...modifiedProduct})
    //products.splice(productIndex,1,modifiedProduct)
    res.status(200).json({"message":"Product modified successfully",payload:products})
})

productApp.delete('/products/:id',(req,res)=>{
    let pid=Number(req.params.id)
    let productIndex=products.findIndex((product)=>product.productId===pid)
    if(productIndex===-1){
        return res.status(404).json({"message":"Product not found"})
    }
    products.splice(productIndex,1)
    res.status(200).json({"message":"Product deleted successfully",payload:products})
})