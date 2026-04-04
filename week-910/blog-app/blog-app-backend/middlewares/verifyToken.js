import jwt from "jsonwebtoken";
import { config } from "dotenv"; //for secret key
config();
export const verifyToken = (...allowedRoles) => {
    return (req, res, next) => {
        let token = req.cookies.token;
    //verify the token(decoding the token)
    try {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user has role in token
        if (!decoded.role) {
            return res.status(401).json({ message: "Invalid token: missing role" });
        }
        
        // If specific roles are required, check if user has one of them
        if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)){
            return res.status(403).json({ message: "Unauthorized: Insufficient permissions" });
        }
        
        req.user = decoded;
        next();
    } catch (err) {
        if(err.name==="TokenExpiredError"){
            return res.status(401).json({ message: "Token Expired" });
        }
        if(err.name==="JsonWebTokenError"){
            return res.status(401).json({ message: "Invalid Token" });
        }
        return res.status(401).json({ message: "Authentication failed" });
    }
    //read token from req
    
        //next(err)
    }
}