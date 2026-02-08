import {Schema,model} from 'mongoose'

//create cart schema
const cartSchema = new Schema({  //embedded schema demonstrating relationship between user and product
  product:{ //product only stores ObjectId referencing product document not entire product details
    type:Schema.Types.ObjectId,
    ref:"product" //name of product model
  } //reference(object id) pointing to product document in product collection
})
//user schema
const userSchema = new Schema({
  name:{
    type:String,
    required:[true,"Name is required"]
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    unique:true //ensures no duplicates in database
  },
  password: {
    type: String,
    required:[true,"Password is required"]
  },
  cart:{
    type:[cartSchema]  //array of cart items using embedded schema
  }

},{
  strict:"throw",
  timestamps:true,
  versionKey:false
})

//export user model
export const UserModel = model("user",userSchema);