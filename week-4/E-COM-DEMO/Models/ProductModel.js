import {Schema,model} from 'mongoose'

//product schema
const productSchema = new Schema({  //schema is used to enforce data integrity and prevents invalid structure
  productName:{
    type:String,
    required:[true,"Product name required"] //Mongoose validation where it marks 
    //field as required and gives custom error message
  },
  price:{
    type:Number,
    required:[true,"Product price required"]
  }
  ,
  brand: {
    type: String
  }
},{
  strict:"throw", //ensures only fields defined in the schema are accepted
  timestamps:true, //it adds createdAt and updatedAt fields automatically to track when a document is created or modified
  versionKey:false //disables Mongodb _v version field
})
//
export const ProductModel = model("product",productSchema);