import express from "express";
import dotenv from 'dotenv'
import connectDB from "./configuration/database.js";
const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>");
})

app.listen(port,()=> {
    connectDB();
    console.log(`connected to server http://localhost:${port}/`);
})