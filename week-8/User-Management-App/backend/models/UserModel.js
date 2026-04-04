//create User Schema with validations
import { Schema,model } from "mongoose";
//create User model for user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
    mobileNumber: {
        type: Number,
        required: [true, "Mobile number is required"],
        unique: [true, "Mobile number already exists"],
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const UserModel = model("User", UserSchema);
export default UserModel;