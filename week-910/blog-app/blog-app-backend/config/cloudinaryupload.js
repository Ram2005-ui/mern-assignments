import cloudinary from "./cloudinary.js"
export const uploadToCloudinary = (buffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream( //split file into multiple chunks
                { folder: "blog_users" },  //folder name
                (err, result) => {
                if (err) return reject(err);
                resolve(result);
                }
            );
            stream.end(buffer);
        });
        };

        //how asynchronous operations were performed before promises

        //call back functions were used
        //it causes call back hell during testing
        //async and await solved the call back hell
        //cloudinary still requires callback functions
        //consume the promise using async and await