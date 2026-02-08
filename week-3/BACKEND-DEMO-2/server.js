// Create HTTPS server
import  express from 'express'  //creates http server and listens to the request and handles routes 
import { connect } from 'mongoose'; //connects nodejs application to mongodb database (named export)
import cookieParser from "cookie-parser" //middleware to read cookies from http request
import { userApp} from './APIs/userAPI.js';
import { productApp } from './APIs/productAPI.js';

const app= express();
app.use(express.json())
app.use(cookieParser())

app.use('/user-api',userApp);
app.use('/product-api',  productApp);

// Database Connection
async function connectDB() {
    try {
        await connect (process.env.DB_URL);
        console.log(" DB Connected Successfully");
        app.listen(4000, () => {
            console.log(`Running on port 4000`);
        })

    }catch(err) {
        console.log(" Err in DB connection", err);
    }
}
connectDB();