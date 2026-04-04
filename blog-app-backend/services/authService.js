import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/UserModel.js";
import { config } from "dotenv";
config();
//register function
export const register = async (userObj) => {   //manually validate the user object // javascript object
    //validate that required fields exist
    if (!userObj.email || !userObj.password || !userObj.firstName) {
        const err = new Error("Missing required fields: email, password, firstName");
        err.status = 400;
        throw err;
    }
    
    if (!userObj.role) {
        const err = new Error("Role is required");
        err.status = 400;
        throw err;
    }
    
    //validate method on the document
    //if password is empty throws an error
    //create document
    const userDoc = new UserTypeModel(userObj);
    //validate for empty passwords
    await userDoc.validate();
    //hash the password
    const hashedPassword = await bcrypt.hash(userDoc.password, 10);
    userDoc.password = hashedPassword;
    //save the document
    const created = await userDoc.save();
    //convert document to object
    const newUserObj = created.toObject();  //differnce between document and object
    //remove password from the object
    delete newUserObj.password; //cant delete password from document but can delete from object
    //return the object without password
    return newUserObj;

}

//authenticate function
export const authenticate = async ({ email, password}) => { //frontend is sending email and password 
    //check user with email
    const user = await UserTypeModel.findOne({ email});
    //if user not found throw an error
    if (!user) {
        const err = new Error("Invalid email");
        err.status = 401;
        throw err;
    }
    //check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    //if password not match throw an error
    if (!isPasswordMatch) {
        const err = new Error("Password is incorrect");
        err.status = 401;
        throw err;
    }
    //check isActive
    if (!user.isActive) {
        const err = new Error("Your Account is blocked Please contact admin");
        err.status = 403;
        throw err;
    }
    
    // Check if user has a role
    if (!user.role) {
        const err = new Error("User role is not defined. Please contact admin.");
        err.status = 500;
        throw err;
    }
    
    //generate token
    const token = jwt.sign({ //user payload during page refresh add firstName and profileImageUrl
        userId: user._id,
        role: user.role, 
        email: user.email,
        firstName: user.firstName,
        profileImageUrl: user.profileImageUrl
    },
        process.env.JWT_SECRET, {
        expiresIn: "1h",
    })

    const userObj = user.toObject();
    delete userObj.password;
    return { token, user: userObj };
}