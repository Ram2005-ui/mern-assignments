import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()
const JWT_KEY = process.env.JWT_SECRET_KEY // to read cookies from req object otherwise wont read req.cookie
export function verifyToken(req,res,next){
  //token verification logic
try{
  //get token from req ( using cookie-parser )
  let signedToken = req.cookies.token;
  if(!signedToken){
    return res.status(401).json({message:"please login first"})
  }
  //console.log(req.cookies) //{tokn : ""} //optional just for debugging

  //verify token(decode)
  let decode = jwt.verify(signedToken,JWT_KEY);
  //console.log("decoded token",decode);
  req.user=decode;
  next()
}catch(err){
  return res.status(401).json({message:"Invalid token"})
}
}