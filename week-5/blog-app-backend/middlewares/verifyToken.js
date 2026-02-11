import jwt from "jsonwebtoken";
import { config } from "dotenv"; //for secret key
config();
export const verifyToken = (req, res, next) => {
    //read token from req
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    //verify the token(decoding the token)
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
}