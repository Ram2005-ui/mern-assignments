import { Schema, model } from "mongoose";
//create user schema(username,  password , age)
const userSchema = new Schema({
    
  username:{
    type:String,
    required:[true,"Username is required"],
    minLength:  [4,"Min length should be 4"],
    maxLength:[6,"Max length is exceeded"]
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  age:{
    type:Number,

    required:[true,"Age is required"],
    min: [18,"Min age should be 18"],
    max:[25,"Max age should be 25"]
  }
},{
  strict:"throw",
  timestamps:true,
  versionKey:false
  
});

//create user model with that schema
export const user = model("user",userSchema);