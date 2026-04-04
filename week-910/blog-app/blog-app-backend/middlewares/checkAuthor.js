import { UserTypeModel } from "../models/UserModel.js";
export const checkAuthor = async (req, res, next) => {
    //get author id from request (params or body)
    let aid = req.body?.author || req.params?.authorId;

    // Check if the logged-in user is the author or an admin
    // assuming req.user is set by verifyToken
    if (req.user.role !== 'ADMIN' && req.user.userId !== aid) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    //verify author exists
    const author = await UserTypeModel.findById(aid);
    //if author not found
    if (!author) {
        return res.status(401).json({ message: "Invalid Author" });
    }
    //if user is not an author (based on DB role, though token role should match)
    if (author.role !== "AUTHOR") {
        return res.status(403).json({ message: "User is not an Author" });
    }
    //if author is not active
    if (!author.isActive) {
        return res.status(403).json({ message: "Author is not active" });
    }
    //call next middleware
    next();
}