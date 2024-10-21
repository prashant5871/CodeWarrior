import express from "express";
import dotenv from 'dotenv'
import connectDB from "./configuration/database.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import problemRouter from "./routes/problemRoute.js";
import submissionRouter from "./routes/submissionRouter.js";
import tagRouter from "./routes/tageRoute.js";
import codeRouter from "./routes/codeRoute.js";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middleware/isAuthenticated.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cookieParser());

/*
app.use(cors({
  origin: 'http://localhost:3001',  // Frontend address
  credentials: true                 // Allow sending cookies in requests
}));

*/

/* */
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies and credentials to be included
}));


app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>");
})

//setting routes
app.use("/api/users/",userRouter);
app.use("/api/admin/",adminRouter); //Admin routes will be handled here
app.use("/api/problems",problemRouter);
app.use("/api/code",isAuthenticated,codeRouter);
app.use("/api/tags",tagRouter);
app.use("/api/submit",submissionRouter);

app.listen(port,()=> {
    connectDB();
    console.log(`connected to server http://localhost:${port}/`);
})