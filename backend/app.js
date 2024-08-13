import express from "express";
import dotenv from 'dotenv'
import connectDB from "./configuration/database.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

//Midelwares 
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>");
})

//setting routes
app.use("/api/users/",userRouter);
app.use("/api/admin/",adminRouter); //Admin routes will be handled here

app.listen(port,()=> {
    connectDB();
    console.log(`connected to server http://localhost:${port}/`);
})

//testing by mihir_dev