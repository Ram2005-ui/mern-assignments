import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/UserModel.js";
import { config } from "dotenv";
config();
//register function
export const register = async (userObj) => {   //manually validate the user object // javascript object
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
export const authenticate = async ({ email, password ,isActive}) => {
    //check user with email
    const user = await UserTypeModel.findOne({ email,isActive });
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
    //generate token
    const token = jwt.sign({
        userId: user._id,
        role: user.role, email: user.email
    },
        process.env.JWT_SECRET, {
        expiresIn: "1h",
    })

    const userObj = user.toObject();
    delete userObj.password;
    return { token, user: userObj };
}