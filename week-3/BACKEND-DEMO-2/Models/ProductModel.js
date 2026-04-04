
import { Schema,model } from "mongoose";

// ###Create Product api

// product obj schema : {pid,productName , price}
const productSchema = new Schema( {
  pid:{
    type:Number,
    required:[true,"pid is required"],
  },
  productname:{
    type:String,
    required: [true,"productname is required"],
    minLength: [4,"Min length should be 4"],
    maxLength:[10,"Max length is  exceeded"]
  },
  Price:{
    type:String,
    required:[true,"Price is  required"]

  }

},{
  strict : "throw",
  timestamps:true,
  versionKey:false
})
export const product = model("product", productSchema);